'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { FileVideo, FileVideo2 } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

interface AnalysisResult {
  filename: string
  overall_score: number
  style?: {
    detected: string
  }
  engagement?: {
    level: string
  }
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
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null)
    if (rejectedFiles.length > 0) {
      setError('Invalid file. Please upload an MP4, MOV or AVI under 100MB.')
      return
    }
    setFile(acceptedFiles[0])
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

      const res = await fetch(`${API}analyze`, {
        method: 'POST',
        body: formData,
      })

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

    } catch (err) {
      setError('Could not connect to the AI backend. Make sure it is running.')
    } finally {
      setUploading(false)
    }
  }

  const formatSize = (bytes: number): string => (bytes / (1024 * 1024)).toFixed(1) + ' MB'

  return (
    <div style={{ width: '100%' }}>

      <style>{`
        .dropzone {
          border: 1.5px dashed rgba(30,48,96,0.8);
          border-radius: 16px;
          padding: 52px 32px;
          text-align: center;
          cursor: pointer;
          background: rgba(10,15,30,0.6);
          transition: border-color 0.25s ease, background 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .dropzone:hover {
          border-color: rgba(41,182,246,0.4);
          background: rgba(41,182,246,0.03);
        }
        .dropzone.active {
          border-color: #29B6F6;
          background: rgba(41,182,246,0.06);
        }
        .dropzone::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(41,182,246,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .analyze-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .analyze-btn.ready {
          background: linear-gradient(135deg, #29B6F6, #0288D1);
          color: white;
        }
        .analyze-btn.ready:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(41,182,246,0.35);
        }
        .analyze-btn.disabled {
          background: rgba(13,21,38,0.8);
          color: rgba(255,255,255,0.2);
          border: 1px solid rgba(30,48,96,0.5);
          cursor: not-allowed;
        }
        .remove-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.25);
          font-size: 12px; cursor: pointer;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.1em;
          transition: color 0.2s;
          padding: 4px 8px;
        }
        .remove-btn:hover { color: #ef4444; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`dropzone${isDragActive ? ' active' : ''}`}
      >
        <input {...getInputProps()} />

        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: isDragActive ? 'rgba(41,182,246,0.15)' : 'rgba(41,182,246,0.08)',
          border: `1px solid ${isDragActive ? 'rgba(41,182,246,0.4)' : 'rgba(41,182,246,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          transition: 'all 0.25s ease',
        }}>
          <FileVideo size={28} color="#29B6F6" strokeWidth={1.5} />
        </div>

        {isDragActive ? (
          <>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24, letterSpacing: '0.08em', color: '#29B6F6',
            }}>DROP IT HERE</p>
            <p style={{
              fontSize: 13, color: 'rgba(41,182,246,0.6)',
              marginTop: 6, fontWeight: 300,
            }}>Release to upload your footage</p>
          </>
        ) : (
          <>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22, letterSpacing: '0.08em',
              color: 'white', marginBottom: 8,
            }}>DRAG & DROP YOUR VIDEO</p>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
              marginBottom: 20, fontWeight: 300,
            }}>or click to browse your files</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 20,
              border: '1px solid rgba(30,48,96,0.8)',
              background: 'rgba(13,21,38,0.6)',
            }}>
              {['MP4', 'MOV', 'AVI'].map((fmt, i) => (
                <span key={fmt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.1em',
                  }}>{fmt}</span>
                  {i < 2 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 10 }}>·</span>}
                </span>
              ))}
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: 10 }}>·</span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em',
              }}>Max 100MB</span>
            </div>
          </>
        )}
      </div>

      {/* Selected file info */}
      {file && (
        <div style={{
          marginTop: 12,
          background: 'rgba(13,21,38,0.8)',
          border: '1px solid rgba(41,182,246,0.2)',
          borderRadius: 12,
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(41,182,246,0.1)',
              border: '1px solid rgba(41,182,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <FileVideo2 size={16} color="#29B6F6" strokeWidth={1.5} />
            </div>
            <div>
              <p style={{
                fontSize: 13, color: 'white', fontWeight: 500,
                marginBottom: 2, maxWidth: 320,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{file.name}</p>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.05em',
              }}>{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            className="remove-btn"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); setFile(null) }}
          >
            ✕ REMOVE
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          marginTop: 12,
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 12, padding: '12px 16px',
        }}>
          <p style={{
            fontSize: 13, color: '#f87171',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.02em',
          }}>⚠ {error}</p>
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || uploading}
        className={`analyze-btn ${file && !uploading ? 'ready' : 'disabled'}`}
        style={{ marginTop: 16 }}
      >
        {uploading ? (
          <>
            <div className="spinner" />
            Analyzing your footage...
          </>
        ) : (
          'Analyze My Video →'
        )}
      </button>

      {/* Time note */}
      <p style={{
        textAlign: 'center', marginTop: 12,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11, color: 'rgba(255,255,255,0.18)',
        letterSpacing: '0.1em',
      }}>
        ANALYSIS TAKES 10–30 SECONDS
      </p>

    </div>
  )
}