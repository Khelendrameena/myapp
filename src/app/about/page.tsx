'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Users, Shield, Globe, Heart } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            About Stranger Chat
          </h1>

          <div className="space-y-8 text-white/80">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">What We Do</h2>
              </div>
              <p className="leading-relaxed">
                Stranger Chat is a modern platform that connects people from around the world through anonymous text conversations. Our mission is to create meaningful connections while maintaining privacy and security for all users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Privacy & Safety</h2>
              </div>
              <p className="leading-relaxed mb-4">
                Your privacy is our top priority. All conversations are anonymous, and we do not store your personal information. You can disconnect at any time and find a new match whenever you want.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>100% Anonymous - No registration required</li>
                <li>Secure connections with end-to-end encryption</li>
                <li>No data storage of conversations</li>
                <li>Easy disconnect and reconnect</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Global Community</h2>
              </div>
              <p className="leading-relaxed">
                Connect with people from different countries, cultures, and backgrounds. Every conversation is a chance to learn something new and make a friend from across the globe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Our Values</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="font-semibold mb-2 text-primary-300">Respect</h3>
                  <p className="text-sm text-white/70">Treat everyone with kindness and respect</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="font-semibold mb-2 text-primary-300">Privacy</h3>
                  <p className="text-sm text-white/70">Your identity stays anonymous</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="font-semibold mb-2 text-primary-300">Safety</h3>
                  <p className="text-sm text-white/70">Report any inappropriate behavior</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="font-semibold mb-2 text-primary-300">Freedom</h3>
                  <p className="text-sm text-white/70">Disconnect anytime you want</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-white/60 text-sm">
              Made with ❤️ for connecting people worldwide
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

