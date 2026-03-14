import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import UploadBox from '@/app/video-analyzer/components/UploadBox'
import { Frame, ChartNoAxesCombined, Bot, LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  label: string
  desc: string
}

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const steps: Step[] = [
  { icon: Frame,               label: 'Frame Extraction',    desc: '8 frames sampled evenly across the full timeline.' },
  { icon: Bot,                 label: 'AI Analysis',         desc: '3 ML models run 7 quality checks simultaneously.' },
  { icon: ChartNoAxesCombined, label: 'Score Report',        desc: 'Full breakdown with feedback and suggestions.' },
]

export default function UploadPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#060B18',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .step-card {
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s cubic-bezier(0.23,1,0.32,1);
        }
        .step-card:hover {
          transform: translateY(-4px);
          border-color: rgba(41,182,246,0.25) !important;
          background: rgba(41,182,246,0.04) !important;
        }
        .fade-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .fade-2 { animation: fadeUp 0.6s ease 0.2s both; }
        .fade-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .fade-4 { animation: fadeUp 0.6s ease 0.45s both; }
        .fade-5 { animation: fadeUp 0.6s ease 0.55s both; }
      `}</style>

      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(41,182,246,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,182,246,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Scanline */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        zIndex: 1, overflow: 'hidden', opacity: 0.025,
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(transparent, #29B6F6, transparent)',
          animation: 'scanline 10s linear infinite',
        }} />
      </div>

      {/* Grain */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: grain, backgroundRepeat: 'repeat',
        pointerEvents: 'none',
      }} />

      {/* Center glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41,182,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <Navbar />

      <section style={{
        position: 'relative', zIndex: 2,
        maxWidth: 720,
        margin: '0 auto',
        padding: '120px 24px 100px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Step indicator */}
        <div className="fade-1" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 28,
        }}>
          {/* Step dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 28, height: 6, borderRadius: 3,
              background: 'linear-gradient(90deg, #29B6F6, #0288D1)',
            }} />
            <div style={{
              width: 6, height: 6, borderRadius: 3,
              background: 'rgba(255,255,255,0.15)',
            }} />
          </div>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, color: '#29B6F6',
            letterSpacing: '0.25em', textTransform: 'uppercase',
          }}>Step 1 of 2</span>
        </div>

        {/* Heading */}
        <h1 className="fade-2" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(52px, 8vw, 80px)',
          letterSpacing: '0.04em', lineHeight: 0.95,
          color: 'white', textAlign: 'center', marginBottom: 16,
        }}>
          UPLOAD YOUR<br />
          <span style={{
            background: 'linear-gradient(90deg, #29B6F6, #0D47A1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FOOTAGE</span>
        </h1>

        <p className="fade-3" style={{
          fontSize: 15, color: 'rgba(255,255,255,0.4)',
          textAlign: 'center', maxWidth: 440,
          lineHeight: 1.75, fontWeight: 300, marginBottom: 48,
        }}>
          AI extracts key frames and runs 7 quality checks on your shot —
          exposure, composition, stability, style and more.
        </p>

        {/* Upload box */}
        <div className="fade-4" style={{ width: '100%' }}>
          <UploadBox />
        </div>

        {/* Divider */}
        <div className="fade-5" style={{
          width: '100%', marginTop: 56, marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>What happens after upload</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Steps */}
        <div className="fade-5" style={{
          width: '100%',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        }}>
          {steps.map((step, i) => (
            <div key={step.label} className="step-card" style={{
              padding: '22px 18px',
              background: 'rgba(13,21,38,0.7)',
              border: '1px solid rgba(30,48,96,0.5)',
              borderRadius: 14, textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Step number */}
              <div style={{
                position: 'absolute', top: 10, right: 12,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28, color: 'rgba(41,182,246,0.1)',
                letterSpacing: '0.05em', lineHeight: 1,
              }}>0{i + 1}</div>

              <div style={{
                display: 'flex', justifyContent: 'center', marginBottom: 14,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'rgba(41,182,246,0.08)',
                  border: '1px solid rgba(41,182,246,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <step.icon size={20} color="#29B6F6" strokeWidth={1.5} />
                </div>
              </div>

              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 15, letterSpacing: '0.08em',
                color: 'white', marginBottom: 6,
              }}>{step.label}</p>

              <p style={{
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.6, fontWeight: 300,
              }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p style={{
          marginTop: 28,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em', textAlign: 'center',
          animation: 'fadeUp 0.6s ease 0.7s both',
        }}>
          🔒 Your video is deleted immediately after analysis. Nothing is stored.
        </p>

      </section>

      <Footer />
    </main>
  )
}