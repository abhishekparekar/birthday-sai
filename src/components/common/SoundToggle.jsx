import { Volume2, VolumeX } from 'lucide-react'

export function SoundToggle({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full glass-panel text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:scale-105 border border-white/10 hover:border-purple-500/50 shadow-lg cursor-pointer"
    >
      {isMuted ? (
        <>
          <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="hidden sm:inline">SOUND OFF</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">SOUND ON</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </>
      )}
    </button>
  )
}
