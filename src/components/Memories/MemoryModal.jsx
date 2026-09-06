import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Tag, Heart } from 'lucide-react'

export function MemoryModal({ memory, onClose, audioEngine }) {
  if (!memory) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="relative max-w-2xl w-full glass-panel border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              audioEngine.playPop()
              onClose()
            }}
            className="absolute top-4 right-4 p-2 rounded-full glass-panel text-zinc-400 hover:text-white border border-white/10 hover:border-pink-500/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo Frame */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-zinc-900 group">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-pink-300 border border-white/10 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-pink-400" />
                {memory.tag}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{memory.date}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
              {memory.title}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {memory.caption}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-pink-400 font-script text-xl">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                <span>Unforgettable Moment</span>
              </div>
              <button
                onClick={() => {
                  audioEngine.playPop()
                  onClose()
                }}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close Memory
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
