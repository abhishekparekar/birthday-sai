import { motion } from 'framer-motion'
import {
  Sparkles,
  Gift,
  Camera,
  Heart,
  Laugh,
  Boxes,
  Disc,
  KeyRound,
  Crown,
  PartyPopper,
  Lock,
  Unlock,
  ChevronRight,
} from 'lucide-react'
import { birthdayData } from '../../data/birthdayData'

const ICON_MAP = {
  Sparkles,
  Gift,
  Camera,
  Heart,
  Laugh,
  Boxes,
  Disc,
  KeyRound,
  Crown,
  PartyPopper,
}

export function JourneyMap({ currentStep, unlockedSteps, onSelectStep, onNext, audioEngine }) {
  const { journey } = birthdayData

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 py-20 select-none">
      <div className="max-w-3xl w-full z-20 space-y-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs uppercase tracking-widest text-purple-300 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Interactive Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-glow-pink text-white">
            Your Birthday Quest 🗺️
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            10 Chapters of emotions, surprises, and laughter crafted exclusively for your big day.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
          {journey.map((item, index) => {
            // Step index in our 12-screen system (screens 0..11)
            // item 0 -> screen 0, 1 -> 1, 2 -> 2, etc.
            const screenIndex = index < 4 ? index : index + 1 // align nicely with total screens
            const isUnlocked = unlockedSteps.includes(screenIndex)
            const isCurrent = currentStep === screenIndex
            const IconComponent = ICON_MAP[item.icon] || Sparkles

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playPop()
                    onSelectStep(screenIndex)
                  }
                }}
                className={`relative p-4 rounded-2xl transition-all duration-300 border flex items-center gap-4 ${
                  isCurrent
                    ? 'glass-panel border-pink-500/60 ring-2 ring-pink-500/30 glow-pink'
                    : isUnlocked
                    ? 'glass-card hover:border-purple-500/40 cursor-pointer hover:scale-[1.02]'
                    : 'bg-zinc-950/40 border-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Icon box */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 text-pink-300 border border-pink-500/30'
                      : 'bg-zinc-900 text-zinc-600 border border-white/5'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-pink-400/80">Chapter {index + 1}</span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Unlock className="w-2.5 h-2.5" /> Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-white/5">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white truncate mt-0.5">{item.title}</h3>
                  <p className="text-xs text-zinc-400 truncate">{item.description}</p>
                </div>

                {isUnlocked && (
                  <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0 group-hover:text-white transition-colors" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              audioEngine.playMagic()
              onNext()
            }}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-bold text-white text-base sm:text-lg shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>ENTER THE GIFT VAULT</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
