import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, ArrowRight, Sparkles, Heart } from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'
import { MemoryModal } from './MemoryModal'

export function MemoryTimeline({ onNext, audioEngine }) {
  const [selectedMemory, setSelectedMemory] = useState(null)
  const { memories } = birthdayData

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      <div className="max-w-4xl w-full z-20 space-y-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs tracking-widest text-pink-300 border border-pink-500/20">
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>Chapter 06: Digital Album</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-white text-glow-pink">
            Our Beautiful Memories 📸
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            A gallery of smiles, chaotic adventures, and moments that became eternal. Tap any photo to reminisce.
          </p>
        </motion.div>

        {/* Polaroid Memory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {memories.map((item, index) => {
            // Give subtle random rotation for natural polaroid aesthetic
            const rotations = [-2, 2, -1.5, 2.5, -1]
            const rot = rotations[index % rotations.length]

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, rotate: 0 }}
                onClick={() => {
                  audioEngine.playPop()
                  setSelectedMemory(item)
                }}
                style={{ transform: `rotate(${rot}deg)` }}
                className="group relative p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-500/40 shadow-xl cursor-pointer transition-all duration-300 flex flex-col"
              >
                {/* Photo frame */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs font-semibold text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Tap to read story
                    </span>
                  </div>
                </div>

                {/* Caption / Title */}
                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400">
                    {item.date}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {item.caption}
                  </p>
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
              audioEngine.playEmotionalChord()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:scale-105 font-bold text-white text-base sm:text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>READ THE HEARTFELT LETTER</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Memory Detail Modal */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        audioEngine={audioEngine}
      />
    </div>
  )
}
