import { Check } from 'lucide-react'

export function ProgressNav({ currentStep, totalSteps = 8, unlockedSteps = [0], onSelectStep }) {
  const stepsLabels = [
    'Mystery Intro',
    'Shock Reveal',
    'Grand Reveal',
    'Best Wishers',
    'Marathi Blessings',
    'Roast Zone',
    '1-Min Spinner',
    'Grand Finale',
  ]

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-2xl max-w-[95vw] overflow-x-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCurrent = currentStep === index
        const isUnlocked = unlockedSteps.includes(index)
        const isCompleted = currentStep > index

        return (
          <button
            key={index}
            onClick={() => isUnlocked && onSelectStep && onSelectStep(index)}
            disabled={!isUnlocked}
            title={`${stepsLabels[index] || `Chapter ${index + 1}`} ${!isUnlocked ? '(Locked)' : ''}`}
            className={`group relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer ${
              isCurrent
                ? 'w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/30 ring-2 ring-pink-400/50 scale-110'
                : isCompleted
                ? 'w-5 h-5 bg-purple-900/60 hover:bg-purple-700 text-purple-300 border border-purple-500/40'
                : isUnlocked
                ? 'w-4 h-4 bg-zinc-700 hover:bg-zinc-500 border border-white/20'
                : 'w-3 h-3 bg-zinc-900/80 border border-white/5 opacity-40 cursor-not-allowed'
            }`}
          >
            {isCurrent ? (
              <span className="text-[10px] font-bold">{index + 1}</span>
            ) : isCompleted ? (
              <Check className="w-2.5 h-2.5" />
            ) : !isUnlocked ? (
              <span className="sr-only">Locked</span>
            ) : (
              <span className="sr-only">{index + 1}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
