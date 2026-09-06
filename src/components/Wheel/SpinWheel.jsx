import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Disc,
  ArrowRight,
  X,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Zap,
  FastForward,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

const SPIN_DURATION_MS = 60000 // 1 Full Minute (60 seconds)

export function SpinWheel({ onNext, audioEngine }) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prize, setPrize] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [spinPhase, setSpinPhase] = useState('READY')
  const { wheelOptions } = birthdayData

  const spinStartTimeRef = useRef(0)
  const spinAnimationFrameRef = useRef(null)
  const tickTimerRef = useRef(null)
  const selectedPrizeRef = useRef(null)

  const numSlices = wheelOptions.length
  const anglePerSlice = 360 / numSlices

  // 1-Minute Custom Velocity Easing: Fast -> Medium -> Slow -> Low -> Down -> End
  const calculateRotation = (progress) => {
    // Custom cubic-bezier like deceleration curve mapped over 60 seconds
    // Fast initial surge, long sustained cruise, gradual brake, dramatic crawl at end
    const p = progress
    let ease
    if (p < 0.25) {
      // 0-15s: Blazing fast rotation
      ease = p * 2.5
    } else if (p < 0.6) {
      // 15-36s: Medium-fast cruising
      ease = 0.625 + (p - 0.25) * 1.5
    } else if (p < 0.82) {
      // 36-49s: Noticeable deceleration
      ease = 1.15 + (p - 0.6) * 0.9
    } else if (p < 0.95) {
      // 49-57s: Very slow suspense
      ease = 1.348 + (p - 0.82) * 0.35
    } else {
      // 57-60s: Down to crawl / target lock
      const tail = (p - 0.95) / 0.05
      ease = 1.3935 + (1 - Math.pow(1 - tail, 3)) * 0.03
    }
    return ease
  }

  const handleStartSpin = () => {
    if (spinning) return

    setSpinning(true)
    setPrize(null)
    setTimeLeft(60)
    setSpinPhase('⚡ HYPER SPEED')

    audioEngine.enableAudio()
    audioEngine.playBoom()

    // Pick winning index
    const winningIndex = Math.floor(Math.random() * numSlices)
    selectedPrizeRef.current = wheelOptions[winningIndex]

    const initialRotation = rotation % 360
    // Total spins: 45 full rotations (16,200 deg) + offset to land on prize
    const targetSliceAngle = 360 - winningIndex * anglePerSlice - anglePerSlice / 2
    const totalAngleDelta = 360 * 42 + targetSliceAngle

    spinStartTimeRef.current = performance.now()
    let lastTickAngle = initialRotation

    const animateWheel = (now) => {
      const elapsed = now - spinStartTimeRef.current
      const progress = Math.min(1, elapsed / SPIN_DURATION_MS)
      const remainingSeconds = Math.max(0, Math.ceil((SPIN_DURATION_MS - elapsed) / 1000))
      setTimeLeft(remainingSeconds)

      // Update Phase HUD
      if (progress < 0.25) {
        setSpinPhase('⚡ HYPER SPEED (1800 RPM)')
      } else if (progress < 0.6) {
        setSpinPhase('🌀 HIGH VELOCITY CRUISE')
      } else if (progress < 0.8) {
        setSpinPhase('⏱️ MEDIUM DECELERATION')
      } else if (progress < 0.93) {
        setSpinPhase('⏳ CRITICAL SUSPENSE SLOWDOWN')
      } else {
        setSpinPhase('🎯 LOCKING ONTO DESTINY...')
      }

      // Compute current rotation
      const easeMultiplier = calculateRotation(progress)
      const currentRot = initialRotation + totalAngleDelta * (easeMultiplier / 1.4235)
      setRotation(currentRot)

      // Dynamic Tick Sound (interval adapts to speed)
      if (Math.abs(currentRot - lastTickAngle) >= anglePerSlice) {
        lastTickAngle = currentRot
        const pitch = Math.max(0.6, 1.4 - progress * 0.7)
        const volume = Math.max(0.1, 0.35 - progress * 0.15)
        audioEngine.playDynamicTick(pitch, volume)
      }

      if (progress < 1) {
        spinAnimationFrameRef.current = requestAnimationFrame(animateWheel)
      } else {
        // Complete 1-minute spin
        finishSpin()
      }
    }

    spinAnimationFrameRef.current = requestAnimationFrame(animateWheel)
  }

  // Fast forward / instant stop
  const handleFastForward = () => {
    if (!spinning) return
    cancelAnimationFrame(spinAnimationFrameRef.current)
    finishSpin()
  }

  const finishSpin = () => {
    setSpinning(false)
    setSpinPhase('🏆 DESTINY UNLOCKED')
    setTimeLeft(0)

    const winner = selectedPrizeRef.current || wheelOptions[0]
    setPrize(winner)
    audioEngine.playFanfare()

    // Supernova Confetti Storm
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.55 },
      colors: ['#FBBF24', '#EC4899', '#7C3AED', '#22D3EE', '#FFFFFF', '#10B981'],
    })
  }

  useEffect(() => {
    return () => {
      if (spinAnimationFrameRef.current) {
        cancelAnimationFrame(spinAnimationFrameRef.current)
      }
      if (tickTimerRef.current) {
        clearInterval(tickTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none overflow-hidden">
      <div className="max-w-2xl w-full z-20 space-y-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Chapter 07: 1-Minute Epic Spinner Game</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            Spin The Surprise 🎡
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto">
            A real 1-minute thrilling journey from supersonic speed down to the final winning reward for Sai!
          </p>
        </motion.div>

        {/* Dynamic 1-Minute Countdown & Stage HUD */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel border border-amber-400/40 text-amber-300 text-sm font-mono font-bold shadow-lg glow-gold">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: spinning ? '2s' : '10s' }} />
            <span>{spinning ? `00:${timeLeft.toString().padStart(2, '0')}s remaining` : '60 Seconds Epic Spin'}</span>
          </div>

          <div className="px-4 py-2 rounded-2xl glass-panel border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
            {spinPhase}
          </div>

          {spinning && (
            <button
              onClick={handleFastForward}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-zinc-200 border border-white/10 transition-colors cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fast Forward</span>
            </button>
          )}
        </div>

        {/* Wheel Graphic Container */}
        <div className="relative flex flex-col items-center justify-center py-3">
          {/* Glowing Pointer Indicator */}
          <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none">
            <div
              className="w-7 h-10 bg-gradient-to-b from-amber-300 via-amber-400 to-rose-500 shadow-2xl border-2 border-white animate-pulse"
              style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
            />
          </div>

          {/* Outer Glowing Ring */}
          <div className="relative p-3 rounded-full glass-panel border-4 border-amber-400/60 glow-gold shadow-2xl">
            <div
              className="w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden relative shadow-inner"
              style={{
                transform: `rotate(${rotation}deg)`,
                willChange: 'transform',
              }}
            >
              {/* Slices SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {wheelOptions.map((opt, i) => {
                  const startAngle = (i * 2 * Math.PI) / numSlices
                  const endAngle = ((i + 1) * 2 * Math.PI) / numSlices
                  const x1 = 50 + 50 * Math.cos(startAngle)
                  const y1 = 50 + 50 * Math.sin(startAngle)
                  const x2 = 50 + 50 * Math.cos(endAngle)
                  const y2 = 50 + 50 * Math.sin(endAngle)
                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`

                  return (
                    <path
                      key={i}
                      d={pathData}
                      fill={opt.color}
                      stroke="#050505"
                      strokeWidth="0.75"
                    />
                  )
                })}
              </svg>

              {/* Labels on Slices */}
              {wheelOptions.map((opt, i) => {
                const angle = i * anglePerSlice + anglePerSlice / 2
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-start justify-center pt-6 sm:pt-8 pointer-events-none"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <span className="text-[10px] sm:text-xs font-black text-white drop-shadow-lg tracking-tight text-center max-w-[85px] leading-tight">
                      {opt.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Center Hub SPIN Button */}
            <button
              onClick={handleStartSpin}
              disabled={spinning}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-zinc-950 via-purple-950 to-black border-4 border-amber-400 text-amber-300 font-black text-sm sm:text-base flex flex-col items-center justify-center shadow-2xl transition-all cursor-pointer ${
                spinning
                  ? 'opacity-90 scale-95 glow-pink'
                  : 'hover:scale-110 active:scale-90 glow-gold hover:border-pink-400'
              }`}
            >
              <span className="text-xs sm:text-sm">{spinning ? 'SPINNING' : 'START 1-MIN'}</span>
              <span className="text-sm sm:text-base">🎡</span>
            </button>
          </div>
        </div>

        {/* Continue to Finale Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-2"
        >
          <button
            onClick={() => {
              audioEngine.playFanfare()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-pink-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>LAUNCH GRAND BIRTHDAY FINALE 🎂🚀</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Winning Reward Modal */}
      <AnimatePresence>
        {prize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
            <div className="absolute inset-0" onClick={() => setPrize(null)} />

            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative max-w-md w-full glass-panel border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center space-y-5 glow-gold"
            >
              <button
                onClick={() => setPrize(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
                  1-Minute Destiny Locked for Sai
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white text-glow-gold">
                  {prize.text}
                </h3>
              </div>

              <p className="text-base text-zinc-100 font-medium leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/10">
                {prize.reward}
              </p>

              <button
                onClick={() => {
                  setPrize(null)
                  audioEngine.playFanfare()
                  onNext()
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                Claim Prize & Enter Grand Finale 🎂🎉
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
