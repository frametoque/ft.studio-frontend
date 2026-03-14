'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Check {
  name: string
  score: number
  feedback: string
}

interface Style {
  detected: string
  reason: string
  tip: string
}

interface Engagement {
  emoji: string
  level: string
  description: string
  key_factors: string[]
}

interface ProComparison {
  similarity_score: number
  label: string
  compared_against: string
}

interface Lighting {
  score: number
  issues: string[]
}

interface Stability {
  motion_type: string
}

interface AnalysisResult {
  filename: string
  overall_score: number
  style?: Style
  engagement?: Engagement
  pro_comparison?: ProComparison
  lighting?: Lighting
  stability?: Stability
  checks?: Check[]
  suggestions?: string[]
}

interface HistoryItem {
  filename: string
  overall_score: number
  style: string
  engagement_level: string
  checks: Record<string, unknown>
  timestamp: string
}

interface ScoreRingProps {
  score: number
  size?: number
  stroke?: number
}

interface ScoreBarProps {
  score: number
  animated?: boolean
}

interface HistoryChartProps {
  history: HistoryItem[]
}

interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

interface LabelProps {
  children: React.ReactNode
}

interface ArrowItemProps {
  text: string
  color?: string
}

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

// ── Score ring ───────────────────────────────────────────────────
function ScoreRing({ score, size = 140, stroke = 9 }: ScoreRingProps) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 75 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(30,48,96,0.5)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  )
}

// ── Score bar ────────────────────────────────────────────────────
function ScoreBar({ score, animated = true }: ScoreBarProps) {
  const color = score >= 75 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'
  return (
    <div style={{
      width: '100%', height: 3,
      background: 'rgba(30,48,96,0.5)', borderRadius: 2, marginTop: 8,
    }}>
      <div style={{
        height: '100%', borderRadius: 2,
        background: color,
        width: animated ? `${score}%` : '0%',
        transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  )
}

// ── History chart ────────────────────────────────────────────────
function HistoryChart({ history }: HistoryChartProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56, width: '100%' }}>
      {history.map((h, i) => {
        const color = h.overall_score >= 75 ? '#4ade80'
                    : h.overall_score >= 50 ? '#facc15' : '#f87171'
        return (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end', height: '100%',
            position: 'relative',
          }}
          className="group">
            <div style={{
              width: '100%', borderRadius: '3px 3px 0 0',
              background: color, height: `${h.overall_score}%`,
              opacity: 0.85, transition: 'opacity 0.2s',
            }} />
            <div style={{
              position: 'absolute', top: -24, left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(13,21,38,0.95)',
              border: '1px solid rgba(30,48,96,0.8)',
              color: 'white', fontSize: 10, padding: '2px 6px',
              borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10,
              fontFamily: "'DM Mono', monospace",
              opacity: 0, pointerEvents: 'none',
            }} className="group-hover-tooltip">
              {h.overall_score}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Card wrapper ─────────────────────────────────────────────────
function Card({ children, style = {} }: CardProps) {
  return (
    <div style={{
      background: 'rgba(13,21,38,0.8)',
      border: '1px solid rgba(30,48,96,0.6)',
      borderRadius: 16, padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Section label ────────────────────────────────────────────────
function Label({ children }: LabelProps) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 10, color: '#29B6F6',
      letterSpacing: '0.25em', textTransform: 'uppercase',
      marginBottom: 14,
    }}>{children}</p>
  )
}

// ── Arrow list item ──────────────────────────────────────────────
function ArrowItem({ text, color = '#29B6F6' }: ArrowItemProps) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</span>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{text}</p>
    </li>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════
export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const data = localStorage.getItem('frametoque_results')
    if (!data) { router.push('/video-analyzer/upload'); return }
    setResults(JSON.parse(data))
    const h = JSON.parse(localStorage.getItem('frametoque_history') ?? '[]')
    setHistory(h)
  }, [router])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!results) return (
    <main style={{
      minHeight: '100vh', background: '#060B18',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '2px solid rgba(41,182,246,0.2)',
          borderTopColor: '#29B6F6',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
          LOADING REPORT...
        </p>
        <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      </div>
    </main>
  )

  const score = results.overall_score
  const scoreColor = score >= 75 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'
  const scoreLabel = score >= 75 ? 'Great Shot' : score >= 50 ? 'Decent Shot' : 'Needs Work'

  const tabs = ['overview', 'analysis', 'insights']

  return (
    <main style={{
      minHeight: '100vh', background: '#060B18',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden', position: 'relative',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .tab-btn {
          padding: 6px 12px; border-radius: 8px; border: none;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        @media (min-width: 480px) {
          .tab-btn { padding: 6px 16px; font-size: 11px; letter-spacing: 0.15em; }
        }
        .tab-btn.active {
          background: linear-gradient(135deg, #29B6F6, #0288D1);
          color: white;
        }
        .tab-btn.inactive {
          background: transparent; color: rgba(255,255,255,0.35);
        }
        .tab-btn.inactive:hover { color: white; }
        .check-row {
          transition: background 0.2s, border-color 0.2s;
        }
        .check-row:hover {
          background: rgba(41,182,246,0.04) !important;
          border-color: rgba(41,182,246,0.2) !important;
        }
        .history-row {
          transition: border-color 0.2s, background 0.2s;
        }
        .history-row:hover {
          border-color: rgba(41,182,246,0.2) !important;
          background: rgba(41,182,246,0.03) !important;
        }
        .analyze-btn {
          background: linear-gradient(135deg, #29B6F6, #0288D1);
          color: white; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          font-size: 13px; letter-spacing: 0.04em;
          padding: 9px 20px; border-radius: 9px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .analyze-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(41,182,246,0.3);
        }
        .group:hover .group-hover-tooltip { opacity: 1 !important; }

        /* ── Responsive grid overrides ── */
        .overview-grid {
          display: grid;
          grid-template-columns: 260px 1fr 260px;
          gap: 16px;
        }
        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
        }
        .insights-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 16px;
        }
        .engagement-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .checks-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 1024px) {
          .overview-grid {
            grid-template-columns: 220px 1fr;
          }
          .overview-col3 {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .overview-col3 > * { }
        }

        @media (max-width: 767px) {
          .overview-grid,
          .analysis-grid,
          .insights-grid {
            grid-template-columns: 1fr !important;
          }
          .engagement-grid {
            grid-template-columns: 1fr 1fr;
          }
          .checks-grid {
            grid-template-columns: 1fr;
          }
          .overview-col3 {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .engagement-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Score card horizontal on mobile */
        .score-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 767px) {
          .score-card-inner {
            flex-direction: row;
            gap: 16px;
            justify-content: flex-start;
          }
        }
      `}</style>

      {/* Background effects */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(41,182,246,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,182,246,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        overflow: 'hidden', opacity: 0.02,
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(transparent, #29B6F6, transparent)',
          animation: 'scanline 12s linear infinite',
        }} />
      </div>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: grain, backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      <Navbar />
      <br /><br /><br />

      {/* ── Top strip ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderBottom: '1px solid rgba(30,48,96,0.6)',
        background: 'rgba(6,11,24,0.9)', backdropFilter: 'blur(20px)',
        padding: '0 16px',
        minHeight: 52,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* File info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, paddingTop: 10, paddingBottom: 10 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>Shot Report</span>
          {results.filename && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 14 }}>/</span>
              <span style={{
                fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                maxWidth: isMobile ? 120 : 200,
              }}>{results.filename}</span>
            </>
          )}
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 4,
          background: 'rgba(10,15,30,0.8)',
          border: '1px solid rgba(30,48,96,0.6)',
          borderRadius: 10, padding: 4,
          flexShrink: 0,
        }}>
          {tabs.map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? 'active' : 'inactive'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Dashboard body ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile ? '16px 12px 40px' : '20px 28px 40px',
        animation: 'fadeUp 0.5s ease both',
      }}>

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === 'overview' && (
          <div className="overview-grid">

            {/* Col 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Score card */}
              <Card>
                <Label>Overall Score</Label>
                <div className="score-card-inner">
                  <div style={{ position: 'relative', marginBottom: isMobile ? 0 : 12, flexShrink: 0 }}>
                    <ScoreRing score={score} size={isMobile ? 90 : 120} stroke={9} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: isMobile ? 30 : 40, color: scoreColor, letterSpacing: '0.02em', lineHeight: 1,
                      }}>{score}</span>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10, color: 'rgba(255,255,255,0.3)',
                      }}>/100</span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18, color: 'white', letterSpacing: '0.08em',
                  }}>{scoreLabel}</span>
                </div>
              </Card>

              {/* Style card */}
              {results.style && (
                <Card>
                  <Label>Detected Style</Label>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 20, color: 'white',
                    letterSpacing: '0.06em', marginBottom: 8,
                  }}>{results.style.detected}</p>
                  <p style={{
                    fontSize: 12, color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.65, marginBottom: 12,
                  }}>{results.style.reason}</p>
                  <div style={{
                    background: 'rgba(41,182,246,0.06)',
                    border: '1px solid rgba(41,182,246,0.15)',
                    borderRadius: 10, padding: '10px 12px',
                  }}>
                    <p style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9,
                      color: '#29B6F6', letterSpacing: '0.2em', marginBottom: 5,
                    }}>STYLE TIP</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                      {results.style.tip}
                    </p>
                  </div>
                </Card>
              )}
            </div>

            {/* Col 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* 7 checks */}
              <Card>
                <Label>Shot Analysis</Label>
                <div className="checks-grid">
                  {results.checks?.map(check => {
                    const c = check.score >= 75 ? '#4ade80'
                            : check.score >= 50 ? '#facc15' : '#f87171'
                    return (
                      <div key={check.name} className="check-row" style={{
                        background: 'rgba(10,15,30,0.6)',
                        border: '1px solid rgba(30,48,96,0.5)',
                        borderRadius: 12, padding: '14px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{check.name}</span>
                          <span style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 22, color: c, letterSpacing: '0.03em',
                          }}>{check.score}</span>
                        </div>
                        <ScoreBar score={check.score} />
                        <p style={{
                          fontSize: 11, color: 'rgba(255,255,255,0.35)',
                          lineHeight: 1.6, marginTop: 8,
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>{check.feedback}</p>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Engagement + Pro match */}
              <div className="engagement-grid">
                {results.engagement && (
                  <Card>
                    <Label>Engagement</Label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 28 }}>{results.engagement.emoji}</span>
                      <div>
                        <p style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 22, color: 'white', letterSpacing: '0.05em', lineHeight: 1,
                        }}>{results.engagement.level}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Potential</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 10 }}>
                      {results.engagement.description}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {results.engagement.key_factors?.slice(0, 2).map((f, i) => (
                        <ArrowItem key={i} text={f} />
                      ))}
                    </ul>
                  </Card>
                )}

                {results.pro_comparison && (
                  <Card>
                    <Label>Pro Match</Label>
                    <p style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 48, color: '#29B6F6',
                      letterSpacing: '0.02em', lineHeight: 1, marginBottom: 4,
                    }}>{results.pro_comparison.similarity_score}%</p>
                    <p style={{ fontSize: 13, color: 'white', fontWeight: 600, marginBottom: 4 }}>
                      {results.pro_comparison.label}
                    </p>
                    <p style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10, color: 'rgba(255,255,255,0.25)',
                      letterSpacing: '0.08em', marginBottom: 14,
                    }}>vs {results.pro_comparison.compared_against}</p>
                    <div style={{ height: 3, background: 'rgba(30,48,96,0.5)', borderRadius: 2 }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: '#29B6F6',
                        width: `${results.pro_comparison.similarity_score}%`,
                        transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                      }} />
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Col 3 */}
            <div className="overview-col3" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {results.lighting?.issues && results.lighting.issues.length > 0 && (
                <Card>
                  <Label>Lighting</Label>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {results.lighting.issues.map((issue, i) => (
                      <ArrowItem key={i} text={issue} color="#facc15" />
                    ))}
                  </ul>
                </Card>
              )}

              {results.suggestions && results.suggestions.length > 0 && (
                <Card>
                  <Label>💡 Suggestions</Label>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {results.suggestions.map((s, i) => (
                      <ArrowItem key={i} text={s} />
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ═══ ANALYSIS ═══ */}
        {activeTab === 'analysis' && (
          <div className="analysis-grid">

            <Card>
              <Label>Detailed Analysis</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.checks?.map(check => {
                  const c = check.score >= 75 ? '#4ade80'
                          : check.score >= 50 ? '#facc15' : '#f87171'
                  return (
                    <div key={check.name} className="check-row" style={{
                      background: 'rgba(10,15,30,0.6)',
                      border: '1px solid rgba(30,48,96,0.5)',
                      borderRadius: 12, padding: '16px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>{check.name}</span>
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 24, color: c, letterSpacing: '0.03em',
                        }}>{check.score}/100</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(30,48,96,0.5)', borderRadius: 2, marginBottom: 10 }}>
                        <div style={{
                          height: '100%', borderRadius: 2, background: c,
                          width: `${check.score}%`,
                          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                        }} />
                      </div>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{check.feedback}</p>
                    </div>
                  )
                })}
              </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Quick stats */}
              <Card>
                <Label>Quick Stats</Label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Overall Score', value: score, color: scoreColor },
                    { label: 'Style',         value: results.style?.detected ?? '—', color: 'white' },
                    { label: 'Engagement',    value: results.engagement?.level ?? '—', color: '#29B6F6' },
                    { label: 'Pro Match',     value: `${results.pro_comparison?.similarity_score ?? 0}%`, color: '#29B6F6' },
                    { label: 'Motion',        value: results.stability?.motion_type?.replace(/_/g, ' ') ?? '—', color: 'white' },
                  ].map(s => (
                    <div key={s.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingBottom: 8, borderBottom: '1px solid rgba(30,48,96,0.4)',
                    }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12, color: s.color, fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {results.lighting && (
                <Card>
                  <Label>Lighting Detail</Label>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 10,
                  }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Score</span>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                      color: results.lighting.score >= 75 ? '#4ade80'
                           : results.lighting.score >= 50 ? '#facc15' : '#f87171',
                    }}>{results.lighting.score}/100</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {results.lighting.issues?.map((issue, i) => (
                      <ArrowItem key={i} text={issue} color="#facc15" />
                    ))}
                  </ul>
                </Card>
              )}

              {results.suggestions && results.suggestions.length > 0 && (
                <Card>
                  <Label>💡 Suggestions</Label>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {results.suggestions.map((s, i) => (
                      <ArrowItem key={i} text={s} />
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ═══ INSIGHTS ═══ */}
        {activeTab === 'insights' && (
          <div className="insights-grid">

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {history.length >= 2 ? (
                <>
                  <Card>
                    <Label>🎓 Score History</Label>
                    <p style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 10,
                      color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
                      marginBottom: 16,
                    }}>YOUR LAST {history.length} UPLOADS</p>
                    <HistoryChart history={history} />
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      marginTop: 6,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10, color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.1em',
                    }}>
                      <span>OLDEST</span><span>LATEST</span>
                    </div>
                  </Card>

                  <Card>
                    <Label>Upload History</Label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[...history].reverse().map((h, i) => {
                        const c = h.overall_score >= 75 ? '#4ade80'
                                : h.overall_score >= 50 ? '#facc15' : '#f87171'
                        return (
                          <div key={i} className="history-row" style={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'rgba(10,15,30,0.6)',
                            border: '1px solid rgba(30,48,96,0.5)',
                            borderRadius: 10, padding: '10px 14px',
                            gap: 8,
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                              <span style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10, color: 'rgba(255,255,255,0.2)',
                                width: 20, flexShrink: 0,
                              }}>#{history.length - i}</span>
                              <span style={{
                                fontSize: 13, color: 'white', fontWeight: 500,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>{h.filename ?? 'video.mp4'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                              {!isMobile && (
                                <span style={{
                                  fontFamily: "'DM Mono', monospace",
                                  fontSize: 11, color: 'rgba(255,255,255,0.3)',
                                }}>{h.style ?? '—'}</span>
                              )}
                              <span style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: 18, color: c, letterSpacing: '0.03em',
                              }}>{h.overall_score}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </>
              ) : (
                <Card style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>📈</span>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 22, color: 'white', letterSpacing: '0.08em', marginBottom: 8,
                  }}>NOT ENOUGH DATA YET</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                    Upload at least 2 videos to see your learning trend.
                  </p>
                </Card>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {history.length >= 2 && (() => {
                const scores = history.map(h => h.overall_score)
                const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                const trend = scores[scores.length - 1] - scores[0]
                const trendLabel = trend > 0 ? `↑ +${trend}` : trend < 0 ? `↓ ${trend}` : '→ 0'
                const trendColor = trend > 0 ? '#4ade80' : trend < 0 ? '#f87171' : '#facc15'
                const best = Math.max(...scores)
                const worst = Math.min(...scores)
                const styleCounts: Record<string, number> = {}
                history.forEach(h => { 
                  if (h.style) styleCounts[h.style] = (styleCounts[h.style] || 0) + 1 
                })
                const topStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

                return (
                  <>
                    <Card>
                      <Label>Your Stats</Label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          { label: 'Videos Analyzed', value: history.length, color: 'white' },
                          { label: 'Average Score',   value: avg,            color: '#29B6F6' },
                          { label: 'Best Score',      value: best,           color: '#4ade80' },
                          { label: 'Lowest Score',    value: worst,          color: '#f87171' },
                          { label: 'Overall Trend',   value: trendLabel,     color: trendColor },
                        ].map(s => (
                          <div key={s.label} style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', paddingBottom: 10,
                            borderBottom: '1px solid rgba(30,48,96,0.4)',
                          }}>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                            <span style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 13, color: s.color, fontWeight: 600,
                            }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {topStyle && (
                      <Card>
                        <Label>🎬 Your Style</Label>
                        <p style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 20, color: 'white',
                          letterSpacing: '0.06em', marginBottom: 6,
                        }}>{topStyle}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Most common detected style</p>
                      </Card>
                    )}

                    <Card>
                      <Label>📚 How to Improve</Label>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          trend < 0 && "Scores declining — focus on consistent lighting setup.",
                          avg < 60 && "Avg below 60. Composition is the fastest win — use rule of thirds.",
                          avg >= 60 && avg < 75 && "You're improving! Focus on stability — get a tripod or gimbal.",
                          avg >= 75 && "Great average! Push for consistency — aim for 80+ on every upload.",
                        ].filter(Boolean).map((tip, i) => (
                          <ArrowItem key={i} text={tip as string} />
                        ))}
                      </ul>
                    </Card>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>
      <br /><br />
      <Footer />
    </main>
  )
}