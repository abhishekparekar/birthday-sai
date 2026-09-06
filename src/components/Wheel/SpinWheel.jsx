import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Disc, ArrowRight, X, Trophy } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function SpinWheel({ onNext, audioEngine }) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [prize, setPrize] = useState(null)
  const { wheelOptions } = birthdayData

  const handleSpin = () => {
    if (spinning) return
    setSpinning(true)
    setPrize(null)

    // Tick sound ticker interval
    let ticks = 0
    const tickInterval = setInterval(() => {
      audioEngine.playTick()
      ticks++
      if (ticks > 25) clearInterval(tickInterval)
    }, 120)

    const numOptions = wheelOptions.length
    const randomIndex = Math.floor(Math.random() * numOptions)
    const extraDegrees = 360 * 5 // 5 full rotations
    const sliceDegrees = 360 / numOptions
    const targetRotation = rotation + extraDegrees + (360 - randomIndex * sliceDegrees - sliceDegrees / 2)

    setRotation(targetRotation)

    setTimeout(() => {
      clearInterval(tickInterval)
      setSpinning(false)
      setPrize(wheelOptions[randomIndex])
      audioEngine.playMagic()

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#EC4899', '#7C3AED'],
      })
    }, 4000)
  }

  const numSlices = wheelOptions.length
  const anglePerSlice = 360 / numSlices

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none overflow-hidden">
      <div className="max-w-xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/20">
            <Disc className="w-3.5 h-3.5 text-amber-400" />
            <span>Chapter 05: Spin The Surprises</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            Spin The Surprise 🎡
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Test your birthday luck! Tap the center to spin for your surprise prize.
          </p>
        </motion.div>

        {/* Wheel Container */}
        <div className="relative flex flex-col items-center justify-center py-4">
          {/* Pointer indicator at top */}
          <div className="absolute -top-1 z-30 flex flex-col items-center pointer-events-none">
            <div
              className="w-6 h-8 bg-gradient-to-b from-amber-300 to-amber-500 shadow-xl border border-amber-200"
              style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
            />
          </div>

          {/* Glowing Ring */}
          <div className="relative p-2 rounded-full glass-panel border-4 border-amber-400/40 glow-gold shadow-2xl">
            <div
              className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden relative shadow-inner transition-transform"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              }}
            >
              {/* Slices rendered using SVG */}
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

              {/* Labels on each slice */}
              {wheelOptions.map((opt, i) => {
                const angle = i * anglePerSlice + anglePerSlice / 2
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-start justify-center pt-5 pointer-events-none"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-md tracking-tight text-center max-w-[70px]">
                      {opt.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Center Spin Button Hub */}
            <button
              onClick={handleSpin}
              disabled={spinning}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-black border-4 border-amber-400 text-amber-300 font-extrabold text-sm sm:text-base flex flex-col items-center justify-center shadow-2xl transition-transform cursor-pointer ${
                spinning ? 'opacity-80 scale-95' : 'hover:scale-110 active:scale-90 glow-gold'
              }`}
            >
              <span>{spinning ? 'SPINNING' : 'SPIN'}</span>
              <span className="text-xs">🎡</span>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playFanfare()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-pink-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>LAUNCH GRAND CELEBRATION 🎂🚀</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Prize Dialog */}
      <AnimatePresence>
        {prize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setPrize(null)} />

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative max-w-md w-full glass-panel border border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center space-y-5 glow-gold"
            >
              <button
                onClick={() => setPrize(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                  Wheel Reward Unlocked
                </span>
                <h3 className="text-2xl font-black font-cinzel text-white">
                  {prize.text}
                </h3>
              </div>

              <p className="text-base text-zinc-200 font-light leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/10">
                {prize.reward}
              </p>

              <button
                onClick={() => setPrize(null)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-sm shadow-lg cursor-pointer"
              >
                Claim Reward 🎉
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
