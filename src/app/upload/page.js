import Navbar from '@/components/Navbar'
import UploadBox from '@/components/UploadBox'

import { Frame, ChartNoAxesCombined, Bot } from 'lucide-react'

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[#050810]">
      <Navbar />

      <section className="px-6 py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-3">
            Step 1 of 2
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upload Your Video
          </h1>
          <p className="text-[#5A7AAA] text-lg max-w-xl mx-auto">
            Our AI will extract key frames and analyze your shot quality,
            composition, and lighting in seconds.
          </p>
        </div>

        {/* Upload box */}
        <UploadBox />

        {/* What happens next */}
        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-center text-[#5A7AAA] text-sm font-semibold uppercase tracking-widest mb-6">
            What happens after you upload
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Frame, label: 'Frames extracted' },
              { icon: Bot, label: 'AI analyzes each frame' },
              { icon: ChartNoAxesCombined, label: 'Score report generated' },
            ].map((item) => (
            <div
              key={item.label}
              className="bg-[#0D1526] border border-[#1E3060] rounded-xl p-4 text-center"
            >
              <div className="flex justify-center mb-2">
                <item.icon color="#2563EB" size={50} />
              </div>
              <p className="text-[#5A7AAA] text-xs">{item.label}</p>
            </div>

            ))}
          </div>
        </div>

      </section>
    </main>
  )
}