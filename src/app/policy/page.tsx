'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, AlertTriangle, Lock, Eye } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function PolicyPage() {
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
            Privacy Policy & Terms
          </h1>

          <div className="space-y-8 text-white/80">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Terms of Service</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <div>
                  <h3 className="font-semibold text-white mb-2">Age Requirement</h3>
                  <p>You must be 18 years or older to use this service. By using Stranger Chat, you confirm that you meet this age requirement.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Acceptable Use</h3>
                  <p>Users must not:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Share personal information (phone numbers, addresses, etc.)</li>
                    <li>Engage in harassment, bullying, or hate speech</li>
                    <li>Share explicit or inappropriate content</li>
                    <li>Spam or advertise</li>
                    <li>Impersonate others</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">User Responsibility</h3>
                  <p>You are responsible for your own actions and conversations. We are not liable for any interactions between users.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <div>
                  <h3 className="font-semibold text-white mb-2">Data Collection</h3>
                  <p>We do not collect or store personal information. Conversations are not saved on our servers. We only maintain minimal connection data necessary for the service to function.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Anonymous Usage</h3>
                  <p>All chats are completely anonymous. We do not require registration, email, or any personal details to use the service.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Connection Data</h3>
                  <p>We temporarily store connection IDs for matching purposes only. This data is deleted when you disconnect.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-semibold">Data Security</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>We use industry-standard security measures to protect connection data. However, as conversations are peer-to-peer, we cannot guarantee absolute security of message content.</p>
                <p>We recommend not sharing sensitive personal information during conversations.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 border-2 border-yellow-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-semibold">Important Warnings</h2>
              </div>
              <div className="space-y-3 text-white/70">
                <p className="font-semibold text-yellow-300">⚠️ Never share personal information</p>
                <p>Do not share your real name, address, phone number, email, social media accounts, or any other identifying information.</p>
                <p className="font-semibold text-yellow-300">⚠️ Be cautious</p>
                <p>Remember that you are talking to strangers. Be respectful, but also be cautious about what you share.</p>
                <p className="font-semibold text-yellow-300">⚠️ Report abuse</p>
                <p>If someone violates our terms, disconnect immediately. We take user safety seriously.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">Changes to Policy</h2>
              <p className="text-white/70">
                We reserve the right to update this policy at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-6 border-t border-white/10"
            >
              <p className="text-white/60 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

