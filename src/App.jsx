import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowDown, Crown } from 'lucide-react'
import { ParticleCanvas } from './components/common/ParticleCanvas'
import { FireworksCanvas } from './components/common/FireworksCanvas'
import { ThreeSpaceCanvas } from './components/common/ThreeSpaceCanvas'
import { birthdayData } from './data/birthdayData'
import sai3Img from './assets/sai3.jpeg'

export default function App() {
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

  const scrollToLetter = () => {
    const el = document.getElementById('blessings-letter')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#04081c] via-[#020514] to-[#010208] text-white flex flex-col items-center overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* 🌌 Cinematic "Blue & Night" 3D Space Background */}
      <ThreeSpaceCanvas currentStep={0} />

      {/* Background Ambience */}
      <ParticleCanvas speed={0.8} density={40} colors={['#38BDF8', '#60A5FA', '#93C5FD', '#FBBF24', '#FFFFFF']} />
      <FireworksCanvas active={true} />

      {/* Main Fluid Responsive Container */}
      <div className="relative z-10 w-full max-w-7xl px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-10 md:py-12 flex flex-col items-center gap-10 sm:gap-16 lg:gap-20">

        {/* 🌟 1. HERO SECTION: Full-screen responsive (Image on Left, Wishes on Right) */}
        <section className="min-h-[88vh] sm:min-h-[92vh] w-full flex items-center justify-center py-4 sm:py-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* 📸 LEFT SIDE: Single Image "sai3.jpeg" with responsive scaling */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center w-full"
            >
              <div className="relative group w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]">
                {/* Glowing Aura Ring */}
                <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-3xl blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

                {/* Photo Frame Container */}
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-3xl p-2.5 sm:p-3.5 md:p-4 glass-panel border-2 border-amber-400/50 shadow-2xl glow-gold overflow-hidden w-full"
                >
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-amber-400/40 shadow-inner">
                    <img
                      src={sai3Img}
                      alt="Sai"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-2.5 sm:inset-x-3.5 flex items-center justify-between">
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md text-[11px] sm:text-xs font-bold text-amber-300 border border-amber-400/50 flex items-center gap-1.5 shadow-md">
                        <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Birthday Star</span>
                      </span>
                      <span className="text-sm sm:text-base">👑</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* 📜 RIGHT SIDE: Birthday Wishes & Hero Name */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start justify-center w-full"
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
                <p className="text-base sm:text-xl lg:text-2xl text-pink-300 font-semibold text-glow-pink">
                  आजचा हा दिवस संपूर्ण विश्व आनंदाने साजरा करत आहे! 🚀
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-zinc-200 font-light leading-relaxed">
                  तुझ्या आयुष्यातील प्रत्येक दिवस नव्या यशाची, सुखाची आणि समाधानाची नवी पहाट घेऊन येवो! 🌸✨
                </p>
              </motion.div>

              {/* Action Button (English) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1, type: 'spring' }}
                className="pt-2 sm:pt-4 w-full flex justify-center lg:justify-start"
              >
                <button
                  onClick={scrollToLetter}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base md:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
                >
                  <span className="relative z-10 flex items-center gap-2.5 text-glow-gold">
                    <span>READ BLESSINGS LETTER</span>
                    <span className="text-base sm:text-lg">📜✨</span>
                    <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" />
                  </span>
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* 📜 2. MARATHI BLESSINGS LETTER SECTION (Full Width Responsive Glass Card) */}
        <section id="blessings-letter" className="w-full max-w-5xl scroll-mt-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-3xl glass-panel border border-amber-400/50 shadow-2xl text-left space-y-4 sm:space-y-6 glow-gold bg-gradient-to-br from-[#0c0c18]/95 via-[#140f26]/95 to-[#0a0a14]/95"
          >
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
                — Laxman Sodanwar ❤️
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  )
}
