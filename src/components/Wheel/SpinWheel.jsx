import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Disc,
  ArrowRight,
  X,
  Trophy,
  Clock,
  Zap,
  FastForward,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

const SPIN_DURATION_MS = 15000 // 15 Seconds Epic Spin
 
export function SpinWheel({ onNext, audioEngine }) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prize, setPrize] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [spinPhase, setSpinPhase] = useState('READY')
  const { wheelOptions } = birthdayData

  const spinStartTimeRef = useRef(0)
  const spinAnimationFrameRef = useRef(null)
  const selectedPrizeRef = useRef(null)

  const numSlices = wheelOptions.length
  const anglePerSlice = 360 / numSlices

  // 15-Second Custom Velocity Easing: Very Fast -> Mid -> Slow -> End
  const calculateRotation = (progress) => {
    const p = progress
    let ease
    if (p < 0.30) {
      // 1. VERY FAST (0-4.5s): Hyper supersonic spinning
      ease = p * 2.3
    } else if (p < 0.60) {
      // 2. MID (4.5-9s): Steady cruising rotation
      ease = 0.69 + (p - 0.30) * 1.35
    } else if (p < 0.83) {
      // 3. SLOW (9-12.5s): Dramatic deceleration suspense
      ease = 1.095 + (p - 0.60) * 0.72
    } else {
      // 4. END (12.5-15s): Micro-stepping into winning slice
      const tail = (p - 0.83) / 0.17
      ease = 1.26 + (1 - Math.pow(1 - tail, 3)) * 0.05
    }
    return ease
  }

  const handleStartSpin = () => {
    if (spinning) return

    setSpinning(true)
    setPrize(null)
    setTimeLeft(15)
    setSpinPhase('🚀 VERY FAST')

    audioEngine.enableAudio()
    audioEngine.playBoom()
    audioEngine.playFunnyBoing()

    // Pick winning index
    const winningIndex = Math.floor(Math.random() * numSlices)
    selectedPrizeRef.current = wheelOptions[winningIndex]

    const initialRotation = rotation % 360
    const targetSliceAngle = 360 - winningIndex * anglePerSlice - anglePerSlice / 2
    const totalAngleDelta = 360 * 18 + targetSliceAngle

    spinStartTimeRef.current = performance.now()
    let lastTickAngle = initialRotation

    const animateWheel = (now) => {
      const elapsed = now - spinStartTimeRef.current
      const progress = Math.min(1, elapsed / SPIN_DURATION_MS)
      const remainingSeconds = Math.max(0, Math.ceil((SPIN_DURATION_MS - elapsed) / 1000))
      setTimeLeft(remainingSeconds)

      // Update Phase HUD: VERY FAST (0-4.5s) -> MID (4.5-9s) -> SLOW (9-12.5s) -> END (12.5-15s)
      if (progress < 0.30) {
        setSpinPhase('🚀 1. VERY FAST (1800 RPM)')
      } else if (progress < 0.60) {
        setSpinPhase('⚡ 2. MID SPEED')
      } else if (progress < 0.83) {
        setSpinPhase('🐢 3. SLOW SUSPENSE')
      } else {
        setSpinPhase('🎯 4. WIN / LOCKING ON')
      }

      // Compute current rotation
      const easeMultiplier = calculateRotation(progress)
      const currentRot = initialRotation + totalAngleDelta * (easeMultiplier / 1.31)
      setRotation(currentRot)

      // Dynamic Tick Sound
      if (Math.abs(currentRot - lastTickAngle) >= anglePerSlice) {
        lastTickAngle = currentRot
        const pitch = Math.max(0.6, 1.4 - progress * 0.75)
        const volume = Math.max(0.12, 0.42 - progress * 0.18)
        audioEngine.playDynamicTick(pitch, volume)
      }

      if (progress < 1) {
        spinAnimationFrameRef.current = requestAnimationFrame(animateWheel)
      } else {
        finishSpin()
      }
    }

    spinAnimationFrameRef.current = requestAnimationFrame(animateWheel)
  }

  const handleFastForward = () => {
    if (!spinning) return
    cancelAnimationFrame(spinAnimationFrameRef.current)
    finishSpin()
  }

  const finishSpin = () => {
    setSpinning(false)
    setSpinPhase('🏆 WINNER! DESTINY UNLOCKED')
    setTimeLeft(0)

    const winner = selectedPrizeRef.current || wheelOptions[0]
    setPrize(winner)

    // Play Grand Win Celebration Sound & Birthday Fanfare
    audioEngine.playWinCelebration()
    setTimeout(() => {
      audioEngine.playFanfare()
    }, 450)

    confetti({
      particleCount: 200,
      spread: 140,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#EC4899', '#9333EA', '#06B6D4', '#FFFFFF', '#10B981'],
    })
  }

  useEffect(() => {
    return () => {
      if (spinAnimationFrameRef.current) {
        cancelAnimationFrame(spinAnimationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-[150px] pointer-events-none -top-20 -right-20 animate-pulse-glow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none -bottom-20 -left-20 animate-pulse-glow" />

      <div className="max-w-2xl w-full z-20 space-y-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Chapter 06: 15-Second Epic Spinner Game</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            Spin The Surprise 🎡
          </h2>

          <p className="text-zinc-200 text-sm sm:text-base max-w-md mx-auto">
            A 15-second thrill ride: <span className="text-amber-300 font-bold">Very Fast</span> ➔ <span className="text-pink-300 font-bold">Mid</span> ➔ <span className="text-cyan-300 font-bold">Slow</span> ➔ <span className="text-emerald-300 font-bold">End/Win</span>!
          </p>
        </motion.div>

        {/* Dynamic 15-Second Countdown & Stage HUD */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel border border-amber-400/40 text-amber-300 text-sm font-mono font-bold shadow-lg glow-gold">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: spinning ? '1.5s' : '10s' }} />
            <span>{spinning ? `00:${timeLeft.toString().padStart(2, '0')}s remaining` : '15 Seconds Epic Spin'}</span>
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
          <div className="relative p-2.5 sm:p-3.5 rounded-full glass-panel border-4 border-amber-400/60 glow-gold shadow-2xl">
            <div
              className="w-[260px] h-[260px] xs:w-72 xs:h-72 sm:w-96 sm:h-96 max-w-[82vw] max-h-[82vw] rounded-full overflow-hidden relative shadow-inner"
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
                      stroke="#0a0614"
                      strokeWidth="0.8"
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
              <span className="text-xs sm:text-sm">{spinning ? 'SPINNING' : 'START 15S'}</span>
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
            onMouseEnter={() => audioEngine.playFunnyClick()}
            className="group px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>LAUNCH GRAND BIRTHDAY FINALE 🎂🚀</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
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
                  15-Second Destiny Locked for Sai
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
                className="w-full py-4 rounded-2xl btn-luxury-gold text-white font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
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
