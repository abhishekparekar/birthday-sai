import { useState } from 'react'
import { motion } from 'framer-motion'
import { Laugh, ArrowRight, Flame, RefreshCw } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function FunnyZone({ onNext, audioEngine }) {
  const [flippedCards, setFlippedCards] = useState({})
  const { roasts } = birthdayData

  const handleFlip = (id) => {
    audioEngine.playPop()
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      {/* Playful background glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full z-20 space-y-8 text-center">
        {/* Dramatic Comedy Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black tracking-widest uppercase animate-bounce">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Chapter 06: The Real Sai Exposed</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500">
            ENOUGH EMOTIONAL DRAMA! 😂
          </h2>

          <p className="text-zinc-200 text-base sm:text-lg max-w-lg mx-auto font-medium">
            Now let's talk about the <span className="text-pink-400 font-bold">REAL SAI</span>. Tap any card below to reveal the hilarious classified truth! 😈
          </p>
        </motion.div>

        {/* Roast Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {roasts.map((item, index) => {
            const isFlipped = flippedCards[item.id]

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleFlip(item.id)}
                className={`relative p-6 rounded-3xl glass-panel border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isFlipped
                    ? 'border-amber-400/60 bg-gradient-to-br from-purple-950/80 to-pink-950/80 glow-gold'
                    : 'border-white/10 hover:border-amber-500/30'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/5">
                    {item.badge}
                  </span>
                  <span className="text-2xl">{item.emoji}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{item.title}</span>
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1 text-amber-400/80">
                    <RefreshCw className="w-3 h-3" /> Tap to toggle
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">100% CERTIFIED ACCURATE</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playMagic()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-amber-500/20 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>ENTER THE 1-MIN SUSPENSE SPINNER 🎡</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
