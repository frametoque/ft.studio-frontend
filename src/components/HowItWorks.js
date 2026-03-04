import {FilePlay, Bot, ChartNoAxesCombined, Rocket} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload Your Video',
    desc: 'Drag and drop any video clip. We accept MP4, MOV, and AVI files up to 100MB.',
    icon: FilePlay,
  },
  {
    number: '02',
    title: 'AI Analyzes Frames',
    desc: 'Our system extracts key frames and runs Computer Vision and ML models on each one.',
    icon: Bot,
  },
  {
    number: '03',
    title: 'Get Your Score',
    desc: 'Receive a 0–100 quality score with detailed feedback on composition and lighting.',
    icon: ChartNoAxesCombined,
  },
  {
    number: '04',
    title: 'Improve Your Shots',
    desc: 'Follow the AI suggestions and reshoot with confidence. Track your progress over time.',
    icon: Rocket,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 max-w-6xl mx-auto">

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
          How It Works
        </p>
        <h2 className="text-4xl font-bold text-white">
          Four Simple Steps
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <div className="text-4xl mb-4"><step.icon color="#2563EB" size={50} /></div>
            <div className="text-[#2563EB] text-sm font-bold mb-2">{step.number}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-[#5A7AAA] text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}