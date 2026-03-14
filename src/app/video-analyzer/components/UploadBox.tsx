'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { FileVideo, FileVideo2 } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

interface AnalysisResult {
  filename: string
  overall_score: number
  style?: { detected: string }
  engagement?: { level: string }
  checks: Record<string, unknown>
}

interface HistoryItem {
  filename: string
  overall_score: number
  style: string
  engagement_level: string
  checks: Record<string, unknown>
  timestamp: string
}

export default function UploadBox() {
  const router = useRouter()
  const [file, setFile]         = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const onDrop = useCallback((accepted: File[], rejected: FileRejection[]) => {
    setError(null)
    if (rejected.length > 0) {
      setError('Invalid file. Please upload an MP4, MOV or AVI under 100MB.')
      return
    }
    setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4':       ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi'],
    },
    maxSize: 100 * 1024 * 1024,
    multiple: false,
  })

  const handleAnalyze = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('video', file)
      const res = await fetch(`${API}analyze`, { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Analysis failed')
      const data: AnalysisResult = await res.json()
      localStorage.setItem('frametoque_results', JSON.stringify(data))
      const history: HistoryItem[] = JSON.parse(localStorage.getItem('frametoque_history') || '[]')
      history.push({
        filename:         data.filename,
        overall_score:    data.overall_score,
        style:            data.style?.detected ?? '—',
        engagement_level: data.engagement?.level ?? '—',
        checks:           data.checks,
        timestamp:        new Date().toISOString(),
      })
      if (history.length > 50) history.shift()
      localStorage.setItem('frametoque_history', JSON.stringify(history))
      router.push('/video-analyzer/results')
    } catch {
      setError('Could not connect to the AI backend. Make sure it is running.')
    } finally {
      setUploading(false)
    }
  }

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1) + ' MB'

  return (
    <div className="w-full">

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`relative overflow-hidden rounded-2xl px-8 py-14 text-center cursor-pointer border-[1.5px] border-dashed transition-all duration-250
          ${isDragActive
            ? 'border-[#29B6F6] bg-[#29B6F6]/[0.06]'
            : 'border-[#1E3060]/80 bg-[#0A0F1E]/60 hover:border-[#29B6F6]/40 hover:bg-[#29B6F6]/[0.03]'
          }`}
      >
        <input {...getInputProps()} />

        {/* Top radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(41,182,246,0.05) 0%, transparent 70%)' }}
        />

        {/* Icon */}
        <div className={`w-16 h-16 rounded-[14px] flex items-center justify-center mx-auto mb-5 transition-all duration-250
          ${isDragActive
            ? 'bg-[#29B6F6]/15 border border-[#29B6F6]/40'
            : 'bg-[#29B6F6]/[0.08] border border-[#29B6F6]/15'
          }`}
        >
          <FileVideo size={28} color="#29B6F6" strokeWidth={1.5} />
        </div>

        {isDragActive ? (
          <>
            <p className="font-display text-[24px] tracking-[0.08em] text-[#29B6F6]">
              DROP IT HERE
            </p>
            <p className="text-[13px] text-[#29B6F6]/60 mt-1.5 font-light">
              Release to upload your footage
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-[22px] tracking-[0.08em] text-white mb-2">
              DRAG & DROP YOUR VIDEO
            </p>
            <p className="text-[13px] text-white/35 mb-5 font-light">
              or click to browse your files
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E3060]/80 bg-[#0D1526]/60">
              {['MP4', 'MOV', 'AVI'].map((fmt, i) => (
                <span key={fmt} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-white/35 tracking-[0.1em]">{fmt}</span>
                  {i < 2 && <span className="text-white/10 text-[10px]">·</span>}
                </span>
              ))}
              <span className="text-white/10 text-[10px]">·</span>
              <span className="font-mono text-[11px] text-white/35 tracking-[0.1em]">Max 100MB</span>
            </div>
          </>
        )}
      </div>

      {/* Selected file */}
      {file && (
        <div className="mt-3 bg-[#0D1526]/80 border border-[#29B6F6]/20 rounded-xl px-[18px] py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#29B6F6]/10 border border-[#29B6F6]/20 flex items-center justify-center flex-shrink-0">
              <FileVideo2 size={16} color="#29B6F6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] text-white font-medium mb-0.5 max-w-[320px] truncate">
                {file.name}
              </p>
              <p className="font-mono text-[11px] text-white/30 tracking-[0.05em]">
                {formatSize(file.size)}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setFile(null) }}
            className="font-mono text-[12px] text-white/25 tracking-[0.1em] px-2 py-1 bg-transparent border-none cursor-pointer hover:text-red-400 transition-colors duration-200"
          >
            ✕ REMOVE
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-3 bg-red-500/[0.06] border border-red-500/25 rounded-xl px-4 py-3">
          <p className="font-mono text-[13px] text-red-400 tracking-[0.02em]">⚠ {error}</p>
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || uploading}
        className={`mt-4 w-full py-[15px] rounded-xl font-semibold text-[15px] tracking-[0.04em] flex items-center justify-center gap-2.5 transition-all duration-200
          ${file && !uploading
            ? 'bg-gradient-to-r from-[#29B6F6] to-[#0288D1] text-white cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#29B6F6]/35'
            : 'bg-[#0D1526]/80 text-white/20 border border-[#1E3060]/50 cursor-not-allowed'
          }`}
      >
        {uploading ? (
          <>
            <div className="w-[18px] h-[18px] rounded-full border-2 border-white/20 border-t-white animate-spin flex-shrink-0" />
            Analyzing your footage...
          </>
        ) : (
          'Analyze My Video →'
        )}
      </button>

      {/* Time note */}
      <p className="text-center mt-3 font-mono text-[11px] text-white/18 tracking-[0.1em]">
        ANALYSIS TAKES 10–30 SECONDS
      </p>

    </div>
  )
}