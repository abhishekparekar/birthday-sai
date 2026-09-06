import { useState, useRef, useEffect, useCallback } from 'react'

let globalAudioCtx = null

function getAudioCtx() {
  if (typeof window === 'undefined') return null
  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx()
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {})
  }
  return globalAudioCtx
}

export function useAudioEngine() {
  const [isMuted, setIsMuted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)

  const enableAudio = useCallback(() => {
    const ctx = getAudioCtx()
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    setAudioStarted(true)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  // 1. Low Resonant Mystery Drone
  const playMystery = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(80, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.2)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(300, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1.2)

      gain.gain.setValueAtTime(0.25, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 1.2)
    } catch (e) {}
  }, [isMuted])

  // 2. Shock Boom Impact
  const playBoom = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(160, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.9)

      gain.gain.setValueAtTime(0.65, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.9)

      const bufferSize = ctx.sampleRate * 0.4
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.setValueAtTime(850, ctx.currentTime)
      noiseFilter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      noise.start()
    } catch (e) {}
  }, [isMuted])

  // 3. Magical Chimes
  const playMagic = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07)

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07)
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.07 + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.6)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + idx * 0.07)
        osc.stop(ctx.currentTime + idx * 0.07 + 0.7)
      })
    } catch (e) {}
  }, [isMuted])

  // 4. Emotional Piano Chord for Marathi Letter
  const playEmotionalChord = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const freqs = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25]
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06)

        gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + i * 0.06)
        osc.stop(ctx.currentTime + 3.1)
      })
    } catch (e) {}
  }, [isMuted])

  // 5. Dynamic Mechanical Tick with Pitch Modulation (for 1-min decelerating wheel)
  const playDynamicTick = useCallback((pitchMultiplier = 1, volume = 0.2) => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const baseFreq = 900 * pitchMultiplier
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, ctx.currentTime + 0.035)

      gain.gain.setValueAtTime(Math.min(0.35, volume), ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch (e) {}
  }, [isMuted])

  // 6. Funny Record Scratch
  const playScratch = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const bufferSize = ctx.sampleRate * 0.3
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI * 8)
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.playbackRate.setValueAtTime(1.6, ctx.currentTime)
      noise.playbackRate.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.28)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

      noise.connect(gain)
      gain.connect(ctx.destination)
      noise.start()
    } catch (e) {}
  }, [isMuted])

  // 7. Pop / Button Tap
  const playPop = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06)

      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.06)
    } catch (e) {}
  }, [isMuted])

  // 8. Birthday Fanfare Melody
  const playFanfare = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const notes = [
        { f: 261.63, d: 0.25, t: 0.0 },
        { f: 261.63, d: 0.25, t: 0.3 },
        { f: 293.66, d: 0.4, t: 0.6 },
        { f: 261.63, d: 0.4, t: 1.05 },
        { f: 349.23, d: 0.45, t: 1.5 },
        { f: 329.63, d: 0.7, t: 2.0 },
        { f: 523.25, d: 1.2, t: 2.75 },
        { f: 659.25, d: 1.2, t: 2.75 },
        { f: 783.99, d: 1.2, t: 2.75 },
      ]

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, ctx.currentTime + t)

        gain.gain.setValueAtTime(0, ctx.currentTime + t)
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + t + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + d)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + t)
        osc.stop(ctx.currentTime + t + d + 0.05)
      })
    } catch (e) {}
  }, [isMuted])

  return {
    isMuted,
    audioStarted,
    enableAudio,
    toggleMute,
    playMystery,
    playBoom,
    playMagic,
    playEmotionalChord,
    playDynamicTick,
    playScratch,
    playPop,
    playFanfare,
  }
}
