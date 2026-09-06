import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight, ScrollText } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function EmotionalLetter({ onNext, audioEngine }) {
  const [isOpen, setIsOpen] = useState(false)
  const { letter } = birthdayData

  const handleOpenLetter = () => {
    audioEngine.enableAudio()
    audioEngine.playEmotionalChord()
    setIsOpen(true)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      {/* Soft Starry glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/30">
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span>Chapter 04: Heartfelt Blessing • मनःपूर्वक शुभेच्छा</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            A Letter of Blessings for Sai 📜
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base">
            From the bottom of our hearts, a tribute to who you are and who you will become.
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
                  className="group relative w-72 sm:w-96 h-56 sm:h-64 rounded-3xl glass-panel border-2 border-amber-400/50 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer hover:scale-105 transition-all duration-300 glow-gold"
                >
                  <div className="flex justify-between w-full text-xs font-mono text-amber-300/90">
                    <span>SPECIAL DEDICATION</span>
                    <span>7TH SEPT 2026</span>
                  </div>

                  {/* Wax Seal Centerpiece */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-pink-500 shadow-2xl border-2 border-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-2xl text-amber-200 tracking-wide">{letter.recipient}</p>
                    <p className="text-[11px] uppercase tracking-widest text-zinc-300 font-bold">
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
                className="relative p-6 sm:p-10 rounded-3xl glass-panel border-2 border-amber-400/40 shadow-2xl text-left space-y-6 glow-gold bg-gradient-to-br from-[#0c0c18]/90 via-[#120f24]/90 to-[#0a0a14]/90"
              >
                {/* Vintage Letter Header */}
                <div className="border-b border-amber-400/20 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-bold text-amber-300 tracking-wide">
                      {letter.recipient}
                    </span>
                    <p className="text-base sm:text-lg font-semibold text-pink-400 mt-1">
                      {letter.salutation}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full">
                    7th September Special
                  </span>
                </div>

                {/* Marathi Paragraphs */}
                <div className="space-y-4 text-zinc-100 text-base sm:text-lg leading-relaxed font-normal">
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.12 }}
                      className="border-l-2 border-pink-500/40 pl-4 py-1 bg-white/[0.02] rounded-r-xl"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <div className="border-t border-amber-400/20 pt-4 space-y-1 text-right">
                  <p className="text-base font-bold text-amber-300">{letter.closing}</p>
                  <p className="text-xl sm:text-2xl text-pink-400 font-bold">
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
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => {
                audioEngine.playFunnyClick()
                audioEngine.playMagic()
                onNext()
              }}
              onMouseEnter={() => audioEngine.playFunnyClick()}
              className="group px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              <span>ENTER THE GRAND FINALE 👑🎉</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
