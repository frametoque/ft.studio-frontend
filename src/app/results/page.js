'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

// ── Radial score ring ────────────────────────────────────────────
function ScoreRing({ score, size = 140, stroke = 10 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 75 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171'

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="#1E3060" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
    </svg>
  )
}

// ── Mini bar ─────────────────────────────────────────────────────
function MiniBar({ score }) {
  const color = score >= 75 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="w-full bg-[#1E3060] rounded-full h-1.5 mt-2">
      <div className={`h-1.5 rounded-full ${color} transition-all duration-700`}
        style={{ width: `${score}%` }} />
    </div>
  )
}

// ── Stat pill ────────────────────────────────────────────────────
function Pill({ label, value, color = 'text-[#2563EB]' }) {
  return (
    <div className="flex flex-col items-center bg-[#0A0F1E] border border-[#1E3060] rounded-xl px-4 py-3">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[#5A7AAA] text-xs mt-0.5">{label}</span>
    </div>
  )
}

// ── Attention heatmap cell ────────────────────────────────────────
function HeatCell({ pct, isPrimary }) {
  const intensity = Math.min(pct / 18, 1)
  return (
    <div
      className={`rounded-lg flex flex-col items-center justify-center gap-0.5 border transition-all
        ${isPrimary ? 'border-[#2563EB] shadow-[0_0_12px_#2563EB40]' : 'border-[#1E3060]'}`}
      style={{ backgroundColor: `rgba(26,115,232,${0.04 + intensity * 0.55})` }}
    >
      <span className={`text-xs font-bold ${isPrimary ? 'text-white' : 'text-[#5A7AAA]'}`}>
        {pct}%
      </span>
      {isPrimary && <span className="text-[10px] text-[#2563EB]">●</span>}
    </div>
  )
}

// ── Learning bar chart ────────────────────────────────────────────
function HistoryChart({ history }) {
  return (
    <div className="flex items-end gap-1 h-14 w-full">
      {history.map((h, i) => {
        const pct = h.overall_score
        const bg = h.overall_score >= 75 ? 'bg-green-400'
                 : h.overall_score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
            <div className={`w-full rounded-t ${bg} transition-all duration-500`}
              style={{ height: `${pct}%` }} />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0D1526] border
              border-[#1E3060] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0
              group-hover:opacity-100 transition whitespace-nowrap z-10">
              {h.overall_score}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════
export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState(null)
  const [history, setHistory] = useState([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const data = localStorage.getItem('frametoque_results')
    if (!data) { router.push('/upload'); return }
    setResults(JSON.parse(data))

  const userHistory = JSON.parse(localStorage.getItem('frametoque_history') ?? '[]')
  setHistory(userHistory)

  }, [router])

  if (!results) {
    return (
      <main className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5A7AAA] text-sm">Loading your report...</p>
        </div>
      </main>
    )
  }

  const score = results.overall_score
  const scoreColor = score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreLabel = score >= 75 ? 'Great Shot' : score >= 50 ? 'Decent Shot' : 'Needs Work'
  const scoreEmoji = score >= 75 ? '🎉' : score >= 50 ? '👍' : '🔧'

  const frameCards = results.frames
    ? results.frames
    : results.frame_scores
      ? results.frame_scores.map(s => ({ score: s, dataUrl: null }))
      : Array.from({ length: 6 }, () => ({ score: null, dataUrl: null }))

  const tabs = ['overview', 'analysis', 'insights']

  return (
    <main className="min-h-screen bg-[#050810] flex flex-col">
      <Navbar />

      {/* ── Top strip ── */}
      <div className="border-b border-[#1E3060] bg-[#0A0F1E] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <span className="text-[#5A7AAA] text-sm">Shot Quality Report</span>
          {results.filename && (
            <>
              <span className="text-[#1E3060]">|</span>
              <span className="text-white text-sm font-medium truncate max-w-[200px]">
                {results.filename}
              </span>
            </>
          )}
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 bg-[#050810] border border-[#1E3060] rounded-lg p-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition
                ${activeTab === tab
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#5A7AAA] hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <button onClick={() => router.push('/upload')}
          className="bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Analyze Another →
        </button>
      </div>

      {/* ── Dashboard body ── */}
      <div className="flex-1 overflow-auto px-6 py-5">

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-12 gap-4">

            {/* Col 1 — Score + style */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">

              {/* Overall score card */}
              <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5 flex flex-col items-center">
                <p className="text-[#5A7AAA] text-sm uppercase tracking-widest mb-3">Overall Score</p>
                <div className="relative">
                  <ScoreRing score={score} size={130} stroke={10} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${scoreColor}`}>{score}</span>
                    <span className="text-[#5A7AAA] text-xs">/ 100</span>
                  </div>
                </div>
                <p className="text-white font-bold mt-3 text-base">{scoreLabel} {scoreEmoji}</p>
              </div>

              {/* Style card */}
              {results.style && (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                  <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Style</p>
                  <p className="text-white font-bold text-xl leading-tight mb-2">{results.style.detected}</p>
                  <p className="text-[#5A7AAA] text-sm leading-relaxed mb-3">{results.style.reason}</p>
                  <div className="bg-[#0A0F1E] border border-[#1E3060] rounded-xl p-3">
                    <p className="text-[#2563EB] text-xs font-semibold uppercase mb-1">Style Tip</p>
                    <p className="text-[#5A7AAA] text-sm leading-relaxed">{results.style.tip}</p>
                  </div>
                </div>
              )}

          
            </div>

            {/* Col 2 — Checks grid + engagement + pro match */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">

              {/* 7 checks in a 2-col grid */}
              <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-4">Shot Analysis</p>
                <div className="grid grid-cols-2 gap-3">
                  {results.checks?.map((check) => {
                    const c = check.score >= 75 ? 'text-green-400'
                            : check.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                    return (
                      <div key={check.name} className="bg-[#0A0F1E] border border-[#1E3060] rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-semibold">{check.name}</span>
                          <span className={`text-lg font-black ${c}`}>{check.score}</span>
                        </div>
                        <MiniBar score={check.score} />
                        <p className="text-[#5A7AAA] text-xs mt-2 leading-relaxed line-clamp-2">
                          {check.feedback}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Engagement + pro comparison side by side */}
              <div className="grid grid-cols-2 gap-4">

                {results.engagement && (
                  <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                    <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Engagement</p>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{results.engagement.emoji}</span>
                      <div>
                        <p className="text-white font-black text-xl">{results.engagement.level}</p>
                        <p className="text-[#5A7AAA] text-sm">Potential</p>
                      </div>
                    </div>
                    <p className="text-[#5A7AAA] text-sm leading-relaxed">{results.engagement.description}</p>
                    <div className="mt-3 space-y-1">
                      {results.engagement.key_factors?.slice(0, 2).map((f, i) => (
                        <p key={i} className="text-xs text-[#5A7AAA]">→ {f}</p>
                      ))}
                    </div>
                  </div>
                )}

                {results.pro_comparison && (
                  <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                    <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Pro Match</p>
                    <p className="text-5xl font-black text-[#2563EB] mb-1">
                      {results.pro_comparison.similarity_score}%
                    </p>
                    <p className="text-white text-sm font-semibold mb-1">{results.pro_comparison.label}</p>
                    <p className="text-[#5A7AAA] text-xs mb-3">vs {results.pro_comparison.compared_against}</p>
                    <div className="w-full bg-[#1E3060] rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-[#2563EB] transition-all duration-700"
                        style={{ width: `${results.pro_comparison.similarity_score}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Col 3 — suggestions + lighting */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">

              

              {/* Lighting */}
              {results.lighting?.issues?.length > 0 && (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                  <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Lighting</p>
                  <ul className="space-y-2">
                    {results.lighting.issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-400 text-sm mt-0.5 shrink-0">→</span>
                        <p className="text-[#5A7AAA] text-sm leading-relaxed">{issue}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {results.suggestions?.length > 0 && (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                  <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">💡 Suggestions</p>
                  <ul className="space-y-2">
                    {results.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#2563EB] text-sm mt-0.5 shrink-0">→</span>
                        <p className="text-[#5A7AAA] text-sm leading-relaxed">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              

            </div>
          </div>
        )}

        {/* ═══ ANALYSIS TAB ═══ */}
        {activeTab === 'analysis' && (
          <div className="grid grid-cols-12 gap-4">

            <div className="col-span-12 lg:col-span-8">
              <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-6">
                <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-5">Detailed Analysis</p>
                <div className="space-y-4">
                  {results.checks?.map((check) => {
                    const c = check.score >= 75 ? 'text-green-400'
                            : check.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                    const bg = check.score >= 75 ? 'bg-green-400'
                             : check.score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                    return (
                      <div key={check.name} className="bg-[#0A0F1E] border border-[#1E3060] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold text-base">{check.name}</span>
                          <span className={`font-black text-xl ${c}`}>{check.score}/100</span>
                        </div>
                        <div className="w-full bg-[#1E3060] rounded-full h-2 mb-3">
                          <div className={`h-2 rounded-full ${bg} transition-all duration-700`}
                            style={{ width: `${check.score}%` }} />
                        </div>
                        <p className="text-[#5A7AAA] text-sm leading-relaxed">{check.feedback}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">

              <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-4">Quick Stats</p>
                <div className="grid grid-cols-2 gap-2">
                  <Pill label="Overall" value={score} />
                  <Pill label="Style" value={results.style?.detected?.split(' ') ?? '—'} />
                  <Pill label="Engagement" value={results.engagement?.level ?? '—'} />
                  <Pill label="Pro Match" value={`${results.pro_comparison?.similarity_score ?? 0}%`} />
                  <Pill label="Motion" value={results.stability?.motion_type?.replace('_', ' ') ?? '—'} />
                  <Pill label="Frames" value={frameCards.length} />
                </div>
              </div>

              {results.lighting && (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                  <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Lighting Detail</p>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[#5A7AAA] text-sm">Lighting Score</span>
                    <span className={`font-bold text-sm ${
                      results.lighting.score >= 75 ? 'text-green-400' :
                      results.lighting.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{results.lighting.score}/100</span>
                  </div>
                  <ul className="space-y-2">
                    {results.lighting.issues?.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-400 text-sm shrink-0 mt-0.5">→</span>
                        <p className="text-[#5A7AAA] text-sm leading-relaxed">{issue}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.suggestions?.length > 0 && (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                  <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">💡 Suggestions</p>
                  <ul className="space-y-2">
                    {results.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#2563EB] text-sm shrink-0 mt-0.5">→</span>
                        <p className="text-[#5A7AAA] text-sm leading-relaxed">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ═══ INSIGHTS TAB ═══ */}
        {activeTab === 'insights' && (
          <div className="grid grid-cols-12 gap-4">

            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
              {history.length >= 2 ? (
                <>
                  <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                    <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-1">Score History</p>
                    <p className="text-[#334466] text-xs mb-4">Your last {history.length} uploads</p>
                    <HistoryChart history={history} />
                    <div className="flex justify-between text-[#334466] text-xs mt-1.5">
                      <span>Oldest</span><span>Latest</span>
                    </div>
                  </div>

                  <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                    <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-4">Upload History</p>
                    <div className="space-y-2">
                      {[...history].reverse().map((h, i) => {
                        const c = h.overall_score >= 75 ? 'text-green-400'
                                : h.overall_score >= 50 ? 'text-yellow-400' : 'text-red-400'
                        return (
                          <div key={i} className="flex items-center justify-between bg-[#0A0F1E]
                            border border-[#1E3060] rounded-xl px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <span className="text-[#334466] text-xs w-5">#{history.length - i}</span>
                              <span className="text-white text-sm font-medium truncate max-w-[200px]">
                                {h.filename ?? 'video.mp4'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[#5A7AAA] text-sm">{h.style ?? '—'}</span>
                              <span className={`text-sm font-black ${c}`}>{h.overall_score}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-4">📈</span>
                  <p className="text-white font-semibold mb-2 text-lg">Not enough data yet</p>
                  <p className="text-[#5A7AAA] text-sm">Upload at least 2 videos to see your learning trend.</p>
                </div>
              )}
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              {history.length >= 2 && (() => {
                const scores = history.map(h => h.overall_score)
                const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                const trend = scores[scores.length - 1] - scores[0]
                const trendLabel = trend > 0 ? `↑ +${trend}` : trend < 0 ? `↓ ${trend}` : '→ 0'
                const trendColor = trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-yellow-400'
                const best = Math.max(...scores)
                const worst = Math.min(...scores)
                const styleCounts = {}
                history.forEach(h => { styleCounts[h.style] = (styleCounts[h.style] || 0) + 1 })
                const topStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

                return (
                  <>
                    <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                      <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-4">Your Stats</p>
                      <div className="space-y-3">
                        {[
                          { label: 'Videos Analyzed', value: history.length, color: 'text-white' },
                          { label: 'Average Score',   value: avg,            color: 'text-[#2563EB]' },
                          { label: 'Best Score',      value: best,           color: 'text-green-400' },
                          { label: 'Lowest Score',    value: worst,          color: 'text-red-400' },
                          { label: 'Overall Trend',   value: trendLabel,     color: trendColor },
                        ].map(s => (
                          <div key={s.label} className="flex items-center justify-between border-b border-[#1E3060] pb-2">
                            <span className="text-[#5A7AAA] text-sm">{s.label}</span>
                            <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {topStyle && (
                      <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                        <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">Your Style</p>
                        <p className="text-white font-bold text-lg mb-1">{topStyle}</p>
                        <p className="text-[#5A7AAA] text-sm">Most common detected style</p>
                      </div>
                    )}

                    <div className="bg-[#0D1526] border border-[#1E3060] rounded-2xl p-5">
                      <p className="text-[#2563EB] text-sm font-bold uppercase tracking-widest mb-3">How to Improve</p>
                      <ul className="space-y-2">
                        {[
                          trend < 0 && "Scores declining — focus on consistent lighting setup.",
                          avg < 60 && "Avg below 60. Composition is the fastest win — use rule of thirds.",
                          avg >= 60 && avg < 75 && "You're improving! Focus on stability — get a tripod or gimbal.",
                          avg >= 75 && "Great average! Push for consistency — aim for 80+ on every upload.",
                        ].filter(Boolean).map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#2563EB] text-sm shrink-0 mt-0.5">→</span>
                            <p className="text-[#5A7AAA] text-sm leading-relaxed">{tip}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}