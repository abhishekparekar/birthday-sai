import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Crown, Lock, ShieldCheck, Heart, Zap } from 'lucide-react'

export function SuspenseLoader({ onComplete, audioEngine }) {
  const [progress, setProgress] = useState(0)
  const [statusMsg, setStatusMsg] = useState('Verifying Birthday Boy identity (Sai)... 🔐')

  useEffect(() => {
    // Play full-volume cinematic loading sweep & suspense pulses
    if (audioEngine) {
      audioEngine.enableAudio()
      audioEngine.playLoadingSound()
    }

    const startTime = performance.now()
    const duration = 5000 // 5.0 full seconds
    let lastTickPercent = -1

    const updateProgress = (now) => {
      const elapsed = now - startTime
      const p = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(p)

      // Play dynamic progressive tick sound every 4% as progress fills
      if (audioEngine && p > lastTickPercent + 3 && p <= 100) {
        lastTickPercent = p
        audioEngine.playProgressBarTick(p)
      }

      // Dynamic staged status text across 5 seconds
      if (p < 25) {
        setStatusMsg('Verifying Birthday Boy identity (Sai)... 🔐')
      } else if (p < 55) {
        setStatusMsg('We are planning something extremely special for Sai... ✨')
      } else if (p < 85) {
        setStatusMsg('Assembling surprises & 7th September wishes... 🎂')
      } else {
        setStatusMsg('Unlocking Secret Protocol... Get Ready! 🚀')
      }

      if (p < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        if (audioEngine) audioEngine.playMagic()
        setTimeout(onComplete, 350)
      }
    }

    const frameId = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(frameId)
  }, [onComplete, audioEngine])

  const handleManualTap = () => {
    if (audioEngine) {
      audioEngine.enableAudio()
      audioEngine.playLoadingSound()
    }
  }

  return (
    <div
      onClick={handleManualTap}
      onTouchStart={handleManualTap}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#04081c]/75 via-[#020514]/65 to-[#010208]/80 backdrop-blur-[2px] text-center select-none overflow-hidden cursor-pointer"
    >
      {/* 🌌 Radiant Cosmic Space Ambient Lighting */}
      <div className="absolute w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full bg-cyan-500/15 blur-[120px] sm:blur-[160px] animate-pulse pointer-events-none" />
      <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-purple-600/15 blur-[100px] sm:blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-amber-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* Cosmic Warp Rings Animation */}
      <div className="absolute w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full border border-cyan-400/20 animate-spin pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="absolute w-[440px] sm:w-[680px] h-[440px] sm:h-[680px] rounded-full border border-purple-500/15 animate-spin pointer-events-none" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />

      <div className="max-w-md w-full z-10 space-y-6 sm:space-y-7 flex flex-col items-center px-2">
        {/* Animated Glowing Orbital Badge */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing Aura Rings */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/40 animate-ping opacity-30" />
          <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-pink-500/30 animate-spin" style={{ animationDuration: '6s' }} />

          {/* Center Crown Icon Box */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl glass-panel border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-2xl glow-gold"
          >
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-lg"
          >
            <Lock className="w-3 h-3 text-red-400" />
            <span>CONFIDENTIAL BIRTHDAY PROTOCOL</span>
          </motion.div>

          <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 tracking-wider text-glow-gold">
            WAIT BIRTHDAY BOY ⏳
          </h2>

          <p className="text-sm sm:text-lg text-pink-300 font-semibold text-glow-pink min-h-[48px] sm:min-h-[56px] flex items-center justify-center px-1">
            {statusMsg}
          </p>
        </div>

        {/* High-tech Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-3 sm:h-3.5 w-full bg-zinc-950/80 rounded-full overflow-hidden p-0.5 border border-amber-400/40 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono text-zinc-400 px-1">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-spin" />
              <span>5s Security Loading...</span>
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">{progress}%</span>
          </div>
        </div>

        {/* Mobile Tap Anywhere Audio Wake Hint */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[11px] sm:text-xs font-medium text-amber-300/80 tracking-wide flex items-center gap-1.5 pt-2"
        >
          <span>🔊 Tap anywhere on screen to enable sound</span>
        </motion.div>
      </div>
    </div>
  )
}
