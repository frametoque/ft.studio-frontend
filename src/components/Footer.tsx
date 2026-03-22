import { Target, Zap, Lock, LucideIcon } from 'lucide-react'

interface FeatureItem {
  icon: LucideIcon
  title: string
  desc: string
}

const features: FeatureItem[] = [
  {
    icon: Target,
    title: 'Craft-first',
    desc: 'Every metric is grounded in cinematography principles, not generic image processing.',
  },
  {
    icon: Zap,
    title: 'Instant feedback',
    desc: 'ML inference runs in seconds. No waiting, no queues.',
  },
  {
    icon: Lock,
    title: 'Your data stays yours',
    desc: 'Videos are analyzed and immediately deleted. Nothing is stored.',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* ABOUT STRIP */}
      <section id="about" className="relative z-[2] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-12 py-20 md:px-6 sm:px-5">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <p className="font-mono text-[11px] text-[#29B6F6] tracking-[0.3em] uppercase mb-4">
                Built for creators
              </p>
              <h3 className="font-display text-[44px] text-white tracking-[0.05em] leading-none mb-5">
                TOOLS THAT<br />THINK LIKE<br />A FILMMAKER
              </h3>
              <p className="text-[14px] text-white/40 leading-[1.8] font-light max-w-[400px]">
                Frametoque Studio is a growing collection of AI tools designed around
                real filmmaking workflows. No fluff, no generic outputs — every tool is
                built around how cinematographers actually think.
              </p>
            </div>

            {/* Right — feature cards */}
            <div className="flex flex-col gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 px-5 py-[18px] bg-[#0D1526]/60 border border-[#1E3060]/50 rounded-xl hover:border-[#29B6F6]/30 hover:bg-[#29B6F6]/5 transition-all duration-300 group"
                >
                  <Icon
                    size={24}
                    color="#29B6F6"
                    strokeWidth={1.5}
                    className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <p className="text-[14px] text-white font-semibold mb-1">{title}</p>
                    <p className="text-[13px] text-white/35 leading-[1.6]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-[2] border-t border-white/5 px-12 py-7 flex justify-between items-center flex-wrap gap-3 sm:px-5 sm:flex-col sm:items-start sm:gap-2">
        <span className="font-display text-[16px] tracking-[0.12em] text-white/30">
          FRAMETOQUE STUDIO
        </span>
        <p className="font-mono text-[12px] text-white/20">
          © {currentYear} Frame Toque Digital. All rights reserved.
        </p>
      </footer>
    </>
  )
}