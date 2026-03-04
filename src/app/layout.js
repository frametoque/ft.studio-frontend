import { Bricolage_Grotesque, DM_Mono } from "next/font/google";
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: 'Frametoque AI — Shot Quality Analyzer',
  description: 'AI-powered video composition and shot quality analyzer for videographers',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${bricolage.variable} ${dmMono.variable} bg-[#050810]`}>
        {children}
      </body>
    </html>
  )
}