import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeSpaceCanvas() {
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
    camera.position.set(0, 2.0, 10)

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // 3. Cinematic Space Lighting (Blue & Night Palette)
    const ambientLight = new THREE.AmbientLight(0x0a1945, 2.0)
    scene.add(ambientLight)

    // Cosmic Cyan Rim Light
    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 2.8)
    cyanLight.position.set(8, 6, -5)
    scene.add(cyanLight)

    // Deep Royal Blue Key Light
    const blueKeyLight = new THREE.DirectionalLight(0x3b82f6, 2.2)
    blueKeyLight.position.set(-6, 8, 6)
    scene.add(blueKeyLight)

    // Warm Gold Candle Point Light
    const candleLight = new THREE.PointLight(0xffbe3b, 4.0, 14, 1.2)
    candleLight.position.set(0, 3.2, 0)
    scene.add(candleLight)

    // 4. 🌌 3D DEEP SPACE NIGHT STARFIELD (1,500 Star Points with Depth)
    const starCount = 1500
    const starGeo = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    const palette = [
      new THREE.Color(0x60a5fa), // Light Blue
      new THREE.Color(0x38bdf8), // Sky Cyan
      new THREE.Color(0x93c5fd), // Soft Blue
      new THREE.Color(0xffffff), // Pure White
      new THREE.Color(0x818cf8), // Indigo Blue
      new THREE.Color(0xfde047), // Gold Starlight
    ]

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      starPositions[idx] = (Math.random() - 0.5) * 80
      starPositions[idx + 1] = (Math.random() - 0.5) * 60
      starPositions[idx + 2] = (Math.random() - 0.5) * 60 - 10

      const color = palette[Math.floor(Math.random() * palette.length)]
      starColors[idx] = color.r
      starColors[idx + 1] = color.g
      starColors[idx + 2] = color.b
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })

    const starField = new THREE.Points(starGeo, starMaterial)
    scene.add(starField)

    // 5. 🪐 3D CELESTIAL BLUE NIGHT PLANET WITH ATMOSPHERE
    const planetGroup = new THREE.Group()
    planetGroup.position.set(8.5, 4.5, -18)
    scene.add(planetGroup)

    const planetGeo = new THREE.SphereGeometry(3.2, 48, 48)
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Deep Sapphire Ocean
      roughness: 0.4,
      metalness: 0.25,
      emissive: 0x0f172a,
    })
    const planetMesh = new THREE.Mesh(planetGeo, planetMat)
    planetGroup.add(planetMesh)

    // Atmospheric Glow Halo
    const atmosphereGeo = new THREE.SphereGeometry(3.45, 32, 32)
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat)
    planetGroup.add(atmosphereMesh)

    // Planet Rings (Cosmic Ice Rings)
    const ringGeo = new THREE.RingGeometry(4.2, 5.8, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const planetRing = new THREE.Mesh(ringGeo, ringMat)
    planetRing.rotation.x = Math.PI / 2.4
    planetRing.rotation.y = Math.PI / 8
    planetGroup.add(planetRing)

    // 6. 🌠 SHOOTING STARS / COMETS (Streaking across the night sky)
    const shootingStars = []
    for (let i = 0; i < 3; i++) {
      const cometGeo = new THREE.BufferGeometry()
      const cometPositions = new Float32Array([0, 0, 0, -2.5, 1.8, 0])
      cometGeo.setAttribute('position', new THREE.BufferAttribute(cometPositions, 3))
      const cometMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      })
      const comet = new THREE.Line(cometGeo, cometMat)
      comet.userData = {
        active: false,
        timer: Math.random() * 4 + i * 3,
        speed: 0.45,
      }
      comet.visible = false
      scene.add(comet)
      shootingStars.push(comet)
    }

    // 7. 🎂 3D BIRTHDAY CAKE RISES IN SPACE (Blue & Gold Velvet Cosmic Cake)
    const cakeGroup = new THREE.Group()
    cakeGroup.position.set(0, -9.5, 0) // Starts deep below to execute the "Cake Rises" animation
    scene.add(cakeGroup)

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
    })

    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep Navy Obsidian
      metalness: 0.95,
      roughness: 0.12,
    })

    const tier1Material = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Midnight Sapphire
      roughness: 0.35,
      metalness: 0.2,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.15,
    })

    const tier2Material = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Celestial Blue Cream
      roughness: 0.3,
      metalness: 0.15,
      emissive: 0x0369a1,
      emissiveIntensity: 0.15,
    })

    const tier3Material = new THREE.MeshStandardMaterial({
      color: 0xf0fdf4, // Frost Vanilla Top
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
      color: 0x38bdf8, // Electric Blue Candle
      roughness: 0.3,
      metalness: 0.2,
    })

    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xfffbeb,
    })

    const flameGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.7,
    })

    // 🎂 7.1 Golden Pedestal Plate
    const plateGeo = new THREE.CylinderGeometry(2.5, 2.3, 0.18, 48)
    const plate = new THREE.Mesh(plateGeo, plateMaterial)
    plate.position.y = -0.1
    cakeGroup.add(plate)

    const plateRimGeo = new THREE.TorusGeometry(2.5, 0.07, 16, 48)
    const plateRim = new THREE.Mesh(plateRimGeo, goldMaterial)
    plateRim.rotation.x = Math.PI / 2
    plateRim.position.y = 0
    cakeGroup.add(plateRim)

    // 🎂 7.2 Tier 1 (Base Tier - Midnight Sapphire)
    const tier1Geo = new THREE.CylinderGeometry(2.1, 2.1, 0.95, 48)
    const tier1 = new THREE.Mesh(tier1Geo, tier1Material)
    tier1.position.y = 0.48
    cakeGroup.add(tier1)

    const ring1Geo = new THREE.TorusGeometry(2.12, 0.06, 16, 48)
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial)
    ring1.rotation.x = Math.PI / 2
    ring1.position.y = 0.95
    cakeGroup.add(ring1)

    // Tier 1 Gold Pearls
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.08, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMaterial)
      pearl.position.set(Math.cos(angle) * 2.1, 0.96, Math.sin(angle) * 2.1)
      cakeGroup.add(pearl)
    }

    // 🎂 7.3 Tier 2 (Middle Tier - Celestial Blue)
    const tier2Geo = new THREE.CylinderGeometry(1.5, 1.5, 0.85, 48)
    const tier2 = new THREE.Mesh(tier2Geo, tier2Material)
    tier2.position.y = 1.38
    cakeGroup.add(tier2)

    const ring2Geo = new THREE.TorusGeometry(1.52, 0.05, 16, 48)
    const ring2 = new THREE.Mesh(ring2Geo, goldMaterial)
    ring2.rotation.x = Math.PI / 2
    ring2.position.y = 1.8
    cakeGroup.add(ring2)

    // Tier 2 Gold Pearls
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.075, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMaterial)
      pearl.position.set(Math.cos(angle) * 1.5, 1.81, Math.sin(angle) * 1.5)
      cakeGroup.add(pearl)
    }

    // 🎂 7.4 Tier 3 (Top Tier - Frost Vanilla)
    const tier3Geo = new THREE.CylinderGeometry(0.95, 0.95, 0.75, 48)
    const tier3 = new THREE.Mesh(tier3Geo, tier3Material)
    tier3.position.y = 2.18
    cakeGroup.add(tier3)

    const ring3Geo = new THREE.TorusGeometry(0.97, 0.05, 16, 48)
    const ring3 = new THREE.Mesh(ring3Geo, goldMaterial)
    ring3.rotation.x = Math.PI / 2
    ring3.position.y = 2.55
    cakeGroup.add(ring3)

    // 🎂 7.5 Candle & Flickering 3D Flame
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.65, 24)
    const candle = new THREE.Mesh(candleGeo, candleWaxMaterial)
    candle.position.y = 2.88
    cakeGroup.add(candle)

    const spiralGeo = new THREE.TorusGeometry(0.09, 0.02, 8, 24)
    const spiral = new THREE.Mesh(spiralGeo, goldMaterial)
    spiral.rotation.x = Math.PI / 2.3
    spiral.position.y = 2.88
    cakeGroup.add(spiral)

    const flameGeo = new THREE.ConeGeometry(0.07, 0.22, 16)
    const flame = new THREE.Mesh(flameGeo, flameMaterial)
    flame.position.y = 3.32
    cakeGroup.add(flame)

    const flameGlowGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const flameGlow = new THREE.Mesh(flameGlowGeo, flameGlowMaterial)
    flameGlow.position.y = 3.32
    flameGlow.scale.set(1, 1.5, 1)
    cakeGroup.add(flameGlow)

    // 🎂 7.6 Orbiting 3D Cosmic Stardust Particles
    const starCountOrbit = 40
    const starsGroup = new THREE.Group()
    cakeGroup.add(starsGroup)

    const diamondGeo = new THREE.OctahedronGeometry(0.065, 0)
    const stardustColors = [0x38bdf8, 0xfde047, 0x60a5fa, 0xffffff]

    for (let i = 0; i < starCountOrbit; i++) {
      const sMat = new THREE.MeshBasicMaterial({
        color: stardustColors[i % stardustColors.length],
      })
      const star = new THREE.Mesh(diamondGeo, sMat)
      const radius = 2.2 + Math.random() * 1.6
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

    // 8. Interactive Mouse & Mobile Touch Parallax
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

    // 9. Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      if (window.innerWidth < 640) {
        camera.position.z = 11.5
        camera.position.y = 1.8
        planetGroup.position.set(4.5, 5.0, -18)
      } else {
        camera.position.z = 10.0
        camera.position.y = 2.0
        planetGroup.position.set(8.5, 4.5, -18)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // 10. Animation Loop
    let animationFrameId
    const startTime = performance.now()
    const targetY = -1.2

    const animate = () => {
      const now = performance.now()
      const elapsed = (now - startTime) / 1000

      // 10.1 "3D Cake Rises" Easing
      if (cakeGroup.position.y < targetY) {
        cakeGroup.position.y += (targetY - cakeGroup.position.y) * 0.024
      }

      // 10.2 Gentle Floating Breathing Bobbing
      const floatY = Math.sin(elapsed * 1.6) * 0.12
      cakeGroup.position.y = Math.max(cakeGroup.position.y, targetY) + floatY * 0.01

      // 10.3 Continuous 3D Cake Rotation
      cakeGroup.rotation.y += 0.0055

      // 10.4 Starfield & Planet Slow Cosmic Orbit
      starField.rotation.y += 0.0004
      starField.rotation.x += 0.0002
      planetMesh.rotation.y += 0.002
      planetRing.rotation.z += 0.001

      // 10.5 Shooting Star Animation
      shootingStars.forEach((comet) => {
        comet.userData.timer -= 0.016
        if (comet.userData.timer <= 0 && !comet.userData.active) {
          comet.userData.active = true
          comet.visible = true
          comet.position.set(
            (Math.random() - 0.5) * 30 + 10,
            Math.random() * 15 + 5,
            (Math.random() - 0.5) * 15 - 5
          )
        }
        if (comet.userData.active) {
          comet.position.x -= comet.userData.speed * 2.2
          comet.position.y -= comet.userData.speed * 1.4
          if (comet.position.y < -15 || comet.position.x < -30) {
            comet.userData.active = false
            comet.visible = false
            comet.userData.timer = Math.random() * 6 + 4
          }
        }
      })

      // 10.6 Parallax Camera & Group Tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04
      cakeGroup.rotation.x = mouse.y * 0.14
      cakeGroup.rotation.z = -mouse.x * 0.1
      starField.position.x = mouse.x * 0.8
      starField.position.y = mouse.y * 0.6

      // 10.7 Candle Flame Dynamic Light Flicker
      const flicker = Math.sin(elapsed * 18) * 0.12 + Math.cos(elapsed * 26) * 0.08
      candleLight.intensity = 4.0 + flicker * 1.5
      flame.scale.set(1 + flicker * 0.2, 1 + flicker * 0.35, 1 + flicker * 0.2)
      flameGlow.scale.set(1 + flicker * 0.25, 1.5 + flicker * 0.4, 1 + flicker * 0.25)

      // 10.8 Orbiting Star Dust Animation
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

    // 11. Cleanup
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
        opacity: 0.85,
      }}
    />
  )
}
