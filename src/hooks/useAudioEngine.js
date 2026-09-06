import { useCallback } from 'react'

export function useAudioEngine() {
  const noop = useCallback(() => {}, [])

  return {
    isMuted: true,
    audioStarted: false,
    enableAudio: noop,
    toggleMute: noop,
    playMystery: noop,
    playBoom: noop,
    playMagic: noop,
    playEmotionalChord: noop,
    playDynamicTick: noop,
    playScratch: noop,
    playPop: noop,
    playGlassShatter: noop,
    playGlitchShock: noop,
    playFunnyBoing: noop,
    playFunnyQuack: noop,
    playAirhorn: noop,
    playFunnyLaugh: noop,
    playFunnySmile: noop,
    playFunnyClick: noop,
    playLoadingSound: noop,
    playProgressBarTick: noop,
    playWinCelebration: noop,
    playFanfare: noop,
  }
}
