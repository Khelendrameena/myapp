'use client'

import { useEffect, useState } from 'react'
import Script from "next/script";
import ChatRoom from '@/components/ChatRoom'
import MatchingScreen from '@/components/MatchingScreen'
import HomePage from '@/components/HomePage'
import { io, Socket } from 'socket.io-client'

// Vercel pe deploy ke liye: Project Settings → Environment Variables
// NEXT_PUBLIC_SOCKET_URL = http://YOUR_EC2_PUBLIC_IP:3001
// Set karke Redeploy karo (env build time pe use hota hai)
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [matched, setMatched] = useState(false)
  const [partnerId, setPartnerId] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (!ageVerified) return

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
      setIsConnecting(false)
    })

    newSocket.on('matched', (data: { partnerId: string }) => {
      setPartnerId(data.partnerId)
      setMatched(true)
      setIsConnecting(false)
    })

    newSocket.on('partner-disconnected', () => {
      setMatched(false)
      setPartnerId(null)
      // Auto search for new match when partner disconnects
      setTimeout(() => {
        if (newSocket && newSocket.connected) {
          setIsConnecting(true)
          newSocket.emit('find-match')
        }
      }, 1000)
    })

    newSocket.on('disconnect', () => {
      setMatched(false)
      setPartnerId(null)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [ageVerified])

  const startMatching = () => {
    if (socket && !isConnecting) {
      setIsConnecting(true)
      socket.emit('find-match')
    }
  }

  const stopMatching = () => {
    if (socket && isConnecting) {
      setIsConnecting(false)
      // Remove from queue if searching
      socket.emit('stop-matching')
    }
  }

  const disconnect = () => {
    if (socket && matched) {
      socket.emit('disconnect-match')
      setMatched(false)
      setPartnerId(null)
    }
  }

  const skipAndNext = () => {
    if (socket && matched) {
      socket.emit('disconnect-match')
      setMatched(false)
      setPartnerId(null)
      // Automatically start searching for new match
      setTimeout(() => {
        if (socket) {
          setIsConnecting(true)
          socket.emit('find-match')
        }
      }, 500)
    }
  }

  if (!ageVerified) {
    return (
      <main className="min-h-screen flex flex-col">
        <HomePage onAgeVerified={() => setAgeVerified(true)} />
      </main>
    )
  }

  if (!socket) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70">Connecting...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">

      {!matched ? (
        <MatchingScreen 
          onStartMatching={startMatching}
          onStopMatching={stopMatching}
          isConnecting={isConnecting}
        />
      ) : (
        <ChatRoom 
          socket={socket} 
          partnerId={partnerId}
          onDisconnect={disconnect}
          onSkip={skipAndNext}
        />
      )}
    </main>
  )
}

