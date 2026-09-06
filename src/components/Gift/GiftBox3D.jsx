import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, ArrowRight, Gift, Heart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function GiftBox3D({ onNext, audioEngine }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const { giftBox } = birthdayData

  const handleOpenGift = () => {
    if (isOpen || isOpening) return

    setIsOpening(true)
    audioEngine.playMagic()

    // Confetti fireworks burst
    setTimeout(() => {
      audioEngine.playBoom()
      setIsOpen(true)
      setIsOpening(false)

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#EC4899', '#7C3AED', '#FFFFFF', '#38BDF8'],
      })
    }, 1200)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background glow when opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-radial from-amber-500/20 via-purple-900/20 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-xl z-20 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chapter 04: Golden Vault</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            {isOpen ? 'Surprise Unlocked! 🎉' : giftBox.teaser}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {isOpen ? 'Here is a special token of celebration for you' : giftBox.instruction}
          </p>
        </motion.div>

        {/* 3D Gift Box Interactive Visual */}
        <div className="py-6 flex flex-col items-center justify-center">
          {!isOpen ? (
            <motion.div
              onClick={handleOpenGift}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isOpening
                  ? {
                      rotate: [-5, 5, -8, 8, -12, 12, 0],
                      scale: [1, 1.15, 1.25],
                      transition: { duration: 1.2 },
                    }
                  : {
                      y: [-8, 8, -8],
                      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
              className="group relative cursor-pointer"
            >
              {/* Box Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />

              {/* Gift Container */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-purple-800 via-indigo-950 to-purple-950 border-2 border-amber-400/60 shadow-2xl flex flex-col items-center justify-center p-4 overflow-hidden">
                {/* Golden Ribbon Cross */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 shadow-md shadow-amber-500/30" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-500 shadow-md shadow-amber-500/30" />

                {/* Ribbon Bow on top */}
                <div className="absolute top-4 z-20 flex items-center justify-center">
                  <div className="w-12 h-10 rounded-full border-4 border-amber-300 bg-amber-400/40 shadow-lg -rotate-12" />
                  <div className="w-12 h-10 rounded-full border-4 border-amber-300 bg-amber-400/40 shadow-lg rotate-12 -ml-4" />
                </div>

                {/* Center Badge */}
                <div className="z-20 w-16 h-16 rounded-2xl glass-panel border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-xl group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-amber-300 animate-bounce" />
                </div>

                <div className="absolute bottom-3 z-20 text-[11px] font-bold text-amber-200 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-amber-400/30">
                  {isOpening ? 'Unwrapping...' : 'Tap To Open'}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Revealed Message Card */
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="relative max-w-lg w-full p-6 sm:p-8 rounded-3xl glass-panel border border-amber-400/40 shadow-2xl glow-gold text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">✨🎁✨</span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                  Special Dedication
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-300">
                {giftBox.messageTitle}
              </h3>

              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
                {giftBox.messageBody}
              </p>

              <div className="pt-2 flex items-center gap-2 text-pink-400 font-script text-2xl">
                <Heart className="w-5 h-5 fill-pink-500 text-pink-500 inline" />
                <span>Happy Birthday!</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Next Button */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => {
                audioEngine.playEmotionalChord()
                onNext()
              }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-pink-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              <span>READ THE HEARTFELT LETTER 💌</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
