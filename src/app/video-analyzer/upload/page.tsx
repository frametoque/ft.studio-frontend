import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UploadBox from '@/app/video-analyzer/components/UploadBox'
import { Frame, ChartNoAxesCombined, Bot, LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  label: string
  desc: string
}

const steps: Step[] = [
  { icon: Frame,               label: 'Frame Extraction', desc: '8 frames sampled evenly across the full timeline.' },
  { icon: Bot,                 label: 'AI Analysis',      desc: '3 ML models run 7 quality checks simultaneously.' },
  { icon: ChartNoAxesCombined, label: 'Score Report',     desc: 'Full breakdown with feedback and suggestions.' },
]

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[#060B18] overflow-x-hidden relative">

      {/* Center glow */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(41,182,246,0.06) 0%, transparent 70%)' }}
      />

      <Navbar />

      <section className="relative z-[2] max-w-[720px] mx-auto px-6 pt-[120px] pb-[100px] flex flex-col items-center">

        {/* Step indicator */}
        <div className="flex items-center gap-2.5 mb-7 fade-1">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-1.5 rounded-full bg-gradient-to-r from-[#29B6F6] to-[#0288D1]" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[11px] text-[#29B6F6] tracking-[0.25em] uppercase">
            Step 1 of 2
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-[clamp(52px,8vw,80px)] tracking-[0.04em] leading-[0.95] text-white text-center mb-4 fade-2">
          UPLOAD YOUR<br />
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(90deg, #29B6F6, #0D47A1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FOOTAGE
          </span>
        </h1>

        <p className="text-[15px] text-white/40 text-center max-w-[440px] leading-[1.75] font-light mb-12 fade-3">
          AI extracts key frames and runs 7 quality checks on your shot —
          exposure, composition, stability, style and more.
        </p>

        {/* Upload box */}
        <div className="w-full fade-4">
          <UploadBox />
        </div>

        {/* Divider */}
        <div className="w-full mt-14 mb-8 flex items-center gap-4 fade-5">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.25em] uppercase whitespace-nowrap">
            What happens after upload
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Step cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 fade-5">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative overflow-hidden px-[18px] py-[22px] bg-[#0D1526]/70 border border-[#1E3060]/50 rounded-2xl text-center hover:-translate-y-1 hover:border-[#29B6F6]/25 hover:bg-[#29B6F6]/[0.04] transition-all duration-250"
            >
              {/* Step number watermark */}
              <span className="absolute top-2.5 right-3 font-display text-[28px] text-[#29B6F6]/10 leading-none">
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="flex justify-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#29B6F6]/[0.08] border border-[#29B6F6]/15 flex items-center justify-center">
                  <step.icon size={20} color="#29B6F6" strokeWidth={1.5} />
                </div>
              </div>

              <p className="font-display text-[15px] tracking-[0.08em] text-white mb-1.5">
                {step.label}
              </p>
              <p className="text-[11px] text-white/35 leading-[1.6] font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p className="mt-7 font-mono text-[11px] text-white/20 tracking-[0.1em] text-center fade-6">
          🔒 Your video is deleted immediately after analysis. Nothing is stored.
        </p>

      </section>

      <Footer />
    </main>
  )
}