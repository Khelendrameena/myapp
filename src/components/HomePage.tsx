'use client'

import { motion } from 'framer-motion'
import { Shield, ArrowRight, Users, Info, FileText } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface HomePageProps {
  onAgeVerified: () => void
}

export default function HomePage({ onAgeVerified }: HomePageProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleVerify = () => {
    if (isVerified) {
      onAgeVerified()
    } else {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 2000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-3xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="relative">
              <Users className="w-24 h-24 text-violet-400" style={{ filter: 'drop-shadow(0 0 15px rgba(167, 139, 250, 0.5))' }} />
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
              className="absolute inset-0 bg-violet-500/30 rounded-full blur-2xl"
            />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Stranger Chat
        </h1>
        
        <p className="text-white/80 mb-8 text-lg">
          Connect with random people from around the world
        </p>

        <div className="mb-8 p-6 glass rounded-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-semibold">Age Verification</h2>
          </div>
          
          <p className="text-white/70 mb-6 text-sm">
            You must be 18 years or older to use this service. By continuing, you confirm that you meet the age requirement.
          </p>

          <motion.label
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-primary-500 checked:border-primary-500 focus:ring-2 focus:ring-primary-400 cursor-pointer transition-all"
            />
            <span className="text-white/90 font-medium group-hover:text-white transition-colors">
              I am 18 years or older
            </span>
          </motion.label>

          {showWarning && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-red-400 text-sm font-medium"
            >
              Please confirm that you are 18+ to continue
            </motion.p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVerify}
          disabled={!isVerified}
          className={`w-full flex items-center justify-center gap-2 font-bold py-5 px-8 rounded-2xl transition-all duration-300 text-lg ${
            isVerified
              ? 'btn-primary text-white glow-effect-hover'
              : 'bg-white/10 text-white/50 cursor-not-allowed border border-white/20'
          }`}
        >
          Continue
          <ArrowRight className={`w-5 h-5 transition-transform ${isVerified ? 'translate-x-1' : ''}`} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-4"
        >
          <p className="text-xs text-white/50">
            💬 Anonymous • 🔒 Secure • 🌍 Global • ⚠️ 18+ Only
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-white/70 hover:text-white transition-colors text-sm"
              >
                <Info className="w-4 h-4" />
                About
              </motion.button>
            </Link>
            <Link href="/policy">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-white/70 hover:text-white transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                Policy
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

