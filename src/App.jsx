import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioEngine } from './hooks/useAudioEngine'
import { ParticleCanvas } from './components/common/ParticleCanvas'
import { FireworksCanvas } from './components/common/FireworksCanvas'
import { SoundToggle } from './components/common/SoundToggle'
import { ProgressNav } from './components/common/ProgressNav'

import { MysteryIntro } from './components/Intro/MysteryIntro'
import { ShockReveal } from './components/Reveal/ShockReveal'
import { BirthdayReveal } from './components/Reveal/BirthdayReveal'
import { EmotionalLetter } from './components/Letter/EmotionalLetter'
import { SpinWheel } from './components/Wheel/SpinWheel'
import { GrandFinale } from './components/Finale/GrandFinale'

const TOTAL_STEPS = 6

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [unlockedSteps, setUnlockedSteps] = useState([0])
  const audioEngine = useAudioEngine()

  // Unlock next step
  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1
      setUnlockedSteps((unlocked) => {
        if (!unlocked.includes(next) && next < TOTAL_STEPS) {
          return [...unlocked, next]
        }
        return unlocked
      })
      return next < TOTAL_STEPS ? next : prev
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Jump to unlocked step
  const handleSelectStep = useCallback(
    (stepIndex) => {
      if (unlockedSteps.includes(stepIndex)) {
        setCurrentStep(stepIndex)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [unlockedSteps]
  )

  const handleRestart = useCallback(() => {
    setCurrentStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Auto-scroll on step transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-center items-center overflow-x-hidden">
      {/* Background Ambience */}
      <ParticleCanvas speed={0.8} density={50} />
      <FireworksCanvas active={currentStep === 2 || currentStep === 5} />

      {/* Persistent Audio Controls */}
      <SoundToggle isMuted={audioEngine.isMuted} onToggle={audioEngine.toggleMute} />

      {/* Screen Router with cinematic slide/fade transitions */}
      <div className="relative w-full z-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.section
              key="step-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="w-full"
            >
              <MysteryIntro onNext={handleNextStep} audioEngine={audioEngine} />
            </motion.section>
          )}

          {currentStep === 1 && (
            <motion.section
              key="step-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ShockReveal onNext={handleNextStep} audioEngine={audioEngine} />
            </motion.section>
          )}

          {currentStep === 2 && (
            <motion.section
              key="step-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <BirthdayReveal onNext={handleNextStep} audioEngine={audioEngine} />
            </motion.section>
          )}

          {currentStep === 3 && (
            <motion.section
              key="step-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <EmotionalLetter onNext={handleNextStep} audioEngine={audioEngine} />
            </motion.section>
          )}

          {currentStep === 4 && (
            <motion.section
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SpinWheel onNext={handleNextStep} audioEngine={audioEngine} />
            </motion.section>
          )}

          {currentStep === 5 && (
            <motion.section
              key="step-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <GrandFinale onRestart={handleRestart} audioEngine={audioEngine} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Story Progress Indicator */}
      {currentStep > 0 && (
        <ProgressNav
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          unlockedSteps={unlockedSteps}
          onSelectStep={handleSelectStep}
        />
      )}
    </main>
  )
}
