'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── Interfaces ───────────────────────────────────────────────────
interface Check { name: string; score: number; feedback: string }
interface Style { detected: string; reason: string; tip: string }
interface Engagement { emoji: string; level: string; description: string; key_factors: string[] }
interface ProComparison { similarity_score: number; label: string; compared_against: string }
interface Lighting { score: number; issues: string[] }
interface Stability { motion_type: string }
interface AnalysisResult {
  filename: string; overall_score: number
  style?: Style; engagement?: Engagement
  pro_comparison?: ProComparison; lighting?: Lighting
  stability?: Stability; checks?: Check[]; suggestions?: string[]
}
interface HistoryItem {
  filename: string; overall_score: number; style: string
  engagement_level: string; checks: Record<string, unknown>; timestamp: string
}

// ── Helpers ──────────────────────────────────────────────────────
const scoreColor = (s: number) => s >= 75 ? '#4ade80' : s >= 50 ? '#facc15' : '#f87171'
const scoreLabel = (s: number) => s >= 75 ? 'Great Shot' : s >= 50 ? 'Decent Shot' : 'Needs Work'

// ── ScoreRing ────────────────────────────────────────────────────
function ScoreRing({ score, size = 140, stroke = 9 }: { score: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(30,48,96,0.5)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={scoreColor(score)} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        className="score-ring"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  )
}

// ── ScoreBar ─────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  return (
    <div className="w-full h-[3px] bg-[#1E3060]/50 rounded-full mt-2">
      <div
        className="h-full rounded-full transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${score}%`, background: scoreColor(score) }}
      />
    </div>
  )
}

// ── HistoryChart ─────────────────────────────────────────────────
function HistoryChart({ history }: { history: HistoryItem[] }) {
  return (
    <div className="flex items-end gap-1 h-14 w-full">
      {history.map((h, i) => (
        <div key={i} className="group flex-1 flex flex-col items-center justify-end h-full relative">
          <div
            className="w-full rounded-t-[3px] opacity-85 transition-opacity duration-200 hover:opacity-100"
            style={{ height: `${h.overall_score}%`, background: scoreColor(h.overall_score) }}
          />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0D1526]/95 border border-[#1E3060]/80 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10 font-mono opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
            {h.overall_score}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0D1526]/80 border border-[#1E3060]/60 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

// ── Label ────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] text-[#29B6F6] tracking-[0.25em] uppercase mb-3.5">
      {children}
    </p>
  )
}

// ── ArrowItem ────────────────────────────────────────────────────
function ArrowItem({ text, color = '#29B6F6' }: { text: string; color?: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-[12px] mt-0.5 flex-shrink-0" style={{ color }}>→</span>
      <p className="text-[13px] text-white/45 leading-[1.65]">{text}</p>
    </li>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults]     = useState<AnalysisResult | null>(null)
  const [history, setHistory]     = useState<HistoryItem[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobile, setIsMobile]   = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('frametoque_results')
    if (!data) { router.push('/video-analyzer/upload'); return }
    setResults(JSON.parse(data))
    setHistory(JSON.parse(localStorage.getItem('frametoque_history') ?? '[]'))
  }, [router])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Loading state
  if (!results) return (
    <main className="min-h-screen bg-[#060B18] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3.5">
        <div className="w-10 h-10 rounded-full border-2 border-[#29B6F6]/20 border-t-[#29B6F6] animate-spin" />
        <p className="font-mono text-[12px] text-white/30 tracking-[0.15em]">LOADING REPORT...</p>
      </div>
    </main>
  )

  const score = results.overall_score
  const tabs  = ['overview', 'analysis', 'insights']

  return (
    <main className="min-h-screen bg-[#060B18] overflow-x-hidden relative">

      <Navbar />
      <div className="h-16" />

      {/* ── Top strip ── */}
      <div className="relative z-[2] border-b border-[#1E3060]/60 bg-[#060B18]/90 backdrop-blur-xl px-4 min-h-[52px] flex items-center justify-between gap-3 flex-wrap py-2.5">

        {/* File info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase whitespace-nowrap">
            Shot Report
          </span>
          {results.filename && (
            <>
              <span className="text-white/10 text-sm">/</span>
              <span className={`text-[13px] text-white/60 font-medium truncate ${isMobile ? 'max-w-[120px]' : 'max-w-[200px]'}`}>
                {results.filename}
              </span>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#0A0F1E]/80 border border-[#1E3060]/60 rounded-xl p-1 flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg font-mono text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] uppercase cursor-pointer border-none transition-all duration-200 whitespace-nowrap
                ${activeTab === tab
                  ? 'bg-gradient-to-r from-[#29B6F6] to-[#0288D1] text-white'
                  : 'bg-transparent text-white/35 hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative z-[2] px-3 sm:px-7 py-5 pb-10 fade-1">

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[260px_1fr_260px] gap-4">

            {/* Col 1 */}
            <div className="flex flex-col gap-3.5">
              <Card>
                <Label>Overall Score</Label>
                <div className={`flex ${isMobile ? 'flex-row items-center gap-4' : 'flex-col items-center'}`}>
                  <div className="relative flex-shrink-0 mb-3">
                    <ScoreRing score={score} size={isMobile ? 90 : 120} stroke={9} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display leading-none" style={{ fontSize: isMobile ? 30 : 40, color: scoreColor(score) }}>
                        {score}
                      </span>
                      <span className="font-mono text-[10px] text-white/30">/100</span>
                    </div>
                  </div>
                  <span className="font-display text-[18px] text-white tracking-[0.08em]">
                    {scoreLabel(score)}
                  </span>
                </div>
              </Card>

              {results.style && (
                <Card>
                  <Label>Detected Style</Label>
                  <p className="font-display text-[20px] text-white tracking-[0.06em] mb-2">{results.style.detected}</p>
                  <p className="text-[12px] text-white/35 leading-[1.65] mb-3">{results.style.reason}</p>
                  <div className="bg-[#29B6F6]/[0.06] border border-[#29B6F6]/15 rounded-xl px-3 py-2.5">
                    <p className="font-mono text-[9px] text-[#29B6F6] tracking-[0.2em] mb-1.5">STYLE TIP</p>
                    <p className="text-[12px] text-white/40 leading-[1.6]">{results.style.tip}</p>
                  </div>
                </Card>
              )}
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3.5">
              <Card>
                <Label>Shot Analysis</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {results.checks?.map(check => (
                    <div key={check.name}
                      className="bg-[#0A0F1E]/60 border border-[#1E3060]/50 rounded-xl p-3.5 hover:bg-[#29B6F6]/[0.04] hover:border-[#29B6F6]/20 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-white font-semibold">{check.name}</span>
                        <span className="font-display text-[22px] tracking-[0.03em]" style={{ color: scoreColor(check.score) }}>
                          {check.score}
                        </span>
                      </div>
                      <ScoreBar score={check.score} />
                      <p className="text-[11px] text-white/35 leading-[1.6] mt-2 line-clamp-2">{check.feedback}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {results.engagement && (
                  <Card>
                    <Label>Engagement</Label>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-[28px]">{results.engagement.emoji}</span>
                      <div>
                        <p className="font-display text-[22px] text-white tracking-[0.05em] leading-none">{results.engagement.level}</p>
                        <p className="text-[11px] text-white/30">Potential</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-white/40 leading-[1.6] mb-2.5">{results.engagement.description}</p>
                    <ul className="list-none p-0 flex flex-col gap-1">
                      {results.engagement.key_factors?.slice(0, 2).map((f, i) => <ArrowItem key={i} text={f} />)}
                    </ul>
                  </Card>
                )}

                {results.pro_comparison && (
                  <Card>
                    <Label>Pro Match</Label>
                    <p className="font-display text-[48px] text-[#29B6F6] tracking-[0.02em] leading-none mb-1">
                      {results.pro_comparison.similarity_score}%
                    </p>
                    <p className="text-[13px] text-white font-semibold mb-1">{results.pro_comparison.label}</p>
                    <p className="font-mono text-[10px] text-white/25 tracking-[0.08em] mb-3.5">
                      vs {results.pro_comparison.compared_against}
                    </p>
                    <div className="h-[3px] bg-[#1E3060]/50 rounded-full">
                      <div className="h-full rounded-full bg-[#29B6F6] transition-all duration-1000"
                        style={{ width: `${results.pro_comparison.similarity_score}%` }} />
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3.5 md:col-span-2 xl:col-span-1">
              {results.lighting?.issues && results.lighting.issues.length > 0 && (
                <Card>
                  <Label>Lighting</Label>
                  <ul className="list-none p-0 flex flex-col gap-2">
                    {results.lighting.issues.map((issue, i) => <ArrowItem key={i} text={issue} color="#facc15" />)}
                  </ul>
                </Card>
              )}
              {results.suggestions && results.suggestions.length > 0 && (
                <Card>
                  <Label>💡 Suggestions</Label>
                  <ul className="list-none p-0 flex flex-col gap-2">
                    {results.suggestions.map((s, i) => <ArrowItem key={i} text={s} />)}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ═══ ANALYSIS ═══ */}
        {activeTab === 'analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

            <Card>
              <Label>Detailed Analysis</Label>
              <div className="flex flex-col gap-2.5">
                {results.checks?.map(check => (
                  <div key={check.name}
                    className="bg-[#0A0F1E]/60 border border-[#1E3060]/50 rounded-xl p-4 hover:bg-[#29B6F6]/[0.04] hover:border-[#29B6F6]/20 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] text-white font-semibold">{check.name}</span>
                      <span className="font-display text-[24px] tracking-[0.03em]" style={{ color: scoreColor(check.score) }}>
                        {check.score}/100
                      </span>
                    </div>
                    <div className="h-1 bg-[#1E3060]/50 rounded-full mb-2.5">
                      <div className="h-full rounded-full transition-all duration-[800ms]"
                        style={{ width: `${check.score}%`, background: scoreColor(check.score) }} />
                    </div>
                    <p className="text-[13px] text-white/45 leading-[1.65]">{check.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex flex-col gap-3.5">
              <Card>
                <Label>Quick Stats</Label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Overall Score', value: score,                                                   color: scoreColor(score) },
                    { label: 'Style',         value: results.style?.detected ?? '—',                          color: 'white' },
                    { label: 'Engagement',    value: results.engagement?.level ?? '—',                        color: '#29B6F6' },
                    { label: 'Pro Match',     value: `${results.pro_comparison?.similarity_score ?? 0}%`,     color: '#29B6F6' },
                    { label: 'Motion',        value: results.stability?.motion_type?.replace(/_/g, ' ') ?? '—', color: 'white' },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between items-center pb-2 border-b border-[#1E3060]/40">
                      <span className="text-[12px] text-white/35">{s.label}</span>
                      <span className="font-mono text-[12px] font-semibold tracking-[0.05em]" style={{ color: s.color }}>
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {results.lighting && (
                <Card>
                  <Label>Lighting Detail</Label>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[12px] text-white/35">Score</span>
                    <span className="font-display text-[20px]" style={{ color: scoreColor(results.lighting.score) }}>
                      {results.lighting.score}/100
                    </span>
                  </div>
                  <ul className="list-none p-0 flex flex-col gap-2">
                    {results.lighting.issues?.map((issue, i) => <ArrowItem key={i} text={issue} color="#facc15" />)}
                  </ul>
                </Card>
              )}

              {results.suggestions && results.suggestions.length > 0 && (
                <Card>
                  <Label>💡 Suggestions</Label>
                  <ul className="list-none p-0 flex flex-col gap-2">
                    {results.suggestions.map((s, i) => <ArrowItem key={i} text={s} />)}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ═══ INSIGHTS ═══ */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">

            <div className="flex flex-col gap-3.5">
              {history.length >= 2 ? (
                <>
                  <Card>
                    <Label>🎓 Score History</Label>
                    <p className="font-mono text-[10px] text-white/20 tracking-[0.1em] mb-4">
                      YOUR LAST {history.length} UPLOADS
                    </p>
                    <HistoryChart history={history} />
                    <div className="flex justify-between mt-1.5 font-mono text-[10px] text-white/20 tracking-[0.1em]">
                      <span>OLDEST</span><span>LATEST</span>
                    </div>
                  </Card>

                  <Card>
                    <Label>Upload History</Label>
                    <div className="flex flex-col gap-1.5">
                      {[...history].reverse().map((h, i) => (
                        <div key={i}
                          className="flex items-center justify-between bg-[#0A0F1E]/60 border border-[#1E3060]/50 rounded-xl px-3.5 py-2.5 gap-2 hover:border-[#29B6F6]/20 hover:bg-[#29B6F6]/[0.03] transition-all duration-200"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-[10px] text-white/20 w-5 flex-shrink-0">
                              #{history.length - i}
                            </span>
                            <span className="text-[13px] text-white font-medium truncate">
                              {h.filename ?? 'video.mp4'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {!isMobile && (
                              <span className="font-mono text-[11px] text-white/30">{h.style ?? '—'}</span>
                            )}
                            <span className="font-display text-[18px] tracking-[0.03em]" style={{ color: scoreColor(h.overall_score) }}>
                              {h.overall_score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="py-16 text-center">
                  <span className="text-[48px] block mb-4">📈</span>
                  <p className="font-display text-[22px] text-white tracking-[0.08em] mb-2">NOT ENOUGH DATA YET</p>
                  <p className="text-[13px] text-white/35">Upload at least 2 videos to see your learning trend.</p>
                </Card>
              )}
            </div>

            <div className="flex flex-col gap-3.5">
              {history.length >= 2 && (() => {
                const scores   = history.map(h => h.overall_score)
                const avg      = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                const trend    = scores[scores.length - 1] - scores[0]
                const trendLabel = trend > 0 ? `↑ +${trend}` : trend < 0 ? `↓ ${trend}` : '→ 0'
                const trendCol   = trend > 0 ? '#4ade80' : trend < 0 ? '#f87171' : '#facc15'
                const best     = Math.max(...scores)
                const worst    = Math.min(...scores)
                const styleCounts: Record<string, number> = {}
                history.forEach(h => { if (h.style) styleCounts[h.style] = (styleCounts[h.style] || 0) + 1 })
                const topStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

                return (
                  <>
                    <Card>
                      <Label>Your Stats</Label>
                      <div className="flex flex-col gap-2.5">
                        {[
                          { label: 'Videos Analyzed', value: history.length, color: 'white'    },
                          { label: 'Average Score',   value: avg,            color: '#29B6F6'  },
                          { label: 'Best Score',      value: best,           color: '#4ade80'  },
                          { label: 'Lowest Score',    value: worst,          color: '#f87171'  },
                          { label: 'Overall Trend',   value: trendLabel,     color: trendCol   },
                        ].map(s => (
                          <div key={s.label} className="flex justify-between items-center pb-2.5 border-b border-[#1E3060]/40">
                            <span className="text-[12px] text-white/35">{s.label}</span>
                            <span className="font-mono text-[13px] font-semibold" style={{ color: s.color }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {topStyle && (
                      <Card>
                        <Label>🎬 Your Style</Label>
                        <p className="font-display text-[20px] text-white tracking-[0.06em] mb-1.5">{topStyle}</p>
                        <p className="text-[12px] text-white/30">Most common detected style</p>
                      </Card>
                    )}

                    <Card>
                      <Label>📚 How to Improve</Label>
                      <ul className="list-none p-0 flex flex-col gap-2.5">
                        {([
                          trend < 0 && "Scores declining — focus on consistent lighting setup.",
                          avg < 60  && "Avg below 60. Composition is the fastest win — use rule of thirds.",
                          avg >= 60 && avg < 75 && "You're improving! Focus on stability — get a tripod or gimbal.",
                          avg >= 75 && "Great average! Push for consistency — aim for 80+ on every upload.",
                        ] as (string | false)[]).filter(Boolean).map((tip, i) => (
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

      <Footer />
    </main>
  )
}