import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-28 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500 opacity-10 rounded-full blur-[120px] pointer-events-none" />

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 border border-[#1E3060] bg-[#0D1526] text-[#2563EB] text-xs font-semibold px-4 py-2 rounded-full">
        <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
        AI-Powered Shot Quality Analyzer
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl">
        Make Every Shot
        <span className="text-[#2563EB]"> Professional</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 text-[#5A7AAA] text-lg md:text-xl max-w-2xl leading-relaxed">
        Upload your video and get instant AI feedback on composition, lighting,
        framing, and shot quality. Like having a cinematography coach in your browser.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
        <Link
          href="/upload"
          className="bg-[#2563EB] hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition"
        >
          Analyze My Video →
        </Link>
        <Link
          href="#how-it-works"
          className="border border-[#1E3060] text-[#7ECBFF] hover:border-blue-500 px-8 py-4 rounded-xl text-lg transition"
        >
          How It Works
        </Link>
      </div>

      {/* Stats row */}
      <div className="mt-16 flex items-center gap-12 flex-wrap justify-center">
        {[
          { value: '0–100', label: 'Quality Score' },
          { value: '< 30s', label: 'Analysis Time' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-[#2563EB]">{stat.value}</div>
            <div className="text-sm text-[#5A7AAA] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}