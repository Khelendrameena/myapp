'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, User, Image as ImageIcon, XCircle, SkipForward } from 'lucide-react'
import { Socket } from 'socket.io-client'

interface Message {
  id: string
  text: string
  sender: 'me' | 'partner' | 'system'
  timestamp: Date
  image?: string
  imageType?: string
}

interface ChatRoomProps {
  socket: Socket
  partnerId: string | null
  onDisconnect: () => void
  onSkip: () => void
}

export default function ChatRoom({ socket, partnerId, onDisconnect, onSkip }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [partnerTyping, setPartnerTyping] = useState(false)
  const [previewImage, setPreviewImage] = useState<{ data: string; type: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleMessage = (data: { text: string; senderId: string; image?: string; imageType?: string }) => {
      console.log('Received message:', { 
        hasText: !!data.text, 
        hasImage: !!data.image, 
        imageType: data.imageType,
        imageSize: data.image ? data.image.length : 0
      })
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.text || '',
        sender: 'partner',
        timestamp: new Date(),
        image: data.image || undefined,
        imageType: data.imageType || undefined
      }])
    }

    const handleTyping = () => {
      setPartnerTyping(true)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      typingTimeoutRef.current = setTimeout(() => {
        setPartnerTyping(false)
      }, 3000)
    }

    const handlePartnerDisconnected = () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Stranger has disconnected',
        sender: 'system',
        timestamp: new Date()
      }])
    }

    socket.on('message', handleMessage)
    socket.on('partner-typing', handleTyping)
    socket.on('partner-disconnected', handlePartnerDisconnected)

    return () => {
      socket.off('message', handleMessage)
      socket.off('partner-typing', handleTyping)
      socket.off('partner-disconnected', handlePartnerDisconnected)
    }
  }, [socket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if ((input.trim() || previewImage) && socket) {
      const message: Message = {
        id: Date.now().toString(),
        text: input.trim(),
        sender: 'me',
        timestamp: new Date(),
        image: previewImage?.data,
        imageType: previewImage?.type
      }
      
      setMessages(prev => [...prev, message])
      
      // Send message with image
      const messageData: any = { 
        text: input.trim()
      }
      
      if (previewImage?.data) {
        messageData.image = previewImage.data
        messageData.imageType = previewImage.type
        console.log('Sending image:', previewImage.type, 'Size:', previewImage.data.length)
      }
      
      socket.emit('message', messageData)
      setInput('')
      setPreviewImage(null)
      setIsTyping(false)
      socket.emit('stop-typing')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's an image or GIF
    if (!file.type.startsWith('image/')) {
      alert('Please select an image or GIF file')
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPreviewImage({
        data: result,
        type: file.type
      })
    }
    reader.readAsDataURL(file)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removePreview = () => {
    setPreviewImage(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true)
      socket.emit('typing')
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      socket.emit('stop-typing')
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong border-b border-white/20 p-4"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/40 ring-2 ring-white/20">
                <User className="w-5 h-5 text-white" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-primary-400/30 rounded-full blur-md -z-10"
              />
            </motion.div>
            <div>
              <h2 className="font-semibold text-lg">Stranger</h2>
              {partnerTyping && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-primary-400 flex items-center gap-1"
                >
                  <span className="flex gap-1">
                    <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1 h-1 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                  typing...
                </motion.p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSkip}
              className="btn-accent flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition-all duration-300"
              title="Skip & Next"
            >
              <SkipForward className="w-4 h-4" />
              <span className="hidden sm:inline">Skip</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDisconnect}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
              title="Disconnect"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] md:max-w-[60%] rounded-2xl px-4 py-3 ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/40'
                      : message.sender === 'system'
                      ? 'bg-white/10 text-white/70 text-center text-sm glass'
                      : 'glass text-white shadow-lg'
                  }`}
                >
                  {message.image && (
                    <div className="mb-2 rounded-lg overflow-hidden max-w-full">
                      <img
                        src={message.image}
                        alt="Shared"
                        className="max-w-full h-auto rounded-lg object-contain max-h-96"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className="break-words">{message.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong border-t border-white/20 p-4"
      >
        <div className="max-w-4xl mx-auto space-y-3">
          {previewImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative inline-block max-w-xs rounded-lg overflow-hidden glass p-2"
            >
              <img
                src={previewImage.data}
                alt="Preview"
                className="max-w-full h-auto rounded-lg max-h-48 object-contain"
              />
              <button
                onClick={removePreview}
                className="absolute top-3 right-3 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
              >
                <XCircle className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-xl hover:bg-white/15 transition-colors"
                title="Send Image/GIF"
              >
                <ImageIcon className="w-5 h-5 text-white" />
              </motion.div>
            </label>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all backdrop-blur-sm hover:bg-white/15"
            />
            <motion.button
              whileHover={{ scale: 1.05, rotate: -15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!input.trim() && !previewImage}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed p-3.5 rounded-xl transition-all glow-effect-hover disabled:hover:scale-100 disabled:hover:rotate-0"
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

