import { Target, Zap, Lock, LucideIcon } from 'lucide-react'

// Define the feature item interface
interface FeatureItem {
  icon: LucideIcon
  title: string
  desc: string
}

// Define features outside component for cleaner code
const features: FeatureItem[] = [
  { 
    icon: Target, 
    title: 'Craft-first', 
    desc: 'Every metric is grounded in cinematography principles, not generic image processing.' 
  },
  { 
    icon: Zap, 
    title: 'Instant feedback', 
    desc: 'ML inference runs in seconds. No waiting, no queues.' 
  },
  { 
    icon: Lock, 
    title: 'Your data stays yours', 
    desc: 'Videos are analyzed and immediately deleted. Nothing is stored.' 
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <>
      <style>{`
        .about-section {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 72px 48px;
          max-width: 1200px; margin: 0 auto;
          display: flex; gap: 80; align-items: center;
          flex-wrap: wrap;
        }
        .about-left { flex: 1 1 320px; }
        .about-right { flex: 1 1 320px; display: flex; flex-direction: column; gap: 16px; }
        .about-heading { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: white; letter-spacing: 0.05em; line-height: 1; margin-bottom: 20px; }
        .footer-inner {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 28px 48px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
        }

        @media (max-width: 767px) {
          .about-section {
            padding: 48px 20px;
            gap: 40px;
            flex-direction: column;
          }
          .about-left, .about-right { flex: 1 1 100%; }
          .about-heading { font-size: 36px; }
          .footer-inner {
            padding: 24px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>

      {/* ABOUT STRIP */}
      <section id="about" className="about-section">
        <div className="about-left">
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: '#29B6F6', letterSpacing: '0.3em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>Built for creators</p>
          <h3 className="about-heading">
            TOOLS THAT<br />THINK LIKE<br />A FILMMAKER
          </h3>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.8, fontWeight: 300, maxWidth: 400,
          }}>
            FrameToque Studio is a growing collection of AI tools designed around
            real filmmaking workflows. No fluff, no generic outputs — every tool is
            built around how cinematographers actually think.
          </p>
        </div>

        <div className="about-right">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              display: 'flex', gap: 16, padding: '18px 20px',
              background: 'rgba(13,21,38,0.6)',
              border: '1px solid rgba(30,48,96,0.5)', borderRadius: 12,
            }}>
              <Icon size={24} color="#29B6F6" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 14, color: 'white', fontWeight: 600, marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)',
          }}>FRAMETOQUE STUDIO</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace" }}>
          © {currentYear} Frame Toque Digital. All rights reserved.
        </p>
      </footer>
    </>
  )
}