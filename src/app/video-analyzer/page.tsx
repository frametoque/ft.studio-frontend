'use client'

import { useState, useEffect } from 'react'
import { Sun, Ruler, Sliders, Eye, Crosshair, Target, Lightbulb, LucideIcon } from 'lucide-react'
import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UploadBox from '@/app/video-analyzer/components/UploadBox'
import Link from 'next/link'

interface Check {
  icon: LucideIcon
  name: string
  desc: string
}

interface Step {
  num: string
  title: string
  desc: string
}

interface Model {
  model: string
  task: string
  desc: string
  styles: string[]
  colorClass: string
  borderClass: string
  bgClass: string
  textClass: string
  tagBgClass: string
  tagBorderClass: string
}

const checks: Check[] = [
  { icon: Sun,       name: 'Exposure',    desc: 'Gaussian curve analysis of brightness against cinematic ideal' },
  { icon: Ruler,     name: 'Composition', desc: 'Rule of thirds intersection scoring via edge detection' },
  { icon: Sliders,   name: 'Contrast',    desc: 'Grayscale standard deviation mapped to visual depth' },
  { icon: Eye,       name: 'Sharpness',   desc: 'Laplacian variance for focus and lens clarity' },
  { icon: Crosshair, name: 'Horizon',     desc: 'Hough line transform detects camera tilt in degrees' },
  { icon: Target,    name: 'Stability',   desc: 'Farneback optical flow measures inter-frame motion' },
  { icon: Lightbulb, name: 'Lighting',    desc: 'Quadrant brightness balance and direction analysis' },
]

const steps: Step[] = [
  { num: '01', title: 'Upload',  desc: 'Drop any MP4, MOV or AVI file up to 500MB.' },
  { num: '02', title: 'Extract', desc: '8 frames sampled evenly across the full timeline.' },
  { num: '03', title: 'Analyze', desc: 'ML models run 7 quality checks and style classification.' },
  { num: '04', title: 'Results', desc: 'Scores, feedback, engagement prediction and pro comparison.' },
]

const models: Model[] = [
  {
    model: 'KNN Classifier',
    task: 'Style Detection',
    desc: 'Detects shooting style from motion, color temperature, and frame composition patterns.',
    styles: ['Interview', 'Documentary', 'Travel', 'Cinematic', 'Action', 'Lifestyle'],
    colorClass: 'text-[#29B6F6]',
    borderClass: 'border-[#1E3060]/50',
    bgClass: 'bg-[#0D1526]/70',
    textClass: 'text-[#29B6F6]',
    tagBgClass: 'bg-[#29B6F6]/[0.07]',
    tagBorderClass: 'border-[#29B6F6]/[0.15]',
  },
  {
    model: 'Random Forest',
    task: 'Quality Scoring',
    desc: 'Predicts overall quality 0–100 from 5 cinematography features weighted by industry standards.',
    styles: ['Exposure 25%', 'Composition 25%', 'Contrast 20%', 'Sharpness 15%', 'Stability 15%'],
    colorClass: 'text-[#AB47BC]',
    borderClass: 'border-[#1E3060]/50',
    bgClass: 'bg-[#0D1526]/70',
    textClass: 'text-[#AB47BC]',
    tagBgClass: 'bg-[#AB47BC]/[0.07]',
    tagBorderClass: 'border-[#AB47BC]/[0.15]',
  },
  {
    model: 'Gradient Boosting',
    task: 'Engagement Prediction',
    desc: 'Predicts viewer engagement level from quality score, style, and shooting characteristics.',
    styles: ['High', 'Medium', 'Low'],
    colorClass: 'text-[#66BB6A]',
    borderClass: 'border-[#1E3060]/50',
    bgClass: 'bg-[#0D1526]/70',
    textClass: 'text-[#66BB6A]',
    tagBgClass: 'bg-[#66BB6A]/[0.07]',
    tagBorderClass: 'border-[#66BB6A]/[0.15]',
  },
]

const stats: [string, string][] = [
  ['7', 'Quality Checks'],
  ['3', 'ML Models'],
  ['<5s', 'Analysis Time'],
]

export default function VideoAnalyzerLanding() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [hoveredCheck, setHoveredCheck] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    const checkMobile = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('resize', checkMobile)
    checkMobile()

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#060B18] overflow-x-hidden relative">

      {/* Cursor glow — desktop only */}
      {mounted && !isMobile && (
        <div
          className="fixed w-[700px] h-[700px] rounded-full pointer-events-none z-0"
          style={{
            left: mousePos.x - 350,
            top: mousePos.y - 350,
            background: 'radial-gradient(circle, rgba(41,182,246,0.07) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Scanline */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.025]">
        <div className="bg-scanline absolute left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(transparent, #29B6F6, transparent)' }}
        />
      </div>

      {/* Grid */}
      <div className="bg-grid fixed inset-0 z-0" />

      <NavBar />

      <main>

        {/* ══ HERO ══ */}
        <section className="relative z-[2] max-w-[1400px] mx-auto px-12 md:px-6 sm:px-5 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)] items-center gap-12 lg:gap-8">

          {/* Left — copy */}
          <div className="py-20 lg:pr-16 lg:sticky lg:top-16">

            {/* Live label */}
            <div className={`font-mono text-[11px] text-[#29B6F6] tracking-[0.3em] uppercase mb-6 flex items-center gap-2.5 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} fade-1`}>
              <span className="w-[6px] h-[6px] rounded-full bg-[#29B6F6] inline-block flex-shrink-0 animate-pulse" />
              AI Cinematography Feedback
            </div>

            
            <h1 className={`font-display text-[clamp(44px,7vw,90px)] leading-[0.92] tracking-[0.04em] text-white mb-1.5 ${mounted ? 'fade-2' : 'opacity-0'}`}>
              KNOW EXACTLY
            </h1>
            <h2
              className={`font-display text-[clamp(44px,7vw,90px)] leading-[0.92] tracking-[0.04em] mb-1.5 ${mounted ? 'fade-3' : 'opacity-0'}`}
              style={{
                background: 'linear-gradient(90deg, #29B6F6 0%, #0D47A1 40%, #29B6F6 60%, #0D47A1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: mounted ? 'shimmer 5s linear 1s infinite' : 'none',
              }}
            >
              WHAT&apos;S WRONG
            </h2>
            <h2 className={`font-display text-[clamp(44px,7vw,90px)] leading-[0.92] tracking-[0.04em] text-white mb-7 ${mounted ? 'fade-4' : 'opacity-0'}`}>
              WITH YOUR SHOT
            </h2>

            <p className={`text-[15px] md:text-[14px] text-white/60 max-w-[440px] leading-[1.75] font-light mb-9 ${mounted ? 'fade-5' : 'opacity-0'}`}>
              Upload your footage and get instant ML-powered feedback on
              exposure, composition, stability, sharpness, contrast, horizon
              and lighting — plus style detection and engagement prediction.
            </p>

            {/* CTA — desktop only */}
            {!isMobile && (
              <div className={`flex gap-3 mb-12 ${mounted ? 'fade-5' : 'opacity-0'}`}>
                <Link
                  href="#how"
                  className="bg-transparent border border-white/10 text-white/55 px-7 py-3 rounded-xl font-medium text-[14px] tracking-[0.05em] hover:-translate-y-0.5 hover:border-white/20 hover:text-white/70 transition-all duration-200"
                >
                  See How It Works ↓
                </Link>
              </div>
            )}

            {/* Stats */}
            <div className={`flex gap-10 sm:gap-6 ${mounted ? 'fade-6' : 'opacity-0'}`}>
              {stats.map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-[30px] sm:text-[26px] text-[#29B6F6] tracking-[0.05em] leading-none">
                    {v}
                  </div>
                  <div className="text-[11px] text-white/55 tracking-[0.15em] uppercase mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Upload Box */}
          
          <div className={`${mounted ? 'fade-4' : 'opacity-0'} pt-20 pb-20 lg:pt-24`}>
            <UploadBox inputLabel="Upload video file for analysis" />
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section id="how" className="relative z-[2] max-w-[1400px] mx-auto px-12 md:px-6 sm:px-5 py-20 border-t border-white/5">

          <div className="mb-12">
            <p className="font-mono text-[11px] text-[#29B6F6] tracking-[0.3em] uppercase mb-3">
              The Process
            </p>
            <h2 className="font-display text-[clamp(40px,5vw,52px)] text-white tracking-[0.05em]">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative overflow-hidden rounded-2xl px-6 py-7 border transition-all duration-300 cursor-default ${
                  hoveredStep === i
                    ? 'bg-[#29B6F6]/5 border-[#29B6F6]/20'
                    : 'bg-transparent border-white/5'
                }`}
              >
                <div className="font-display text-[56px] md:text-[44px] text-[#29B6F6]/[0.12] tracking-[0.05em] leading-none mb-3.5" aria-hidden="true">
                  {step.num}
                </div>
                <h3 className="font-display text-[22px] text-white tracking-[0.08em] mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] text-white/60 leading-[1.65] font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHAT WE CHECK ══ */}
        <section id="checks" className="relative z-[2] max-w-[1400px] mx-auto px-12 md:px-6 sm:px-5 py-20 border-t border-white/5">

          <div className="mb-12">
            <p className="font-mono text-[11px] text-[#29B6F6] tracking-[0.3em] uppercase mb-3">
              Under the hood
            </p>
            <h2 className="font-display text-[clamp(40px,5vw,52px)] text-white tracking-[0.05em]">
              7 QUALITY CHECKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {checks.map((check, i) => (
              <div
                key={check.name}
                onMouseEnter={() => setHoveredCheck(i)}
                onMouseLeave={() => setHoveredCheck(null)}
                className={`relative overflow-hidden rounded-2xl px-5 py-[22px] border transition-all duration-300 cursor-default ${
                  hoveredCheck === i
                    ? 'bg-[#29B6F6]/[0.06] border-[#29B6F6]/25'
                    : 'bg-[#0D1526]/70 border-[#1E3060]/50'
                }`}
              >
                {/* Top glow line on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px transition-all duration-300 ${hoveredCheck === i ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'linear-gradient(90deg, transparent, #29B6F6, transparent)' }}
                />

                <div className="mb-3">
                  <check.icon size={26} color="#29B6F6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[20px] text-white tracking-[0.08em] mb-2">
                  {check.name}
                </h3>
                <p className="text-[12px] text-white/60 leading-[1.65] font-light">
                  {check.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ML MODELS ══ */}
        <section className="relative z-[2] max-w-[1400px] mx-auto px-12 md:px-6 sm:px-5 py-20 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {models.map((m) => (
            <div
              key={m.model}
              className={`rounded-2xl px-6 py-[26px] border ${m.bgClass} ${m.borderClass}`}
            >
              <p className={`font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5 ${m.textClass}`}>
                {m.model}
              </p>
              <h3 className="font-display text-[22px] text-white tracking-[0.08em] mb-2.5">
                {m.task}
              </h3>
              <p className="text-[13px] text-white/60 leading-[1.65] font-light mb-4">
                {m.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.styles.map((s) => (
                  <span
                    key={s}
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border ${m.tagBgClass} ${m.tagBorderClass} ${m.textClass}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>

      <Footer />
    </div>
  )
}