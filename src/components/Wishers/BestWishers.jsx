import { motion } from 'framer-motion'
import { ArrowRight, Quote } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function BestWishers({ onNext, audioEngine }) {
  const { wishers } = birthdayData

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 py-8 sm:py-10 select-none overflow-hidden">
      {/* Radiant Background Ambience */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[150px] pointer-events-none top-1/3 left-1/2 -translate-x-1/2" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none -bottom-10 right-10" />

      <div className="max-w-5xl w-full z-20 space-y-4 sm:space-y-6 text-center flex flex-col items-center">
        {/* Clean & Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-1 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 tracking-wide drop-shadow-md font-cinzel">
            वाढदिवसाच्या खास शुभेच्छा 🌟
          </h2>
        </motion.div>

        {/* 🌟 Compact & Professional Grid: ONLY Name and Wishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full text-left">
          {wishers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.015 }}
              className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl glass-panel border border-white/15 hover:border-amber-400/60 shadow-xl flex flex-col justify-between space-y-2.5 glow-purple transition-all duration-300 bg-gradient-to-br from-[#0c0c18]/90 via-[#140f26]/90 to-[#0a0a14]/90"
            >
              {/* Row 1: Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-xl blur-xs opacity-70 group-hover:opacity-100 transition duration-500" />
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-white/20 shadow-sm"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>
              </div>

              {/* Row 2: Wishes */}
              <div className="relative p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-pink-500/30 transition-colors">
                <Quote className="w-4 h-4 text-amber-400/40 absolute top-2.5 right-2.5 rotate-180" />
                <p className="text-xs sm:text-sm md:text-base text-zinc-100 leading-relaxed font-normal pr-3">
                  "{item.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-1 sm:pt-2"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-10 py-3 sm:py-3.5 rounded-2xl btn-luxury-gold font-black text-white text-sm sm:text-base shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
          >
            <span className="relative z-10 flex items-center gap-2.5 text-glow-gold">
              <span>READ HEARTFELT BLESSINGS</span>
              <span className="text-lg">📜✨</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
