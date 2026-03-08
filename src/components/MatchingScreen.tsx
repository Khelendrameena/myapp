'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, X } from 'lucide-react'

interface MatchingScreenProps {
  onStartMatching: () => void
  onStopMatching: () => void
  isConnecting: boolean
}

export default function MatchingScreen({ onStartMatching, onStopMatching, isConnecting }: MatchingScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-3xl p-8 md:p-12 max-w-md w-full text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="relative">
              <MessageCircle className="w-20 h-20 text-violet-400" style={{ filter: 'drop-shadow(0 0 15px rgba(167, 139, 250, 0.5))' }} />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Ready to Chat?
        </h1>
        
        <p className="text-white/70 mb-8 text-lg">
          We are finding someone special for you...
        </p>

        {isConnecting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-primary-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-lg font-medium">Finding your match...</span>
            </div>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStopMatching}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Stop</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartMatching}
            className="w-full btn-primary text-white font-bold py-5 px-8 rounded-2xl text-lg glow-effect-hover"
          >
            Start Chatting
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-sm text-white/50"
        >
          <p>💬 Anonymous • 🔒 Secure • 🌍 Global</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

