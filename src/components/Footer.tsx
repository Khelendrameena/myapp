'use client'

import Link from 'next/link'
import { Info, FileText, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-strong border-t border-white/10 p-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Stranger Chat. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-white/70 hover:text-white transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              Home
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-white/70 hover:text-white transition-colors text-sm"
            >
              <Info className="w-4 h-4" />
              About
            </motion.button>
          </Link>
          <Link href="/policy">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-white/70 hover:text-white transition-colors text-sm"
            >
              <FileText className="w-4 h-4" />
              Policy
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}


