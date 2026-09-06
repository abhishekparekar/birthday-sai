import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, ArrowLeft, Crown, ScrollText } from 'lucide-react'
import { ParticleCanvas } from './components/common/ParticleCanvas'
import { FireworksCanvas } from './components/common/FireworksCanvas'
import { ThreeSpaceCanvas } from './components/common/ThreeSpaceCanvas'
import { birthdayData } from './data/birthdayData'
import sai3Img from './assets/sai3.jpeg'

export default function App() {
  const [currentPage, setCurrentPage] = useState(0) // 0: First Hero Page, 1: Letter Page
  const { name, letter } = birthdayData
  const nameLetters = Array.from(name)

  const triggerConfetti = useCallback(() => {
    const count = 180
    const defaults = { origin: { y: 0.7 } }
    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#EC4899', '#7C3AED'] })
    fire(0.2, { spread: 60, colors: ['#FBBF24', '#22D3EE'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFFFFF', '#F43F5E'] })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#FBBF24', '#7C3AED'] })
  }, [])

  useEffect(() => {
    // Initial celebration burst
    triggerConfetti()

    const interval = setInterval(() => {
      confetti({
        particleCount: 35,
        spread: 100,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.2 },
        colors: ['#FBBF24', '#EC4899', '#7C3AED', '#22D3EE', '#FFFFFF'],
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [triggerConfetti])

  const goToLetterPage = () => {
    setCurrentPage(1)
    triggerConfetti()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToHeroPage = () => {
    setCurrentPage(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#04081c] via-[#020514] to-[#010208] text-white flex flex-col items-center justify-center overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* 🌌 Cinematic "Blue & Night" 3D Space Background */}
      <ThreeSpaceCanvas currentStep={currentPage} />

      {/* Background Ambience */}
      <ParticleCanvas speed={0.8} density={40} colors={['#38BDF8', '#60A5FA', '#93C5FD', '#FBBF24', '#FFFFFF']} />
      <FireworksCanvas active={true} />

      {/* 2-Page Router with AnimatePresence */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">

          {/* 🌟 PAGE 1: HERO REVEAL PAGE */}
          {currentPage === 0 && (
            <motion.section
              key="hero-page"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl"
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                
                {/* 📸 LEFT SIDE: Single Image "sai3.jpeg" - Borderless & Fit to Screen */}
                <motion.div
                  initial={{ opacity: 0, x: -40, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center w-full order-1 lg:order-1"
                >
                  <div className="relative group w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px]">
                    {/* Subtle Ambient Glow */}
                    <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-amber-400/40 via-pink-500/40 to-purple-600/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-700 animate-pulse-glow" />

                    {/* Borderless Photo Container */}
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[72vh] sm:max-h-[78vh] lg:max-h-[82vh]"
                    >
                      <img
                        src={sai3Img}
                        alt="Sai"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* 📜 RIGHT SIDE: Birthday Wishes & Hero Name */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start justify-center w-full order-2 lg:order-2"
                >
                  {/* Marathi Birthday Wishes Heading */}
                  <div className="space-y-1.5 sm:space-y-2.5 w-full">
                    <motion.h1
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 tracking-wide drop-shadow-md leading-tight"
                    >
                      वाढदिवसाच्या हार्दिक शुभेच्छा!
                    </motion.h1>

                    {/* Large Hero Name Character by Character */}
                    <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3 py-1">
                      {nameLetters.map((char, index) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 8 : -8 }}
                          whileTap={{ scale: 0.85 }}
                          initial={{ opacity: 0, y: 35, rotate: -10, scale: 0.6 }}
                          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.12,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl font-black font-cinzel-decor text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 text-glow-gold drop-shadow-2xl cursor-pointer select-none"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Marathi Subtitle Paragraph */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="space-y-2 sm:space-y-3 max-w-2xl w-full"
                  >
                    <p className="text-sm sm:text-base lg:text-lg text-zinc-200 font-light leading-relaxed">
                      तुझ्या आयुष्यातील प्रत्येक दिवस नव्या यशाची, सुखाची आणि समाधानाची नवी पहाट घेऊन येवो! 🌸✨
                    </p>
                  </motion.div>

                  {/* Action Button: Happy Birthday See Msg */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, type: 'spring' }}
                    className="pt-2 sm:pt-4 w-full flex justify-center lg:justify-start"
                  >
                    <button
                      onClick={goToLetterPage}
                      className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base md:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
                    >
                      <span className="relative z-10 flex items-center gap-2.5 text-glow-gold">
                        <span>Happy Birthday See Msg</span>
                        <span className="text-base sm:text-lg">📜✨</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </button>
                  </motion.div>
                </motion.div>

              </div>
            </motion.section>
          )}

          {/* 📜 PAGE 2: MARATHI BLESSINGS LETTER PAGE */}
          {currentPage === 1 && (
            <motion.section
              key="letter-page"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 max-w-5xl py-8 sm:py-12"
            >
              <div className="w-full relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-3xl glass-panel border border-amber-400/50 shadow-2xl text-left space-y-4 sm:space-y-6 glow-gold bg-gradient-to-br from-[#0c0c18]/95 via-[#140f26]/95 to-[#0a0a14]/95">
                
                {/* Letter Header */}
                <div className="border-b border-amber-400/20 pb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 tracking-wide font-cinzel">
                        {letter.recipient}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-pink-300 mt-1 text-glow-pink">
                      {letter.salutation}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-amber-300 bg-amber-500/20 border border-amber-400/30 px-4 py-1.5 rounded-full shadow-xs">
                    ✨ ७ सप्टेंबर २०२६
                  </span>
                </div>

                {/* Marathi Full Paragraphs */}
                <div className="space-y-3 sm:space-y-4 text-zinc-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                  {letter.paragraphs.map((p, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-pink-500/50 pl-3.5 sm:pl-5 py-1.5 sm:py-2 bg-white/[0.02] rounded-r-xl"
                    >
                      <p className="text-zinc-100 leading-relaxed font-normal">
                        {p}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Signature & Closing */}
                <div className="border-t border-amber-400/20 pt-5 space-y-1.5 text-right">
                  <p className="text-xs sm:text-sm md:text-base font-bold text-amber-300 font-cinzel tracking-wider">
                    HAPPY BIRTHDAY! 🎂
                  </p>
                  <p className="text-base sm:text-xl md:text-2xl text-pink-300 font-bold text-glow-pink">
                    खूप साऱ्या शुभेच्छा आणि आशीर्वाद! ❤️
                  </p>
                  <p className="text-lg sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 tracking-wide font-cinzel text-glow-gold pt-1">
                    {letter.signature}
                  </p>
                </div>
              </div>

              {/* Back Action Button */}
              <div className="pt-6 sm:pt-8 flex items-center justify-center">
                <button
                  onClick={goToHeroPage}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-2xl glass-panel border border-white/20 text-zinc-200 hover:text-white hover:border-amber-400/60 font-bold text-sm sm:text-base shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>BACK TO BIRTHDAY WISHES</span>
                  <span>🎂</span>
                </button>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}
