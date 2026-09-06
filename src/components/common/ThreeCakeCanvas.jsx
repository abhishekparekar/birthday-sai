import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeCakeCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene & Camera setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2.5, 9)

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 3. Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0x2a164d, 1.8)
    scene.add(ambientLight)

    // Warm Gold Candle Point Light
    const candleLight = new THREE.PointLight(0xffb84d, 3.5, 12, 1.2)
    candleLight.position.set(0, 3.2, 0)
    scene.add(candleLight)

    // Pink / Purple Rim Light
    const rimLight1 = new THREE.DirectionalLight(0xec4899, 2.2)
    rimLight1.position.set(5, 5, -4)
    scene.add(rimLight1)

    // Cyan / Gold Key Light
    const keyLight = new THREE.DirectionalLight(0xfbbf24, 2.0)
    keyLight.position.set(-4, 6, 5)
    scene.add(keyLight)

    // 4. Cake Group Hierarchy (Grand 3D Birthday Cake)
    const cakeGroup = new THREE.Group()
    cakeGroup.position.set(0, -9, 0) // Starts deep below to perform the "Cake Rises" cinematic entrance
    scene.add(cakeGroup)

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    })

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1035,
      metalness: 0.9,
      roughness: 0.15,
    })

    const tier1Material = new THREE.MeshStandardMaterial({
      color: 0x831843, // Deep Velvet Rose
      roughness: 0.35,
      metalness: 0.15,
    })

    const tier2Material = new THREE.MeshStandardMaterial({
      color: 0xdb2777, // Vibrant Rose Cream
      roughness: 0.3,
      metalness: 0.1,
    })

    const tier3Material = new THREE.MeshStandardMaterial({
      color: 0xfdf2f8, // Vanilla Icing Top
      roughness: 0.2,
      metalness: 0.05,
    })

    const creamMaterial = new THREE.MeshStandardMaterial({
      color: 0xfde047, // Golden Cream Swirls
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xca8a04,
      emissiveIntensity: 0.3,
    })

    const candleWaxMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.3,
      metalness: 0.2,
    })

    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
    })

    const flameGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.65,
    })

    // 🎂 4.1 Golden Pedestal Plate
    const plateGeo = new THREE.CylinderGeometry(2.5, 2.3, 0.18, 48)
    const plate = new THREE.Mesh(plateGeo, plateMaterial)
    plate.position.y = -0.1
    cakeGroup.add(plate)

    const plateRimGeo = new THREE.TorusGeometry(2.5, 0.07, 16, 48)
    const plateRim = new THREE.Mesh(plateRimGeo, goldMaterial)
    plateRim.rotation.x = Math.PI / 2
    plateRim.position.y = 0
    cakeGroup.add(plateRim)

    // 🎂 4.2 Tier 1 (Base Tier - Velvet Rose)
    const tier1Geo = new THREE.CylinderGeometry(2.1, 2.1, 0.95, 48)
    const tier1 = new THREE.Mesh(tier1Geo, tier1Material)
    tier1.position.y = 0.48
    cakeGroup.add(tier1)

    const ring1Geo = new THREE.TorusGeometry(2.12, 0.06, 16, 48)
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial)
    ring1.rotation.x = Math.PI / 2
    ring1.position.y = 0.95
    cakeGroup.add(ring1)

    // Tier 1 Cream Pearls
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.08, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMaterial)
      pearl.position.set(Math.cos(angle) * 2.1, 0.96, Math.sin(angle) * 2.1)
      cakeGroup.add(pearl)
    }

    // 🎂 4.3 Tier 2 (Middle Tier - Rose Cream)
    const tier2Geo = new THREE.CylinderGeometry(1.5, 1.5, 0.85, 48)
    const tier2 = new THREE.Mesh(tier2Geo, tier2Material)
    tier2.position.y = 1.38
    cakeGroup.add(tier2)

    const ring2Geo = new THREE.TorusGeometry(1.52, 0.05, 16, 48)
    const ring2 = new THREE.Mesh(ring2Geo, goldMaterial)
    ring2.rotation.x = Math.PI / 2
    ring2.position.y = 1.8
    cakeGroup.add(ring2)

    // Tier 2 Cream Pearls
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.075, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMaterial)
      pearl.position.set(Math.cos(angle) * 1.5, 1.81, Math.sin(angle) * 1.5)
      cakeGroup.add(pearl)
    }

    // 🎂 4.4 Tier 3 (Top Tier - Vanilla White)
    const tier3Geo = new THREE.CylinderGeometry(0.95, 0.95, 0.75, 48)
    const tier3 = new THREE.Mesh(tier3Geo, tier3Material)
    tier3.position.y = 2.18
    cakeGroup.add(tier3)

    const ring3Geo = new THREE.TorusGeometry(0.97, 0.05, 16, 48)
    const ring3 = new THREE.Mesh(ring3Geo, goldMaterial)
    ring3.rotation.x = Math.PI / 2
    ring3.position.y = 2.55
    cakeGroup.add(ring3)

    // 🎂 4.5 Celebration Candle & Flickering 3D Flame
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.65, 24)
    const candle = new THREE.Mesh(candleGeo, candleWaxMaterial)
    candle.position.y = 2.88
    cakeGroup.add(candle)

    // Candle Gold Spiral Stripe
    const spiralGeo = new THREE.TorusGeometry(0.09, 0.02, 8, 24)
    const spiral = new THREE.Mesh(spiralGeo, goldMaterial)
    spiral.rotation.x = Math.PI / 2.3
    spiral.position.y = 2.88
    cakeGroup.add(spiral)

    // 3D Inner Flame
    const flameGeo = new THREE.ConeGeometry(0.07, 0.22, 16)
    const flame = new THREE.Mesh(flameGeo, flameMaterial)
    flame.position.y = 3.32
    cakeGroup.add(flame)

    // 3D Outer Flame Glow
    const flameGlowGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const flameGlow = new THREE.Mesh(flameGlowGeo, flameGlowMaterial)
    flameGlow.position.y = 3.32
    flameGlow.scale.set(1, 1.5, 1)
    cakeGroup.add(flameGlow)

    // 🎂 4.6 Orbiting 3D Golden Star Dust Particles
    const starCount = 35
    const starsGroup = new THREE.Group()
    cakeGroup.add(starsGroup)

    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
    })

    const diamondGeo = new THREE.OctahedronGeometry(0.06, 0)
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(diamondGeo, starMaterial)
      const radius = 2.2 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const yPos = Math.random() * 3.5
      star.position.set(Math.cos(theta) * radius, yPos, Math.sin(theta) * radius)
      star.userData = {
        radius,
        angle: theta,
        speed: (Math.random() * 0.015 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        yBase: yPos,
      }
      starsGroup.add(star)
    }

    // 5. Mouse Parallax interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5
        mouse.targetY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 1.5
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    // 6. Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Adjust camera distance for mobile vs desktop
      if (window.innerWidth < 640) {
        camera.position.z = 11.5
        camera.position.y = 2.0
      } else {
        camera.position.z = 9.0
        camera.position.y = 2.5
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // 7. Animation Loop with "3D Cake Rises" Easing
    let animationFrameId
    const startTime = performance.now()
    const targetY = -1.2 // Target resting position

    const animate = () => {
      const now = performance.now()
      const elapsed = (now - startTime) / 1000

      // 7.1 "3D Cake Rises" Entrance Easing (Majestic slow rise over 3.5s)
      if (cakeGroup.position.y < targetY) {
        cakeGroup.position.y += (targetY - cakeGroup.position.y) * 0.022
      }

      // 7.2 Gentle Floating Breathing Bobbing
      const floatY = Math.sin(elapsed * 1.6) * 0.12
      cakeGroup.position.y = Math.max(cakeGroup.position.y, targetY) + floatY * 0.01

      // 7.3 Continuous Slow 3D Rotation
      cakeGroup.rotation.y += 0.0055

      // 7.4 Mouse Parallax Smooth Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05
      cakeGroup.rotation.x = mouse.y * 0.15
      cakeGroup.rotation.z = -mouse.x * 0.1

      // 7.5 Candle Flame Dynamic Light & Scale Flicker
      const flicker = Math.sin(elapsed * 18) * 0.12 + Math.cos(elapsed * 26) * 0.08
      candleLight.intensity = 3.5 + flicker * 1.5
      flame.scale.set(1 + flicker * 0.2, 1 + flicker * 0.35, 1 + flicker * 0.2)
      flameGlow.scale.set(1 + flicker * 0.25, 1.5 + flicker * 0.4, 1 + flicker * 0.25)

      // 7.6 Orbiting Star Dust Animation
      starsGroup.children.forEach((star) => {
        star.userData.angle += star.userData.speed
        star.position.x = Math.cos(star.userData.angle) * star.userData.radius
        star.position.z = Math.sin(star.userData.angle) * star.userData.radius
        star.position.y = star.userData.yBase + Math.sin(elapsed * 2 + star.userData.radius) * 0.15
        star.rotation.x += 0.02
        star.rotation.y += 0.03
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.75,
      }}
    />
  )
}
