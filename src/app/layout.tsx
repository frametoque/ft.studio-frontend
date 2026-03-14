import '@/app/globals.css'
import KeepAlive from '@/components/KeepAlive'
import { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'FrameToque Studio',
    template: '%s | FrameToque Studio',
  },
  description: 'A growing suite of AI tools built for filmmakers, videographers, and content creators.',
  metadataBase: new URL('https://studio.frametoque.online'),
  openGraph: {
    title: 'FrameToque Studio',
    description: 'Professional filmmaking tools powered by AI.',
    url: 'https://studio.frametoque.online',
    siteName: 'FrameToque Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrameToque Studio',
    description: 'Professional filmmaking tools powered by AI.',
  },
}

// Optional: Add viewport configuration if needed
export const viewport: Viewport = {
  themeColor: '#000000', // You can adjust this color as needed
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <KeepAlive />
        {children}
      </body>
    </html>
  )
}