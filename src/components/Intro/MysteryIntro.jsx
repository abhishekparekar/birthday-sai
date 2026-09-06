import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Crown, ArrowRight, Heart, Star } from 'lucide-react'
import saiImg from '../../assets/sai3.jpeg'

export function MysteryIntro({ onNext, audioEngine }) {
  const handleContinue = () => {
    if (audioEngine) {
      audioEngine.enableAudio()
      audioEngine.playFunnyClick()
      audioEngine.playMagic()
    }

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.65 },
      colors: ['#FBBF24', '#EC4899', '#38BDF8', '#C084FC', '#FFFFFF'],
    })

    onNext()
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-10 sm:py-14 select-none overflow-hidden">
      {/* Ambient Celestial Nebula Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-700/25 blur-[150px] pointer-events-none -top-24 -left-24 animate-pulse-glow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[150px] pointer-events-none -bottom-24 -right-24 animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/15 blur-[130px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* 2-Column Responsive Grand Layout */}
      <div className="max-w-6xl w-full z-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center">
        {/* LEFT SIDE: Grand High-Definition Full Portrait Picture of Sai */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center order-1 md:order-1 w-full"
        >
          <div className="relative group w-full max-w-[320px] sm:max-w-[420px] md:max-w-[460px]">
            {/* Animated Radiant Aura Glow behind Image */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-400 rounded-3xl sm:rounded-[36px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

            {/* Floating Glassmorphism Photo Container */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl sm:rounded-[36px] p-3 sm:p-4 md:p-5 glass-panel border-2 border-amber-400/60 shadow-2xl glow-gold overflow-hidden w-full"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl sm:rounded-[28px] overflow-hidden bg-zinc-950 border border-amber-400/40 shadow-inner">
                <img
                  src={saiImg}
                  alt="Birthday Star Sai"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Rich Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-4 flex items-center justify-between">
                  <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/85 backdrop-blur-md text-xs sm:text-sm font-bold text-amber-300 border border-amber-400/50 flex items-center gap-2 shadow-lg">
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Birthday Hero • Sai</span>
                  </span>
                  <span className="text-base sm:text-lg">👑✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Beautiful Marathi Birthday Wishes & Action Button */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 sm:space-y-7 text-center md:text-left order-2 md:order-2 flex flex-col justify-center"
        >
          {/* Tagline Badge */}
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel text-xs sm:text-sm tracking-widest text-amber-300 border border-amber-500/40 glow-gold shadow-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-bold">७ सप्टेंबर • खास वाढदिवस विशेष 🌟</span>
            </div>
          </div>

          {/* Grand Marathi Birthday Heading */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-pink-200 to-amber-300 leading-tight drop-shadow-lg tracking-wide"
            >
              वाढदिवसाच्या मनःपूर्वक शुभेच्छा!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black font-cinzel-decor text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 text-glow-gold drop-shadow-2xl"
            >
              Sai 🎂❤️
            </motion.div>
          </div>

          {/* Heartfelt Marathi Wishes Paragraphs */}
          <div className="space-y-3.5 text-zinc-100 text-base sm:text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-medium text-pink-300 text-glow-pink"
            >
              आजचा हा सुवर्ण क्षण आणि खास दिवस केवळ तुझ्यासाठी! ✨
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-zinc-200 font-light border-l-2 border-amber-400/50 pl-4 py-1 bg-white/[0.03] rounded-r-2xl"
            >
              आयुष्याच्या प्रत्येक वळणावर तुला सुख, समृद्धी, उदंड यश आणि निरोगी दीर्घायुष्य लाभो हीच ईश्वरचरणी मनःपूर्वक प्रार्थना! 🌸
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-zinc-300 font-light"
            >
              तुझे प्रत्येक स्वप्न सत्यात उतरो आणि तुझ्या चेहऱ्यावरील हे सुंदर हास्य सदैव असेच राहो! 🌟
            </motion.p>
          </div>

          {/* 🌟 SIMPLE & PROPER LUXURY CONTINUE BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, type: 'spring' }}
            className="pt-2 flex justify-center md:justify-start"
          >
            <button
              onClick={handleContinue}
              onMouseEnter={() => audioEngine && audioEngine.playPop()}
              className="group relative inline-flex items-center gap-3.5 px-9 sm:px-11 py-4 sm:py-4.5 rounded-2xl btn-luxury-gold font-black text-white text-base sm:text-lg shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95 glow-gold"
            >
              <span className="relative z-10 flex items-center gap-3 text-glow-gold">
                <span>CONTINUE TO CELEBRATION</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
