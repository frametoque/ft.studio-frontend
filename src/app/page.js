import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050810] ">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
    </main>
  )
}