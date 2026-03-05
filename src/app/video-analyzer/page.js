'use client'

import { useState, useEffect } from 'react'
import { Sun, Ruler, Sliders, Eye, Crosshair, Target, Lightbulb } from 'lucide-react'
import NavBar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import UploadBox from '@/app/video-analyzer/components/UploadBox'
import Link from 'next/link'
import './hero.css'

const checks = [
  { icon: Sun,       name: 'Exposure',    desc: 'Gaussian curve analysis of brightness against cinematic ideal' },
  { icon: Ruler,     name: 'Composition', desc: 'Rule of thirds intersection scoring via edge detection' },
  { icon: Sliders,   name: 'Contrast',    desc: 'Grayscale standard deviation mapped to visual depth' },
  { icon: Eye,       name: 'Sharpness',   desc: 'Laplacian variance for focus and lens clarity' },
  { icon: Crosshair, name: 'Horizon',     desc: 'Hough line transform detects camera tilt in degrees' },
  { icon: Target,    name: 'Stability',   desc: 'Farneback optical flow measures inter-frame motion' },
  { icon: Lightbulb, name: 'Lighting',    desc: 'Quadrant brightness balance and direction analysis' },
]

const steps = [
  { num: '01', title: 'Upload',  desc: 'Drop any MP4, MOV or AVI file up to 500MB.' },
  { num: '02', title: 'Extract', desc: '8 frames sampled evenly across the full timeline.' },
  { num: '03', title: 'Analyze', desc: 'ML models run 7 quality checks and style classification.' },
  { num: '04', title: 'Results', desc: 'Scores, feedback, engagement prediction and pro comparison.' },
]

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function VideoAnalyzerLanding() {
  const [mounted,      setMounted]      = useState(false)
  const [mousePos,     setMousePos]     = useState({ x: 0, y: 0 })
  const [hoveredCheck, setHoveredCheck] = useState(null)
  const [hoveredStep,  setHoveredStep]  = useState(null)
  const [isMobile,     setIsMobile]     = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse  = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    const checkMobile  = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('resize', checkMobile)
    checkMobile()
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060B18',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      

      {/* Cursor glow — desktop only */}
      {mounted && !isMobile && (
        <div style={{
          position: 'fixed',
          left: mousePos.x - 350, top: mousePos.y - 350,
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(41,182,246,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
      )}

      {/* Scanline */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        overflow: 'hidden', opacity: 0.025,
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(transparent, #29B6F6, transparent)',
          animation: 'scanline 10s linear infinite',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(41,182,246,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,182,246,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Grain */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: grain, backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <NavBar />

      {/* ══ HERO ══ */}
      <section className="hero-section">

        {/* Left — copy */}
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            letterSpacing: '0.3em', color: '#29B6F6',
            textTransform: 'uppercase', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 10,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.1s both' : 'none',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#29B6F6', display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            AI Cinematography Feedback
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 7vw, 90px)',
            lineHeight: 0.92, letterSpacing: '0.04em',
            color: 'white', marginBottom: 6,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.2s both' : 'none',
          }}>KNOW EXACTLY</h1>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 7vw, 90px)',
            lineHeight: 0.92, letterSpacing: '0.04em',
            background: 'linear-gradient(90deg, #29B6F6, #0D47A1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 6,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.25s both' : 'none',
          }}>WHAT'S WRONG</h1>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 7vw, 90px)',
            lineHeight: 0.92, letterSpacing: '0.04em',
            color: 'white', marginBottom: 28,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.3s both' : 'none',
          }}>WITH YOUR SHOT</h1>

          <p style={{
            fontSize: isMobile ? 14 : 16,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75, maxWidth: 440, fontWeight: 300, marginBottom: 36,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.4s both' : 'none',
          }}>
            Upload your footage and get instant ML-powered feedback on
            exposure, composition, stability, sharpness, contrast, horizon
            and lighting — plus style detection and engagement prediction.
          </p>

          {/* CTAs — shown on mobile below upload box, on desktop here */}
          {!isMobile && (
            <div className="hero-ctas" style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.6s ease 0.5s both' : 'none',
            }}>
              <Link href="#how" className="ghost-btn" style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.55)', padding: '12px 28px', borderRadius: 10,
                fontWeight: 500, fontSize: 14, textDecoration: 'none',
              }}>See How It Works ↓</Link>
            </div>
          )}

          {/* Stats */}
          <div className="hero-stats" style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.6s ease 0.6s both' : 'none',
          }}>
            {[['7', 'Quality Checks'], ['3', 'ML Models'], ['<5s', 'Analysis Time']].map(([v, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? 26 : 30, color: '#29B6F6', letterSpacing: '0.05em',
                }}>{v}</div>
                <div style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Upload Box */}
        <div style={{
          opacity: mounted ? 1 : 0,
          animation: mounted ? 'fadeUp 0.7s ease 0.3s both' : 'none',
        }}>
          <UploadBox />
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how" className="content-section">
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: '#29B6F6', letterSpacing: '0.3em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>The Process</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 40 : 52,
            color: 'white', letterSpacing: '0.05em',
          }}>HOW IT WORKS</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-card"
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                padding: '28px 24px',
                background: hoveredStep === i ? 'rgba(41,182,246,0.05)' : 'transparent',
                border: '1px solid',
                borderColor: hoveredStep === i ? 'rgba(41,182,246,0.2)' : 'rgba(255,255,255,0.05)',
                borderRadius: 14, position: 'relative', overflow: 'hidden',
              }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? 44 : 56,
                color: 'rgba(41,182,246,0.12)',
                letterSpacing: '0.05em', lineHeight: 1, marginBottom: 14,
              }}>{step.num}</div>
              <h4 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22, color: 'white',
                letterSpacing: '0.08em', marginBottom: 8,
              }}>{step.title}</h4>
              <p style={{
                fontSize: 13, color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.65, fontWeight: 300,
              }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHAT WE CHECK ══ */}
      <section id="checks" className="content-section">
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: '#29B6F6', letterSpacing: '0.3em',
            textTransform: 'uppercase', marginBottom: 12,
          }}>Under the hood</p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 40 : 52,
            color: 'white', letterSpacing: '0.05em',
          }}>7 QUALITY CHECKS</h2>
        </div>

        <div className="checks-grid">
          {checks.map((check, i) => (
            <div
              key={check.name}
              className="check-card"
              onMouseEnter={() => setHoveredCheck(i)}
              onMouseLeave={() => setHoveredCheck(null)}
              style={{
                padding: '22px 20px',
                background: hoveredCheck === i ? 'rgba(41,182,246,0.06)' : 'rgba(13,21,38,0.7)',
                border: `1px solid ${hoveredCheck === i ? 'rgba(41,182,246,0.25)' : 'rgba(30,48,96,0.5)'}`,
                borderRadius: 14, position: 'relative', overflow: 'hidden',
              }}>
              {hoveredCheck === i && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, #29B6F6, transparent)',
                }} />
              )}
              <div style={{ marginBottom: 12 }}>
                <check.icon size={26} color="#29B6F6" strokeWidth={1.5} />
              </div>
              <h4 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20, color: 'white',
                letterSpacing: '0.08em', marginBottom: 8,
              }}>{check.name}</h4>
              <p style={{
                fontSize: 12, color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.65, fontWeight: 300,
              }}>{check.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ML MODELS ══ */}
      <section className="models-section">
        {[
          {
            model: 'KNN Classifier',
            task: 'Style Detection',
            desc: 'Detects shooting style from motion, color temperature, and frame composition patterns.',
            styles: ['Interview', 'Documentary', 'Travel', 'Cinematic', 'Action', 'Lifestyle'],
            color: '#29B6F6',
          },
          {
            model: 'Random Forest',
            task: 'Quality Scoring',
            desc: 'Predicts overall quality 0–100 from 5 cinematography features weighted by industry standards.',
            styles: ['Exposure 25%', 'Composition 25%', 'Contrast 20%', 'Sharpness 15%', 'Stability 15%'],
            color: '#AB47BC',
          },
          {
            model: 'Gradient Boosting',
            task: 'Engagement Prediction',
            desc: 'Predicts viewer engagement level from quality score, style, and shooting characteristics.',
            styles: ['High 🔥', 'Medium 📈', 'Low ⚠️'],
            color: '#66BB6A',
          },
        ].map(m => (
          <div key={m.model} style={{
            padding: '26px 24px',
            background: 'rgba(13,21,38,0.7)',
            border: '1px solid rgba(30,48,96,0.5)',
            borderRadius: 16,
          }}>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              color: m.color, letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: 6,
            }}>{m.model}</p>
            <h4 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22, color: 'white',
              letterSpacing: '0.08em', marginBottom: 10,
            }}>{m.task}</h4>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.65, marginBottom: 16, fontWeight: 300,
            }}>{m.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {m.styles.map(s => (
                <span key={s} style={{
                  fontSize: 11, padding: '3px 10px', borderRadius: 6,
                  background: `${m.color}12`,
                  border: `1px solid ${m.color}25`,
                  color: m.color,
                  fontFamily: "'DM Mono', monospace",
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="cta-section">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(41,182,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11,
          color: '#29B6F6', letterSpacing: '0.3em',
          textTransform: 'uppercase', marginBottom: 20,
        }}>Ready?</p>

        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(40px, 8vw, 96px)',
          color: 'white', letterSpacing: '0.04em',
          lineHeight: 0.95, marginBottom: 32,
        }}>
          UPLOAD YOUR<br />
          <span style={{
            background: 'linear-gradient(90deg, #29B6F6, #0D47A1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FOOTAGE NOW</span>
        </h2>

        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.4)',
          marginBottom: 40, fontWeight: 300,
        }}>Free. No account needed. Results in seconds.</p>

        <Link href="/video-analyzer/upload" className="cta-btn" style={{
          background: 'linear-gradient(135deg, #29B6F6, #0288D1)',
          color: 'white', padding: '16px 48px', borderRadius: 12,
          fontWeight: 700, fontSize: 15, letterSpacing: '0.06em',
          textDecoration: 'none', display: 'inline-block',
        }}>
          Analyze My Video →
        </Link>
      </section>

      <Footer />
    </div>
  )
}