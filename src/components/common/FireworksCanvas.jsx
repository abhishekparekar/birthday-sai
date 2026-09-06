import { useEffect, useRef } from 'react'

export function FireworksCanvas({ active = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const particles = []
    const colors = ['#EC4899', '#7C3AED', '#FBBF24', '#22D3EE', '#34D399', '#F43F5E', '#FFFFFF']

    const createFirework = (x, y) => {
      const count = 60 + Math.floor(Math.random() * 40)
      const baseColor = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2
        const speed = Math.random() * 5 + 2
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: Math.random() > 0.3 ? baseColor : '#FFFFFF',
          size: Math.random() * 2.5 + 1.5,
          gravity: 0.06,
        })
      }
    }

    let timer = 0
    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'
      ctx.fillRect(0, 0, width, height)

      timer++
      if (timer % 35 === 0) {
        const targetX = Math.random() * (width * 0.8) + width * 0.1
        const targetY = Math.random() * (height * 0.5) + height * 0.1
        createFirework(targetX, targetY)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.98
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
    />
  )
}
