import '@/app/globals.css'
import KeepAlive from '@/components/KeepAlive'
import { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'block', 
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Frametoque Studio',
    template: '%s | Frametoque Studio',
  },
  description: 'A growing suite of AI tools built for filmmakers, videographers, and content creators.',
  metadataBase: new URL('https://aistudio.frametoque.online'),
  openGraph: {
    title: 'Frametoque Studio',
    description: 'Professional filmmaking tools powered by AI.',
    url: 'https://aistudio.frametoque.online',
    siteName: 'Frametoque Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frametoque Studio',
    description: 'Professional filmmaking tools powered by AI.',
  },
}

export const viewport: Viewport = {
  themeColor: '#060B18',
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <div className="bg-grid" />
        <div className="bg-scanline-wrap">
          <div className="bg-scanline" />
        </div>
        <KeepAlive />
        {children}
      </body>
    </html>
  )
}