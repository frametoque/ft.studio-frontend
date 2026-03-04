import { Grid3x2, SeparatorHorizontal, ScanFace, Lightbulb, SlidersHorizontal, ChartCandlestick } from 'lucide-react'


const features = [
  { icon: Grid3x2, title: 'Rule of Thirds', desc: 'Detects if your subject is properly placed using composition grid analysis.' },
  { icon: SeparatorHorizontal, title: 'Horizon Detection', desc: 'Identifies tilted horizons and tells you the exact angle to correct.' },
  { icon: ScanFace, title: 'Face & Subject Tracking', desc: 'Ensures your subject is in the right position and properly framed.' },
  { icon: Lightbulb, title: 'Exposure Analysis', desc: 'Detects overexposed and underexposed areas in your footage.' },
  { icon: SlidersHorizontal, title: 'Lighting Balance', desc: 'Checks for uneven or inconsistent lighting across your frames.' },
  { icon: ChartCandlestick, title: 'Quality Score', desc: 'Every shot gets a 0–100 score so you know exactly where you stand.' },
]

export default function Features() {
  return (
    <section className="px-6 py-24 bg-[#0A0F1E]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            What We Analyze
          </p>
          <h2 className="text-4xl font-bold text-white">
            Everything That Makes a Great Shot
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-6 hover:border-[#2563EB] transition group"
            >
              <div className="text-3xl mb-4"><f.icon color="#2563EB" size={50} /></div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#2563EB] transition">
                {f.title}
              </h3>
              <p className="text-[#5A7AAA] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}