import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Heart, ArrowRight, Star, MessageSquareHeart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

export function BestWishers({ onNext, audioEngine }) {
  const [likes, setLikes] = useState({})
  const { wishers } = birthdayData

  const handleLike = (id) => {
    audioEngine.playFunnySmile()
    audioEngine.playPop()
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#EC4899', '#FBBF24', '#7C3AED', '#22D3EE'],
    })
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      <div className="max-w-4xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-amber-300 border border-amber-500/30">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Chapter 03: Best Wishers Circle</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-pink">
            Special Messages for Sai 💖
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto">
            From the people who cheer the loudest for you: Laxman, Reshma, Shriya, and Riya!
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {wishers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-6 rounded-3xl glass-panel border border-white/10 hover:border-pink-500/40 shadow-2xl flex flex-col justify-between space-y-4 glow-purple transition-all duration-300"
            >
              {/* Top Row: Avatar + Name + Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-pink-300 font-medium">{item.role}</p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Message Quote */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative">
                <MessageSquareHeart className="w-4 h-4 text-pink-400/40 absolute top-3 right-3" />
                <p className="text-sm text-zinc-200 leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Like / Love interaction */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    audioEngine.playFunnyClick()
                    handleLike(item.id)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs font-bold text-pink-300 hover:text-white border border-pink-500/40 hover:bg-pink-600/30 transition-all cursor-pointer group-hover:scale-105 shadow-md glow-pink"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                  <span>Send Love</span>
                  {(likes[item.id] || 0) > 0 && (
                    <span className="ml-1 text-[11px] font-bold text-amber-300 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-400/40">
                      +{likes[item.id]}
                    </span>
                  )}
                </button>
                <span className="text-[11px] font-mono text-amber-300/60">7th Sept 2026</span>
              </div>
            </motion.div>
          ))}
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
              audioEngine.playFunnyClick()
              audioEngine.playEmotionalChord()
              onNext()
            }}
            onMouseEnter={() => audioEngine.playFunnyClick()}
            className="group px-9 py-4 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>READ THE HEARTFELT BLESSINGS 📜</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
