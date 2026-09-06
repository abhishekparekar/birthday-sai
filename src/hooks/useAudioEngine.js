import { useState, useRef, useCallback } from 'react'

// Global AudioContext singleton - initialized ONLY on user gesture
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

  // 1. Mystery low resonant hum
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

  // 2. Shock Boom / Impact
  const playBoom = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8)

      gain.gain.setValueAtTime(0.6, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.8)

      const bufferSize = ctx.sampleRate * 0.35
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.setValueAtTime(800, ctx.currentTime)
      noiseFilter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.35, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      noise.start()
    } catch (e) {}
  }, [isMuted])

  // 3. Magical Sparkling Chimes (for Gift / Reveal)
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

  // 4. Emotional Piano Chord
  const playEmotionalChord = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const freqs = [261.63, 329.63, 392.0, 493.88, 523.25]
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.05)

        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + i * 0.05)
        osc.stop(ctx.currentTime + 2.6)
      })
    } catch (e) {}
  }, [isMuted])

  // 5. Wheel Mechanical Tick
  const playTick = useCallback(() => {
    if (isMuted) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state === 'suspended') return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03)

      gain.gain.setValueAtTime(0.18, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    } catch (e) {}
  }, [isMuted])

  // 6. Pop / Click
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

  // 7. Birthday Melody / Fanfare
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
    playTick,
    playPop,
    playFanfare,
  }
}
