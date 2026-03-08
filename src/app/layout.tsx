import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stranger Chat - Connect with Random People',
  description: 'Chat anonymously with strangers from around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


