import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Crown, ShieldAlert, Zap, AlertTriangle, Siren, ArrowRight, Lock, Clock } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import saiImg from '../../assets/sai3.jpeg'

const TROLL_MESSAGES = [
  'Nice try Sai! 😂 Catch me if you can!',
  'Oops! Parat palalo! 🏃‍♂️💨',
  'Nope, you cannot click this! 😜',
  'Too fast for you! Catch me! 🏃‍♂️⚡',
  'Arey Sai, you are not fast enough! 🔥',
  'Try harder Sai! 🏃‍♂️💨💨',
]

const ESCAPE_POSITIONS = [
  { x: 190, y: -50 },
  { x: -170, y: 65 },
  { x: 230, y: 75 },
  { x: -210, y: -70 },
  { x: 160, y: 110 },
  { x: -180, y: 90 },
  { x: 250, y: -35 },
  { x: -140, y: -90 },
]

export function MysteryIntro({ onNext, audioEngine }) {
  const [isShaking, setIsShaking] = useState(false)
  const [showDamage, setShowDamage] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  // Runaway Continue Button state
  const [continuePos, setContinuePos] = useState({ x: 0, y: 0 })
  const [escapeCount, setEscapeCount] = useState(0)
  const [trollMsg, setTrollMsg] = useState('')

  // 20-Second Auto Reveal for "DON'T CLICK THIS" button (Pure Surprise, No Notification)
  const [showDangerBtn, setShowDangerBtn] = useState(false)

  const intro = birthdayData.intro

  // Automatically reveal the "DON'T CLICK THIS" button after exactly 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDangerBtn(true)
      if (audioEngine) {
        audioEngine.playBoom()
        audioEngine.playGlitchShock()
      }
    }, 20000)

    return () => clearTimeout(timer)
  }, [audioEngine])

  // Handle runaway dodge when user tries to hover or click "Continue"
  const handleRunawayDodge = useCallback(() => {
    audioEngine.enableAudio()
    audioEngine.playFunnyLaugh()

    // Pick distinct leap coordinate
    const target = ESCAPE_POSITIONS[escapeCount % ESCAPE_POSITIONS.length]
    const jitterX = (Math.random() - 0.5) * 30
    const jitterY = (Math.random() - 0.5) * 20
    setContinuePos({ x: target.x + jitterX, y: target.y + jitterY })

    const msgIndex = escapeCount % TROLL_MESSAGES.length
    setTrollMsg(TROLL_MESSAGES[msgIndex])
    setEscapeCount((prev) => prev + 1)
  }, [audioEngine, escapeCount])

  // The real trigger button "DON'T CLICK THIS 😈"
  const handleTrigger = () => {
    audioEngine.enableAudio()
    audioEngine.playGlassShatter()
    audioEngine.playGlitchShock()
    audioEngine.playFunnyBoing()

    setIsShaking(true)
    setShowDamage(true)
    setShowFlash(true)

    // Explosive confetti barrage
    confetti({
      particleCount: 150,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#F59E0B', '#EC4899', '#9333EA', '#06B6D4', '#FFFFFF'],
    })

    setTimeout(() => {
      setShowFlash(false)
    }, 350)

    setTimeout(() => {
      audioEngine.playBoom()
    }, 500)

    setTimeout(() => {
      onNext()
    }, 1500)
  }

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 py-12 select-none overflow-hidden ${
        isShaking ? 'animate-shake-violent' : ''
      }`}
    >
      {/* 💥 REALISTIC CRACKED SCREEN / GLASS DAMAGE OVERLAY */}
      <AnimatePresence>
        {showDamage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Red / Cyan Glitch Chroma & Scanlines */}
            <div className="absolute inset-0 bg-red-600/25 mix-blend-color-dodge animate-glitch" />
            <div className="absolute inset-0 bg-cyan-500/15 mix-blend-screen animate-glitch" style={{ animationDelay: '0.1s' }} />

            {/* Glass Crack SVG Fractures */}
            <svg
              className="absolute inset-0 w-full h-full text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-screen-crack"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <circle cx="500" cy="500" r="14" fill="white" className="filter drop-shadow-[0_0_20px_white]" />
              <path
                d="M500 500 L320 200 L250 120 M500 500 L180 430 L80 410 M500 500 L260 720 L150 860 M500 500 L530 880 L560 990 M500 500 L760 780 L890 910 M500 500 L840 480 L970 460 M500 500 L720 240 L860 110 M500 500 L480 180 L450 40"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M320 200 L400 320 L180 430 M180 430 L350 560 L260 720 M260 720 L440 680 L530 880 M530 880 L650 690 L760 780 L760 780 L660 520 L840 480 L840 480 L650 360 L720 240 L720 240 L530 330 L480 180"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M400 320 L480 380 M350 560 L420 540 M440 680 L470 600 M650 690 L590 600 M660 520 L580 490 M650 360 L570 410"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            {/* Warning Hazard Badge during screen damage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl bg-red-600/90 backdrop-blur-md border-2 border-white text-white font-black text-xl tracking-widest uppercase shadow-2xl flex items-center gap-3 animate-bounce">
              <AlertTriangle className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <span>SYSTEM BREACH DETECTED</span>
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* White Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Ambient Celestial Nebula Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-700/25 blur-[150px] pointer-events-none -top-24 -left-24 animate-pulse-glow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[150px] pointer-events-none -bottom-24 -right-24 animate-pulse-glow" />

      {/* 2-Column Responsive Layout */}
      <div className="max-w-5xl w-full z-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* LEFT SIDE: Stylish Animated Picture of Sai */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center order-2 md:order-1"
        >
          <div className="relative group">
            {/* Animated Radiant Aura Glow behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Floating Glassmorphism Photo Container */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-0.6, 0.6, -0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl p-3.5 sm:p-4 glass-panel border-2 border-amber-400/50 shadow-2xl glow-gold overflow-hidden max-w-[280px] sm:max-w-[340px]"
            >
              {/* Photo */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-zinc-950 border border-amber-400/30 shadow-inner">
                <img
                  src={saiImg}
                  alt="Sai"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Rich Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/50 flex items-center gap-1.5 shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Birthday Star • Sai</span>
                  </span>
                  <span className="text-sm">👑✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Text content & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 text-center md:text-left order-1 md:order-2"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="text-4xl sm:text-6xl font-black font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 leading-tight drop-shadow-md"
          >
            {intro.greeting}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl sm:text-3xl font-bold text-pink-400 tracking-wide text-glow-pink"
          >
            {intro.subGreeting}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed max-w-md mx-auto md:mx-0"
          >
            {intro.message}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-lg sm:text-xl font-semibold text-amber-200/90 italic"
          >
            {intro.question}
          </motion.p>

          {/* Troll Message Display when user tries to hit Continue */}
          <AnimatePresence>
            {trollMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 text-sm font-bold shadow-lg inline-block"
              >
                {trollMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🔘 BUTTONS: Runaway Continue + Pure Surprise 20-Second Danger Button */}
          <div className="relative pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 min-h-[90px]">
            {/* 1. RUNAWAY DODGING "Continue" BUTTON */}
            <motion.div
              animate={{ x: continuePos.x, y: continuePos.y }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="relative z-20"
            >
              <button
                onMouseEnter={handleRunawayDodge}
                onClick={handleRunawayDodge}
                onTouchStart={handleRunawayDodge}
                className="group px-6 py-3.5 rounded-2xl glass-panel hover:bg-white/10 border-2 border-amber-400/50 text-amber-300 font-black text-sm sm:text-base shadow-xl transition-all cursor-pointer flex items-center gap-2 glow-gold"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* 2. AUTO-VISIBLE "DON'T CLICK THIS 😈" AFTER 20 SECONDS (No Notifications) */}
            <AnimatePresence>
              {showDangerBtn && (
                <motion.div
                  key="danger-btn"
                  initial={{ opacity: 0, scale: 0.2, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                  className="relative z-10"
                >
                  <button
                    onClick={handleTrigger}
                    onMouseEnter={() => audioEngine.playFunnyLaugh()}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-black text-white rounded-2xl cursor-pointer overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:via-rose-500 hover:to-red-600 border-2 border-red-400/80 shadow-red-600/50 animate-pulse"
                  >
                    <span className="relative flex items-center gap-2.5 z-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
                      <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
                      <span>DON'T CLICK THIS</span>
                      <span className="text-xl">😈</span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
