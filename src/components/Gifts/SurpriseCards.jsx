import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Music,
  Smile,
  HeartHandshake,
  Video,
  Sparkles,
  Key,
  X,
  ArrowRight,
  Gift,
  CheckCircle,
  Play,
  Volume2,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

const ICON_MAP = {
  Music,
  Smile,
  HeartHandshake,
  Video,
  Sparkles,
  Key,
}

export function SurpriseCards({ onNext, audioEngine }) {
  const [openedGifts, setOpenedGifts] = useState({})
  const [activeModalGift, setActiveModalGift] = useState(null)
  const { surpriseCards } = birthdayData

  const handleOpenCard = (gift) => {
    audioEngine.playMagic()
    setOpenedGifts((prev) => ({ ...prev, [gift.id]: true }))
    setActiveModalGift(gift)
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-pink-300 border border-pink-500/20">
            <Gift className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter 09: Mystery Boxes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-gold">
            6 Interactive Gifts 🎁
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            6 Gifts. 6 Surprises. Which one will you open first? 😈
          </p>
        </motion.div>

        {/* 6 Gifts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {surpriseCards.map((item, index) => {
            const isOpened = openedGifts[item.id]
            const IconComponent = ICON_MAP[item.icon] || Gift

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => handleOpenCard(item)}
                className={`relative p-5 rounded-3xl glass-panel border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                  isOpened
                    ? 'border-emerald-500/50 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                    : 'border-white/10 hover:border-pink-500/50 glow-purple'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {isOpened ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle className="w-3 h-3" /> OPENED
                    </span>
                  ) : (
                    <span className="text-xs text-amber-300 animate-pulse">✨ TAP</span>
                  )}
                </div>

                <div className="space-y-1 mt-4">
                  <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                  <p className="text-xs text-zinc-400 truncate">{item.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playPop()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>SPIN THE SURPRISE WHEEL</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Gift Details Modal */}
      <AnimatePresence>
        {activeModalGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setActiveModalGift(null)} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full glass-panel border border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-left"
            >
              <button
                onClick={() => {
                  audioEngine.playPop()
                  setActiveModalGift(null)
                }}
                className="absolute top-4 right-4 p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg">
                  {(() => {
                    const IconC = ICON_MAP[activeModalGift.icon] || Gift
                    return <IconC className="w-6 h-6" />
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-cinzel text-white">
                    {activeModalGift.title}
                  </h3>
                  <p className="text-xs text-pink-400">{activeModalGift.subtitle}</p>
                </div>
              </div>

              {/* Dynamic Content based on Type */}
              {activeModalGift.type === 'song' && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white animate-spin" style={{ animationDuration: '8s' }}>
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{activeModalGift.content.trackTitle}</p>
                      <p className="text-xs text-zinc-400">{activeModalGift.content.artist}</p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 italic">{activeModalGift.content.quote}</p>
                </div>
              )}

              {activeModalGift.type === 'meme' && (
                <div className="space-y-3">
                  <img
                    src={activeModalGift.content.image}
                    alt="Throwback"
                    className="w-full h-48 object-cover rounded-2xl border border-white/10 shadow-lg"
                  />
                  <p className="text-sm font-bold text-white">{activeModalGift.content.headline}</p>
                  <p className="text-xs text-zinc-300">{activeModalGift.content.caption}</p>
                </div>
              )}

              {activeModalGift.type === 'voucher' && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-950/60 to-purple-950/60 border border-pink-500/40 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-pink-300">
                    <span>OFFICIAL BIRTHDAY COUPON</span>
                    <span>100% OFF</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{activeModalGift.content.deal}</h4>
                  <p className="text-xs text-zinc-300">{activeModalGift.content.terms}</p>
                  <div className="p-2 rounded-xl bg-black/40 text-center font-mono text-xs text-amber-300 border border-amber-400/30 tracking-widest">
                    CODE: {activeModalGift.content.code}
                  </div>
                </div>
              )}

              {activeModalGift.type === 'video' && (
                <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                  <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group">
                    <Video className="w-12 h-12 text-pink-400 mb-2" />
                    <span className="text-xs font-semibold text-zinc-300">{activeModalGift.content.accent}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{activeModalGift.content.title}</h4>
                  <p className="text-xs text-zinc-300">{activeModalGift.content.description}</p>
                </div>
              )}

              {activeModalGift.type === 'secret' && (
                <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                  <span className="text-xs font-mono text-amber-400">{activeModalGift.content.date}</span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-light">{activeModalGift.content.story}</p>
                </div>
              )}

              {activeModalGift.type === 'clue' && (
                <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-3">
                  <p className="text-sm text-amber-200 leading-relaxed font-medium">{activeModalGift.content.hint}</p>
                  <p className="text-xs text-zinc-400">{activeModalGift.content.nextPrompt}</p>
                </div>
              )}

              <button
                onClick={() => {
                  audioEngine.playPop()
                  setActiveModalGift(null)
                }}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-sm font-bold text-white transition-colors cursor-pointer"
              >
                Got It! 🎁
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
