import { useState, useCallback, useEffect } from 'react'

let globalAudioCtx = null

function getAudioCtx() {
  if (typeof window === 'undefined') return null
  try {
    if (!globalAudioCtx || globalAudioCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        globalAudioCtx = new AudioCtx()
      }
    }
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {})
    }
  } catch (e) {}
  return globalAudioCtx
}

export function useAudioEngine() {
  const [isMuted, setIsMuted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(true)

  // Forcefully unlock and wake Web Audio on ANY user interaction anywhere on the window
  useEffect(() => {
    const unlock = () => {
      const ctx = getAudioCtx()
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
      setAudioStarted(true)
    }

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown', 'mousemove', 'scroll', 'focus']
    events.forEach((evt) => {
      window.addEventListener(evt, unlock, { passive: true })
    })

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlock)
      })
    }
  }, [])

  const enableAudio = useCallback(() => {
    setIsMuted(false)
    const ctx = getAudioCtx()
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    setAudioStarted(true)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      if (!next) {
        const ctx = getAudioCtx()
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
      }
      return next
    })
  }, [])

  // Helper to ensure context is ready
  const getReadyCtx = () => {
    const ctx = getAudioCtx()
    if (!ctx) return null
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    return ctx
  }

  // 1. Low Resonant Mystery Drone
  const playMystery = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(85, now)
      osc.frequency.exponentialRampToValueAtTime(45, now + 1.2)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(450, now)
      filter.frequency.exponentialRampToValueAtTime(140, now + 1.2)

      gain.gain.setValueAtTime(0.7, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 1.25)
    } catch (e) {}
  }, [isMuted])

  // 1.1 Big 5-Second Cinematic Loading Sound with Heartbeat Pulses & Climax Chime
  const playLoadingSound = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      // 1. 10 Rhythmic Heartbeat Pulses
      const pulseTimes = [0.0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.5, 4.0, 4.4, 4.7]
      pulseTimes.forEach((t, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        const freq = 100 + idx * 22
        osc.frequency.setValueAtTime(freq, now + t)
        osc.frequency.exponentialRampToValueAtTime(35, now + t + 0.28)

        const vol = 0.45 + (idx / pulseTimes.length) * 0.45
        g.gain.setValueAtTime(vol, now + t)
        g.gain.exponentialRampToValueAtTime(0.001, now + t + 0.28)

        osc.connect(g)
        g.connect(ctx.destination)
        osc.start(now + t)
        osc.stop(now + t + 0.3)
      })

      // 2. Rising Cosmic Sweep (70Hz -> 750Hz over 5s)
      const sweepOsc = ctx.createOscillator()
      const sweepGain = ctx.createGain()
      const sweepFilter = ctx.createBiquadFilter()

      sweepOsc.type = 'sawtooth'
      sweepOsc.frequency.setValueAtTime(70, now)
      sweepOsc.frequency.exponentialRampToValueAtTime(720, now + 4.9)

      sweepFilter.type = 'lowpass'
      sweepFilter.frequency.setValueAtTime(300, now)
      sweepFilter.frequency.exponentialRampToValueAtTime(2400, now + 4.9)

      sweepGain.gain.setValueAtTime(0.08, now)
      sweepGain.gain.linearRampToValueAtTime(0.5, now + 4.5)
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 5.0)

      sweepOsc.connect(sweepFilter)
      sweepFilter.connect(sweepGain)
      sweepGain.connect(ctx.destination)

      sweepOsc.start(now)
      sweepOsc.stop(now + 5.0)

      // 3. Climax Unlocking Chime at 4.9s
      const chimeTones = [523.25, 659.25, 783.99, 1046.5, 1318.51]
      chimeTones.forEach((freq, idx) => {
        const cOsc = ctx.createOscillator()
        const cGain = ctx.createGain()
        cOsc.type = 'triangle'
        cOsc.frequency.setValueAtTime(freq, now + 4.85 + idx * 0.04)

        cGain.gain.setValueAtTime(0.6, now + 4.85 + idx * 0.04)
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 4.85 + idx * 0.04 + 0.8)

        cOsc.connect(cGain)
        cGain.connect(ctx.destination)

        cOsc.start(now + 4.85 + idx * 0.04)
        cOsc.stop(now + 4.85 + idx * 0.04 + 0.85)
      })
    } catch (e) {}
  }, [isMuted])

  // 1.2 Interactive Progress Bar Loading Tick
  const playProgressBarTick = useCallback((progressPercent = 50) => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const freq = 450 + (progressPercent / 100) * 700
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.05)

      gain.gain.setValueAtTime(0.24, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.05)
    } catch (e) {}
  }, [isMuted])

  // 2. Shock Boom Impact
  const playBoom = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.9)

      gain.gain.setValueAtTime(1.0, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.9)

      // Punch noise
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
      noiseFilter.frequency.setValueAtTime(980, now)
      noiseFilter.frequency.exponentialRampToValueAtTime(120, now + 0.4)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.7, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      noise.start(now)
    } catch (e) {}
  }, [isMuted])

  // 3. Magical Sparkle Chimes
  const playMagic = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.07)

        gain.gain.setValueAtTime(0, now + idx * 0.07)
        gain.gain.linearRampToValueAtTime(0.42, now + idx * 0.07 + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.65)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.07)
        osc.stop(now + idx * 0.07 + 0.7)
      })
    } catch (e) {}
  }, [isMuted])

  // 4. Emotional Piano Chord for Marathi Letter
  const playEmotionalChord = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const freqs = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25]
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, now + i * 0.06)

        gain.gain.setValueAtTime(0.4, now + i * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + i * 0.06)
        osc.stop(now + 3.3)
      })
    } catch (e) {}
  }, [isMuted])

  // 5. Dynamic Mechanical Tick for Wheel
  const playDynamicTick = useCallback((pitchMultiplier = 1, volume = 0.3) => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const baseFreq = 980 * pitchMultiplier
      osc.frequency.setValueAtTime(baseFreq, now)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + 0.04)

      gain.gain.setValueAtTime(Math.min(0.55, volume * 1.3), now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch (e) {}
  }, [isMuted])

  // 6. Funny Record Scratch
  const playScratch = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const bufferSize = ctx.sampleRate * 0.35
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI * 8)
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.playbackRate.setValueAtTime(1.8, now)
      noise.playbackRate.exponentialRampToValueAtTime(0.2, now + 0.32)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.55, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35)

      noise.connect(gain)
      gain.connect(ctx.destination)
      noise.start(now)
    } catch (e) {}
  }, [isMuted])

  // 7. Pop / Button Tap
  const playPop = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(680, now)
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.07)

      gain.gain.setValueAtTime(0.42, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.07)
    } catch (e) {}
  }, [isMuted])

  // 8. Broken Screen / Glass Shatter Sound
  const playGlassShatter = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const bufferSize = ctx.sampleRate * 0.75
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.09))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.setValueAtTime(1900, now)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(1.0, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75)

      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start(now)

      const shardTones = [2800, 3400, 4200, 5100, 6800]
      shardTones.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq + Math.random() * 200, now + idx * 0.02)
        osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + idx * 0.02 + 0.4)

        g.gain.setValueAtTime(0.35, now + idx * 0.02)
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.02 + 0.4)

        osc.connect(g)
        g.connect(ctx.destination)
        osc.start(now + idx * 0.02)
        osc.stop(now + idx * 0.02 + 0.45)
      })

      const sub = ctx.createOscillator()
      const subGain = ctx.createGain()
      sub.type = 'sine'
      sub.frequency.setValueAtTime(240, now)
      sub.frequency.exponentialRampToValueAtTime(30, now + 0.55)

      subGain.gain.setValueAtTime(0.9, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55)

      sub.connect(subGain)
      subGain.connect(ctx.destination)
      sub.start(now)
      sub.stop(now + 0.55)
    } catch (e) {}
  }, [isMuted])

  // 9. Electric Glitch Shock Sound
  const playGlitchShock = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(100, now)
      osc.frequency.setValueAtTime(850, now + 0.05)
      osc.frequency.setValueAtTime(150, now + 0.1)
      osc.frequency.setValueAtTime(1300, now + 0.15)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5)

      gain.gain.setValueAtTime(0.75, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.5)
    } catch (e) {}
  }, [isMuted])

  // 10. Funny Boing (Cartoony spring effect)
  const playFunnyBoing = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.28)

      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(30, now)
      lfoGain.gain.setValueAtTime(40, now)
      lfo.connect(osc.frequency)
      lfo.start(now)
      lfo.stop(now + 0.4)

      gain.gain.setValueAtTime(0.52, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.4)
    } catch (e) {}
  }, [isMuted])

  // 11. Funny Quack / Honk
  const playFunnyQuack = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(340, now)
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.22)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(780, now)
      filter.Q.setValueAtTime(6, now)

      gain.gain.setValueAtTime(0.48, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)
    } catch (e) {}
  }, [isMuted])

  // 12. Funny Airhorn
  const playAirhorn = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const freqs = [466.16, 587.33, 700.0] // Bb4, D5, F5
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(freq, now)

        gain.gain.setValueAtTime(0.32, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.35)
      })
    } catch (e) {}
  }, [isMuted])

  // 13. Funny Laugh Sound (Hehe-Haha-Haaa!)
  const playFunnyLaugh = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const chuckleNotes = [
        { f: 400, time: 0.0, dur: 0.11, pitchEnd: 330 },
        { f: 460, time: 0.12, dur: 0.11, pitchEnd: 380 },
        { f: 510, time: 0.24, dur: 0.12, pitchEnd: 420 },
        { f: 560, time: 0.37, dur: 0.13, pitchEnd: 450 },
        { f: 440, time: 0.51, dur: 0.22, pitchEnd: 270 },
      ]

      chuckleNotes.forEach(({ f, time, dur, pitchEnd }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(f, now + time)
        osc.frequency.exponentialRampToValueAtTime(pitchEnd, now + time + dur)

        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(1050, now + time)
        filter.Q.setValueAtTime(4.5, now + time)

        gain.gain.setValueAtTime(0, now + time)
        gain.gain.linearRampToValueAtTime(0.48, now + time + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + time)
        osc.stop(now + time + dur + 0.02)
      })
    } catch (e) {}
  }, [isMuted])

  // 13.1 Funny Smile / Happy Bubbly Sound
  const playFunnySmile = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const smileNotes = [523.25, 659.25, 783.99, 1046.50]
      smileNotes.forEach((f, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(f, now + idx * 0.08)
        osc.frequency.exponentialRampToValueAtTime(f * 1.25, now + idx * 0.08 + 0.15)

        g.gain.setValueAtTime(0.4, now + idx * 0.08)
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.18)

        osc.connect(g)
        g.connect(ctx.destination)
        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.2)
      })
    } catch (e) {}
  }, [isMuted])

  // 14. Epic Spinner WIN Celebration Sound (Slot Jackpot & Victory Brass)
  const playWinCelebration = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      // 1. Victory Brass Arpeggio (C5 -> E5 -> G5 -> C6)
      const fanfareTones = [
        { f: 523.25, t: 0.0, d: 0.22 },
        { f: 659.25, t: 0.18, d: 0.22 },
        { f: 783.99, t: 0.36, d: 0.28 },
        { f: 1046.5, t: 0.55, d: 1.3 },
        { f: 1318.51, t: 0.55, d: 1.3 }, // Harmony 3rd
      ]

      fanfareTones.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, now + t)

        g.gain.setValueAtTime(0, now + t)
        g.gain.linearRampToValueAtTime(0.55, now + t + 0.03)
        g.gain.exponentialRampToValueAtTime(0.001, now + t + d)

        osc.connect(g)
        g.connect(ctx.destination)
        osc.start(now + t)
        osc.stop(now + t + d + 0.05)
      })

      // 2. Cascade of winning jackpot coins
      for (let i = 0; i < 8; i++) {
        const coinOsc = ctx.createOscillator()
        const coinGain = ctx.createGain()
        coinOsc.type = 'sine'
        const cFreq = 1200 + (i % 3) * 350 + Math.random() * 200
        const cTime = 0.6 + i * 0.09
        coinOsc.frequency.setValueAtTime(cFreq, now + cTime)
        coinOsc.frequency.exponentialRampToValueAtTime(cFreq * 1.5, now + cTime + 0.12)

        coinGain.gain.setValueAtTime(0.4, now + cTime)
        coinGain.gain.exponentialRampToValueAtTime(0.001, now + cTime + 0.15)

        coinOsc.connect(coinGain)
        coinGain.connect(ctx.destination)
        coinOsc.start(now + cTime)
        coinOsc.stop(now + cTime + 0.16)
      }

      // 3. Sub Impact Thud
      const sub = ctx.createOscillator()
      const subGain = ctx.createGain()
      sub.type = 'sine'
      sub.frequency.setValueAtTime(170, now)
      sub.frequency.exponentialRampToValueAtTime(35, now + 0.8)

      subGain.gain.setValueAtTime(0.8, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

      sub.connect(subGain)
      subGain.connect(ctx.destination)
      sub.start(now)
      sub.stop(now + 0.8)
    } catch (e) {}
  }, [isMuted])

  // 15. Random Funny Click Sound
  const playFunnyClick = useCallback(() => {
    const sounds = [playFunnyLaugh, playFunnySmile, playFunnyBoing, playFunnyQuack, playPop, playAirhorn]
    const chosen = sounds[Math.floor(Math.random() * sounds.length)]
    chosen()
  }, [playFunnyLaugh, playFunnySmile, playFunnyBoing, playFunnyQuack, playPop, playAirhorn])

  // 16. Loud Celebration Birthday Fanfare
  const playFanfare = useCallback(() => {
    if (isMuted) return
    const ctx = getReadyCtx()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const notes = [
        { f: 261.63, d: 0.25, t: 0.0 },
        { f: 261.63, d: 0.25, t: 0.28 },
        { f: 293.66, d: 0.45, t: 0.55 },
        { f: 261.63, d: 0.45, t: 1.02 },
        { f: 349.23, d: 0.45, t: 1.48 },
        { f: 329.63, d: 0.75, t: 1.95 },
        // Part 2
        { f: 261.63, d: 0.25, t: 2.75 },
        { f: 261.63, d: 0.25, t: 3.02 },
        { f: 293.66, d: 0.45, t: 3.3 },
        { f: 261.63, d: 0.45, t: 3.75 },
        { f: 392.00, d: 0.45, t: 4.22 },
        { f: 349.23, d: 0.85, t: 4.68 },
        // Grand Harmony Chords
        { f: 523.25, d: 1.5, t: 5.55 },
        { f: 659.25, d: 1.5, t: 5.55 },
        { f: 783.99, d: 1.5, t: 5.55 },
        { f: 1046.50, d: 1.5, t: 5.55 },
      ]

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(f, now + t)

        gain.gain.setValueAtTime(0, now + t)
        gain.gain.linearRampToValueAtTime(0.48, now + t + 0.04)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + t)
        osc.stop(now + t + d + 0.05)
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
    playGlassShatter,
    playGlitchShock,
    playFunnyBoing,
    playFunnyQuack,
    playAirhorn,
    playFunnyLaugh,
    playFunnySmile,
    playFunnyClick,
    playLoadingSound,
    playProgressBarTick,
    playWinCelebration,
    playFanfare,
  }
}
