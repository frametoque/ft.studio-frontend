import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-[#1E3060] bg-[#050810]">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-white text-2xl font-bold tracking-tight">
          <Image src="/name-logo-trans.png" alt="Frametoque AI Logo" width={175} height={40} className="inline-block" />
        </span>
        <span className="bg-[#2563EB] text-white text-xs font-bold px-2 py-1 rounded">
          AI
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <Link href="/" className="text-[#5A7AAA] hover:text-white transition text-sm">
          Home
        </Link>
        <Link href="/upload" className="text-[#5A7AAA] hover:text-white transition text-sm">
          Analyze
        </Link>
        <Link
          href="https://frametoque.online/"
          className="bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          target='_blank'
        >
          Vist Our Website
        </Link>
      </div>

    </nav>
  )
}