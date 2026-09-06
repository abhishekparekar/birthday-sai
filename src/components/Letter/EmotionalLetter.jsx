import { motion } from 'framer-motion'
import { ArrowRight, ScrollText, Crown, Heart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function EmotionalLetter({ onNext, audioEngine }) {
  const { letter } = birthdayData

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 py-6 sm:py-8 select-none overflow-hidden">
      {/* Soft Starry Glow Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none top-1/4 left-1/2 -translate-x-1/2" />

      <div className="max-w-4xl w-full z-20 space-y-3.5 sm:space-y-5 text-center flex flex-col items-center">
        {/* Compact Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full glass-panel text-xs sm:text-sm tracking-wider text-amber-300 border border-amber-500/40 glow-gold shadow-sm">
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">Chapter 03: मनःपूर्वक शुभेच्छा पत्र 📜</span>
          </div>
        </motion.div>

        {/* 📜 Compact & Ultra-Visible Full Marathi Wishes Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="w-full relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-amber-400/50 shadow-2xl text-left space-y-3.5 sm:space-y-4 glow-gold bg-gradient-to-br from-[#0c0c18]/95 via-[#140f26]/95 to-[#0a0a14]/95"
        >
          {/* Letter Header */}
          <div className="border-b border-amber-400/20 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                <span className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 tracking-wide font-cinzel">
                  {letter.recipient}
                </span>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-pink-300 mt-0.5 text-glow-pink">
                {letter.salutation}
              </p>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full shadow-xs">
              ✨ ७ सप्टेंबर २०२६
            </span>
          </div>

          {/* Marathi Full Paragraphs */}
          <div className="space-y-2 sm:space-y-2.5 text-zinc-100 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            {letter.paragraphs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                className="border-l-2 border-pink-500/50 pl-3 sm:pl-3.5 py-1 bg-white/[0.02] rounded-r-xl"
              >
                <p className="text-zinc-100 leading-relaxed font-normal">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Signature & Closing */}
          <div className="border-t border-amber-400/20 pt-3 space-y-0.5 text-right">
            <p className="text-xs sm:text-sm font-bold text-amber-300 font-cinzel">{letter.closing}</p>
            <p className="text-base sm:text-xl md:text-2xl text-pink-400 font-black tracking-wide text-glow-pink">
              {letter.signature}
            </p>
          </div>
        </motion.div>

        {/* Continue to Grand Finale Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-1"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-10 py-3 sm:py-3.5 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
          >
            <span className="relative z-10 flex items-center gap-2.5 text-glow-gold">
              <span>ENTER THE GRAND FINALE</span>
              <span className="text-lg">👑🎉</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
