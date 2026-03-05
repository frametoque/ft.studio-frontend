'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { FilePlay, FileVideoCamera } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL

export default function UploadBox() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-msvideo': ['.avi'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  })

  const handleAnalyze = async () => {
  if (!file) return
  setUploading(true)
  setError(null)

  try {
    const formData = new FormData()
    formData.append('video', file)

    const res = await fetch(`${API}/analyze`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Analysis failed')

    const data = await res.json()

    // Save full results for results page
    localStorage.setItem('frametoque_results', JSON.stringify(data))

    // ✅ Save personal history entry to localStorage
    const history = JSON.parse(localStorage.getItem('frametoque_history') || '[]')
    history.push({
      filename:        data.filename,
      overall_score:   data.overall_score,
      style:           data.style?.detected ?? '—',
      engagement_level: data.engagement?.level ?? '—',
      checks:          data.checks,
      timestamp:       new Date().toISOString(),
    })
    // Keep last 50 entries
    if (history.length > 50) history.shift()
    localStorage.setItem('frametoque_history', JSON.stringify(history))

    router.push('/results')

  } catch (err) {
    setError('Could not connect to the AI backend. Make sure it is running.')
  } finally {
    setUploading(false)
  }
}

  const formatSize = (bytes) => (bytes / (1024 * 1024)).toFixed(1) + ' MB'

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
          ${isDragActive
            ? 'border-[#2563EB] bg-[#0D1526]'
            : 'border-[#1E3060] bg-[#0A0F1E] hover:border-blue-500 hover:bg-[#0D1526]'
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Icon */}
        <div className="text-6xl flex justify-center mb-4"><FilePlay color="#2563EB" size={100} align="center" /></div>

        {isDragActive ? (
          <p className="text-[#2563EB] text-lg font-semibold">Drop it here!</p>
        ) : (
          <>
            <p className="text-white text-lg font-semibold mb-2">
              Drag and drop your video here
            </p>
            <p className="text-[#5A7AAA] text-sm mb-4">
              or click to browse your files
            </p>
            <span className="inline-block border border-[#1E3060] text-[#5A7AAA] text-xs px-4 py-2 rounded-full">
              MP4 · MOV · AVI &nbsp;·&nbsp; Max 100MB
            </span>
          </>
        )}
      </div>

      {/* Selected file info */}
      {file && (
        <div className="mt-4 bg-[#0D1526] border border-[#1E3060] rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl"><FileVideoCamera color="#2563EB" size={30} /></span>
            <div>
              <p className="text-white text-sm font-medium">{file.name}</p>
              <p className="text-[#5A7AAA] text-xs">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setFile(null) }}
            className="text-[#5A7AAA] hover:text-red-400 transition text-sm"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 bg-red-900/20 border border-red-500/40 rounded-xl px-5 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || uploading}
        className={`
          mt-6 w-full py-4 rounded-xl font-semibold text-lg transition
          ${file && !uploading
            ? 'bg-[#2563EB] hover:bg-blue-600 text-white cursor-pointer'
            : 'bg-[#0D1526] text-[#334466] cursor-not-allowed border border-[#1E3060]'
          }
        `}
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Analyzing your footage...
          </span>
        ) : (
          'Analyze My Video →'
        )}
      </button>

      {/* Note */}
      <p className="text-center text-[#334466] text-xs mt-4">
        Analysis usually takes 10–30 seconds depending on clip length
      </p>

    </div>
  )
}
