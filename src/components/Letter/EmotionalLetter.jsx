import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function EmotionalLetter({ onNext, audioEngine }) {
  const [isOpen, setIsOpen] = useState(false)
  const { letter } = birthdayData

  const handleOpenLetter = () => {
    audioEngine.playEmotionalChord()
    setIsOpen(true)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      {/* Soft Starry glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-purple-300 border border-purple-500/20">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Chapter 04: From The Heart</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-pink">
            The Emotional Letter 💌
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Words unspoken, feelings poured into a timeless digital keepsake.
          </p>
        </motion.div>

        {/* Envelope / Letter Interactive Card */}
        <div className="py-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                {/* 3D Wax Seal Envelope */}
                <div
                  onClick={handleOpenLetter}
                  className="group relative w-72 sm:w-96 h-52 sm:h-64 rounded-3xl glass-panel border-2 border-pink-500/40 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer hover:scale-105 transition-all duration-300 glow-pink"
                >
                  <div className="flex justify-between w-full text-xs font-mono text-pink-300/80">
                    <span>SEALED WITH LOVE</span>
                    <span>PRIVATE & CONFIDENTIAL</span>
                  </div>

                  {/* Wax Seal Centerpiece */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-pink-500 shadow-xl border-2 border-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-script text-2xl text-amber-200">{letter.recipient}</p>
                    <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold">
                      Tap To Break Seal & Read ❤️
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter Paper Content */
              <motion.div
                key="letter-content"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-amber-400/30 shadow-2xl text-left space-y-6 glow-purple"
              >
                {/* Vintage Letter Header */}
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <span className="font-script text-3xl sm:text-4xl text-amber-300">
                    {letter.recipient}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1 rounded-full">
                    Birthday Edition
                  </span>
                </div>

                <p className="text-sm font-medium text-pink-300 italic">
                  {letter.salutation}
                </p>

                {/* Paragraphs */}
                <div className="space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <div className="border-t border-white/10 pt-4 space-y-1 text-right">
                  <p className="text-xs text-zinc-400">{letter.closing}</p>
                  <p className="font-script text-2xl sm:text-3xl text-pink-400 font-bold">
                    {letter.signature}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => {
                audioEngine.playPop()
                onNext()
              }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-pink-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              <span>SPIN THE SURPRISE WHEEL 🎡</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
