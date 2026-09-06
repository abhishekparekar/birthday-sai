import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeSpaceCanvas({ currentStep = 0, isLoading = false }) {
  const containerRef = useRef(null)
  const stepRef = useRef(currentStep)
  const loadingRef = useRef(isLoading)

  useEffect(() => {
    stepRef.current = currentStep
  }, [currentStep])

  useEffect(() => {
    loadingRef.current = isLoading
  }, [isLoading])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 25)

    // 2. WebGL Renderer with High-Performance Settings
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

    // 3. Cinematic Universe Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1538, 2.2)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xfbbf24, 4.5, 60, 1.2)
    sunLight.position.set(-25, 12, -15)
    scene.add(sunLight)

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.5)
    cyanRimLight.position.set(15, 10, -10)
    scene.add(cyanRimLight)

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 2.0)
    purpleLight.position.set(-10, -8, 5)
    scene.add(purpleLight)

    // 4. 🌌 SCENE 01 & 02: DEEP SPACE & GALAXY STARFIELD (2,000 Multi-depth Stars + Nebula Dust)
    const starCount = 2000
    const starGeo = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    const starPalette = [
      new THREE.Color(0x38bdf8), // Cyan Blue
      new THREE.Color(0x60a5fa), // Royal Sky
      new THREE.Color(0x93c5fd), // Soft Blue
      new THREE.Color(0xc084fc), // Purple Starlight
      new THREE.Color(0xfde047), // Gold Starlight
      new THREE.Color(0xffffff), // Pure White
    ]

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      starPositions[idx] = (Math.random() - 0.5) * 140
      starPositions[idx + 1] = (Math.random() - 0.5) * 100
      starPositions[idx + 2] = (Math.random() - 0.5) * 120 - 10

      const c = starPalette[Math.floor(Math.random() * starPalette.length)]
      starColors[idx] = c.r
      starColors[idx + 1] = c.g
      starColors[idx + 2] = c.b
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

    const starMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })

    const starField = new THREE.Points(starGeo, starMaterial)
    scene.add(starField)

    // 5. ☀️ SCENE 03: THE RADIANT PROCEDURAL SUN (With Corona & Flare)
    const sunGroup = new THREE.Group()
    sunGroup.position.set(-26, 12, -22)
    scene.add(sunGroup)

    const sunCoreGeo = new THREE.SphereGeometry(4.5, 48, 48)
    const sunCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
    })
    const sunMesh = new THREE.Mesh(sunCoreGeo, sunCoreMat)
    sunGroup.add(sunMesh)

    // Sun Corona Glow
    const coronaGeo = new THREE.SphereGeometry(5.4, 32, 32)
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat)
    sunGroup.add(coronaMesh)

    // Outer Solar Flare Ring
    const flareGeo = new THREE.RingGeometry(5.2, 7.8, 48)
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0xfb923c,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const flareMesh = new THREE.Mesh(flareGeo, flareMat)
    flareMesh.rotation.x = Math.PI / 3
    sunGroup.add(flareMesh)

    // 6. 🪐 SCENE 04: THE PLANETARY JOURNEY (Venus, Earth Sunrise, Saturn Rings)
    const planetsGroup = new THREE.Group()
    scene.add(planetsGroup)

    // 6.1 VENUS (Golden Orange Atmosphere)
    const venusGroup = new THREE.Group()
    venusGroup.position.set(-16, -4, -12)
    planetsGroup.add(venusGroup)

    const venusGeo = new THREE.SphereGeometry(2.2, 36, 36)
    const venusMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      metalness: 0.1,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    })
    const venusMesh = new THREE.Mesh(venusGeo, venusMat)
    venusGroup.add(venusMesh)

    // 6.2 EARTH (Blue Atmosphere & Sunrise Flare)
    const earthGroup = new THREE.Group()
    earthGroup.position.set(14, 5, -14)
    planetsGroup.add(earthGroup)

    const earthGeo = new THREE.SphereGeometry(3.0, 48, 48)
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x0284c7,
      emissiveIntensity: 0.15,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    earthGroup.add(earthMesh)

    // Earth Atmosphere Halo
    const earthAtmoGeo = new THREE.SphereGeometry(3.25, 32, 32)
    const earthAtmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
    const earthAtmo = new THREE.Mesh(earthAtmoGeo, earthAtmoMat)
    earthGroup.add(earthAtmo)

    // 6.3 SATURN & MAGNIFICENT ICE RINGS
    const saturnGroup = new THREE.Group()
    saturnGroup.position.set(-8, 9, -20)
    planetsGroup.add(saturnGroup)

    const saturnGeo = new THREE.SphereGeometry(3.4, 48, 48)
    const saturnMat = new THREE.MeshStandardMaterial({
      color: 0xa16207,
      roughness: 0.45,
      metalness: 0.2,
      emissive: 0x451a03,
      emissiveIntensity: 0.15,
    })
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat)
    saturnGroup.add(saturnMesh)

    // Saturn Giant Semi-Transparent Particle Rings
    const saturnRingGeo = new THREE.RingGeometry(4.4, 7.5, 64)
    const saturnRingMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat)
    saturnRing.rotation.x = Math.PI / 2.3
    saturnRing.rotation.y = Math.PI / 7
    saturnGroup.add(saturnRing)

    // 7. 🌙 SCENE 05: THE MOON (Detailed Lunar Sphere)
    const moonGroup = new THREE.Group()
    moonGroup.position.set(12, -6, -8)
    scene.add(moonGroup)

    const moonGeo = new THREE.SphereGeometry(2.4, 40, 40)
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
      metalness: 0.05,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    })
    const moonMesh = new THREE.Mesh(moonGeo, moonMat)
    moonGroup.add(moonMesh)

    // Moon Soft Blue Halo
    const moonHaloGeo = new THREE.SphereGeometry(2.6, 24, 24)
    const moonHaloMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
    const moonHalo = new THREE.Mesh(moonHaloGeo, moonHaloMat)
    moonGroup.add(moonHalo)

    // 8. 💖 SCENE 06: COSMIC HEART PARTICLE FORMATION (Parametric 3D Heart Curve)
    const heartGroup = new THREE.Group()
    heartGroup.position.set(0, 1.5, -4)
    scene.add(heartGroup)

    const heartParticleCount = 450
    const heartGeo = new THREE.BufferGeometry()
    const heartPositions = new Float32Array(heartParticleCount * 3)
    const heartColors = new Float32Array(heartParticleCount * 3)
    const heartBaseCoords = []

    for (let i = 0; i < heartParticleCount; i++) {
      const t = (i / heartParticleCount) * Math.PI * 2
      // 3D Mathematical Heart Formula
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.16
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.16
      const z = (Math.random() - 0.5) * 0.8

      heartBaseCoords.push({ x, y, z })
      heartPositions[i * 3] = x
      heartPositions[i * 3 + 1] = y
      heartPositions[i * 3 + 2] = z

      const hc = Math.random() > 0.4 ? new THREE.Color(0xec4899) : new THREE.Color(0xfbbf24)
      heartColors[i * 3] = hc.r
      heartColors[i * 3 + 1] = hc.g
      heartColors[i * 3 + 2] = hc.b
    }

    heartGeo.setAttribute('position', new THREE.BufferAttribute(heartPositions, 3))
    heartGeo.setAttribute('color', new THREE.BufferAttribute(heartColors, 3))

    const heartMat = new THREE.PointsMaterial({
      size: 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
    const heartMesh = new THREE.Points(heartGeo, heartMat)
    heartGroup.add(heartMesh)

    // 9. 🌀 SCENE 07: MAGICAL ROTATING ENERGY PORTAL
    const portalGroup = new THREE.Group()
    portalGroup.position.set(0, 0, -10)
    scene.add(portalGroup)

    // Outer Portal Energy Torus
    const portalRing1Geo = new THREE.TorusGeometry(3.5, 0.15, 24, 64)
    const portalRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    const portalRing1 = new THREE.Mesh(portalRing1Geo, portalRing1Mat)
    portalGroup.add(portalRing1)

    // Inner Portal Vortex Torus
    const portalRing2Geo = new THREE.TorusGeometry(2.8, 0.1, 24, 64)
    const portalRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    const portalRing2 = new THREE.Mesh(portalRing2Geo, portalRing2Mat)
    portalGroup.add(portalRing2)

    // Portal Core Flare
    const portalCoreGeo = new THREE.CircleGeometry(2.6, 32)
    const portalCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const portalCore = new THREE.Mesh(portalCoreGeo, portalCoreMat)
    portalGroup.add(portalCore)

    // 10. 🎂 SCENE 10: LUXURY 3D BIRTHDAY CAKE RISES IN COSMOS
    const cakeGroup = new THREE.Group()
    cakeGroup.position.set(0, -9.5, 1.5) // Starts deep below to execute the cinematic "Cake Rises"
    scene.add(cakeGroup)

    // Luxury Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
    })

    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.12,
    })

    const tier1Mat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Midnight Sapphire
      roughness: 0.35,
      metalness: 0.2,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.15,
    })

    const tier2Mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Celestial Blue Cream
      roughness: 0.3,
      metalness: 0.15,
      emissive: 0x0369a1,
      emissiveIntensity: 0.15,
    })

    const tier3Mat = new THREE.MeshStandardMaterial({
      color: 0xfdf2f8, // Frost White Top
      roughness: 0.2,
      metalness: 0.05,
    })

    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfde047, // Golden Cream Pearls
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xca8a04,
      emissiveIntensity: 0.3,
    })

    const candleWaxMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.2,
    })

    // Cake Pedestal Plate
    const plateGeo = new THREE.CylinderGeometry(2.5, 2.3, 0.18, 48)
    const plate = new THREE.Mesh(plateGeo, plateMat)
    plate.position.y = -0.1
    cakeGroup.add(plate)

    const plateRimGeo = new THREE.TorusGeometry(2.5, 0.07, 16, 48)
    const plateRim = new THREE.Mesh(plateRimGeo, goldMat)
    plateRim.rotation.x = Math.PI / 2
    cakeGroup.add(plateRim)

    // Tier 1 (Base - Sapphire)
    const tier1Geo = new THREE.CylinderGeometry(2.1, 2.1, 0.95, 48)
    const tier1 = new THREE.Mesh(tier1Geo, tier1Mat)
    tier1.position.y = 0.48
    cakeGroup.add(tier1)

    const ring1Geo = new THREE.TorusGeometry(2.12, 0.06, 16, 48)
    const ring1 = new THREE.Mesh(ring1Geo, goldMat)
    ring1.rotation.x = Math.PI / 2
    ring1.position.y = 0.95
    cakeGroup.add(ring1)

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.08, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMat)
      pearl.position.set(Math.cos(angle) * 2.1, 0.96, Math.sin(angle) * 2.1)
      cakeGroup.add(pearl)
    }

    // Tier 2 (Middle - Celestial Blue)
    const tier2Geo = new THREE.CylinderGeometry(1.5, 1.5, 0.85, 48)
    const tier2 = new THREE.Mesh(tier2Geo, tier2Mat)
    tier2.position.y = 1.38
    cakeGroup.add(tier2)

    const ring2Geo = new THREE.TorusGeometry(1.52, 0.05, 16, 48)
    const ring2 = new THREE.Mesh(ring2Geo, goldMat)
    ring2.rotation.x = Math.PI / 2
    ring2.position.y = 1.8
    cakeGroup.add(ring2)

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const pearlGeo = new THREE.SphereGeometry(0.075, 12, 12)
      const pearl = new THREE.Mesh(pearlGeo, creamMat)
      pearl.position.set(Math.cos(angle) * 1.5, 1.81, Math.sin(angle) * 1.5)
      cakeGroup.add(pearl)
    }

    // Tier 3 (Top - Vanilla Cream)
    const tier3Geo = new THREE.CylinderGeometry(0.95, 0.95, 0.75, 48)
    const tier3 = new THREE.Mesh(tier3Geo, tier3Mat)
    tier3.position.y = 2.18
    cakeGroup.add(tier3)

    const ring3Geo = new THREE.TorusGeometry(0.97, 0.05, 16, 48)
    const ring3 = new THREE.Mesh(ring3Geo, goldMat)
    ring3.rotation.x = Math.PI / 2
    ring3.position.y = 2.55
    cakeGroup.add(ring3)

    // Candle & Flickering 3D Flame
    const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.65, 24)
    const candle = new THREE.Mesh(candleGeo, candleWaxMat)
    candle.position.y = 2.88
    cakeGroup.add(candle)

    const spiralGeo = new THREE.TorusGeometry(0.09, 0.02, 8, 24)
    const spiral = new THREE.Mesh(spiralGeo, goldMat)
    spiral.rotation.x = Math.PI / 2.3
    spiral.position.y = 2.88
    cakeGroup.add(spiral)

    const flameGeo = new THREE.ConeGeometry(0.07, 0.22, 16)
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb })
    const flame = new THREE.Mesh(flameGeo, flameMat)
    flame.position.y = 3.32
    cakeGroup.add(flame)

    const flameGlowGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const flameGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.7,
    })
    const flameGlow = new THREE.Mesh(flameGlowGeo, flameGlowMat)
    flameGlow.position.y = 3.32
    flameGlow.scale.set(1, 1.5, 1)
    cakeGroup.add(flameGlow)

    // Orbiting 3D Stardust on Cake
    const starCountOrbit = 36
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

    // 11. 🎆 SCENE 13: 3D FIREWORKS & CELEBRATION STARBURSTS
    const fireworksCount = 300
    const fwGeo = new THREE.BufferGeometry()
    const fwPositions = new Float32Array(fireworksCount * 3)
    const fwColors = new Float32Array(fireworksCount * 3)
    const fwVelocities = []

    for (let i = 0; i < fireworksCount; i++) {
      const idx = i * 3
      fwPositions[idx] = 0
      fwPositions[idx + 1] = 6
      fwPositions[idx + 2] = -5

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const spd = Math.random() * 0.12 + 0.04
      fwVelocities.push({
        vx: Math.sin(phi) * Math.cos(theta) * spd,
        vy: Math.sin(phi) * Math.sin(theta) * spd,
        vz: Math.cos(phi) * spd,
      })

      const c = starPalette[i % starPalette.length]
      fwColors[idx] = c.r
      fwColors[idx + 1] = c.g
      fwColors[idx + 2] = c.b
    }

    fwGeo.setAttribute('position', new THREE.BufferAttribute(fwPositions, 3))
    fwGeo.setAttribute('color', new THREE.BufferAttribute(fwColors, 3))

    const fwMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const fireworksMesh = new THREE.Points(fwGeo, fwMat)
    fireworksMesh.visible = false
    scene.add(fireworksMesh)

    // 12. 🌠 SHOOTING STARS / COMETS
    const shootingStars = []
    for (let i = 0; i < 3; i++) {
      const cometGeo = new THREE.BufferGeometry()
      const cometPositions = new Float32Array([0, 0, 0, -2.8, 1.9, 0])
      cometGeo.setAttribute('position', new THREE.BufferAttribute(cometPositions, 3))
      const cometMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      })
      const comet = new THREE.Line(cometGeo, cometMat)
      comet.userData = {
        active: false,
        timer: Math.random() * 4 + i * 2.5,
        speed: 0.48,
      }
      comet.visible = false
      scene.add(comet)
      shootingStars.push(comet)
    }

    // 13. Interactive Mouse & Mobile Touch Parallax
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

    // 14. Responsive Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // 15. Continuous Cinematic Camera & Space Motion Journey Loop
    let animationFrameId
    const startTime = performance.now()
    const targetCakeY = -1.2

    // Cinematic Camera Waypoints based on story chapter:
    // 0: Deep Space & Sun Orbit (camera z: 12)
    // 1: Planetary Journey & Venus (camera z: 10)
    // 2: Saturn Rings & Earth (camera z: 9.5)
    // 3: The Moon (camera z: 9)
    // 4: Cosmic Heart (camera z: 8.5)
    // 5: Magical Portal & Cake Rises (camera z: 8.0)
    // 6: Grand Birthday Celebration Finale (camera z: 9.5)

    const animate = () => {
      const now = performance.now()
      const elapsed = (now - startTime) / 1000
      const step = stepRef.current

      // 15.1 Dynamic Cinematic Camera Interpolation across Space Journey & Warp Loading
      const isLoadingScreen = loadingRef.current
      let targetCamX = 0
      let targetCamY = 1.5
      let targetCamZ = 10.0

      if (step === 0) {
        // Grand Birthday Reveal & Cosmic Heart
        targetCamX = 0
        targetCamY = 1.4
        targetCamZ = window.innerWidth < 640 ? 9.5 : 8.0
      } else if (step === 1) {
        // Best Wishers & Planetary System
        targetCamX = -1.6
        targetCamY = 1.8
        targetCamZ = window.innerWidth < 640 ? 11.0 : 9.2
      } else if (step === 2) {
        // Marathi Blessings & The Moon
        targetCamX = 1.8
        targetCamY = 1.0
        targetCamZ = window.innerWidth < 640 ? 10.5 : 8.8
      } else if (step === 3) {
        // Grand Finale: 3D Cake Rises & Fireworks Celebration
        targetCamX = 0
        targetCamY = 2.0
        targetCamZ = window.innerWidth < 640 ? 12.0 : 10.0
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.03
      camera.position.y += (targetCamY - camera.position.y) * 0.03
      camera.position.z += (targetCamZ - camera.position.z) * 0.03

      // 15.2 🌌 Warp Starfield Motion During Loading & Cosmic Travel
      const starPosAttr = starGeo.attributes.position
      const warpSpeed = isLoadingScreen ? 0.65 : 0.08
      for (let i = 0; i < starCount; i++) {
        const zIdx = i * 3 + 2
        starPosAttr.array[zIdx] += warpSpeed
        if (starPosAttr.array[zIdx] > 26) {
          starPosAttr.array[zIdx] = -95
          starPosAttr.array[i * 3] = (Math.random() - 0.5) * 140
          starPosAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 100
        }
      }
      starPosAttr.needsUpdate = true

      // 15.3 "3D Cake Rises" Cinematic Entrance
      if (!isLoadingScreen) {
        if (cakeGroup.position.y < targetCakeY) {
          cakeGroup.position.y += (targetCakeY - cakeGroup.position.y) * 0.024
        }
        const floatY = Math.sin(elapsed * 1.6) * 0.12
        cakeGroup.position.y = Math.max(cakeGroup.position.y, targetCakeY) + floatY * 0.01
        cakeGroup.rotation.y += 0.0055
      }

      // 15.4 Cosmic Rotations
      starField.rotation.y += isLoadingScreen ? 0.002 : 0.0003
      sunMesh.rotation.y += 0.003
      coronaMesh.rotation.z += 0.002
      venusMesh.rotation.y += 0.004
      earthMesh.rotation.y += 0.005
      earthAtmo.rotation.y += 0.003
      saturnMesh.rotation.y += 0.004
      saturnRing.rotation.z += 0.0015
      moonMesh.rotation.y += 0.002

      // 15.4 Cosmic Heart Pulse & Orbit
      const heartPulse = 1 + Math.sin(elapsed * 3.5) * 0.08
      heartGroup.scale.set(heartPulse, heartPulse, heartPulse)
      heartGroup.rotation.y += 0.008

      // 15.5 Magical Energy Portal Vortex Rotation
      portalRing1.rotation.z += 0.015
      portalRing2.rotation.z -= 0.022
      portalCore.rotation.z += 0.01

      // 15.6 Shooting Star Animation
      shootingStars.forEach((comet) => {
        comet.userData.timer -= 0.016
        if (comet.userData.timer <= 0 && !comet.userData.active) {
          comet.userData.active = true
          comet.visible = true
          comet.position.set(
            (Math.random() - 0.5) * 35 + 10,
            Math.random() * 16 + 6,
            (Math.random() - 0.5) * 15 - 5
          )
        }
        if (comet.userData.active) {
          comet.position.x -= comet.userData.speed * 2.3
          comet.position.y -= comet.userData.speed * 1.4
          if (comet.position.y < -16 || comet.position.x < -35) {
            comet.userData.active = false
            comet.visible = false
            comet.userData.timer = Math.random() * 6 + 3.5
          }
        }
      })

      // 15.7 3D Fireworks Particle Burst in Grand Reveal (step 0) & Grand Finale (step 3)
      if (step === 0 || step === 3) {
        fireworksMesh.visible = true
        const posAttr = fireworksMesh.geometry.attributes.position
        for (let i = 0; i < fireworksCount; i++) {
          const idx = i * 3
          posAttr.array[idx] += fwVelocities[i].vx
          posAttr.array[idx + 1] += fwVelocities[i].vy
          posAttr.array[idx + 2] += fwVelocities[i].vz
          fwVelocities[i].vy -= 0.0015 // gravity

          // Reset burst
          if (posAttr.array[idx + 1] < -5 || Math.abs(posAttr.array[idx]) > 18) {
            posAttr.array[idx] = (Math.random() - 0.5) * 8
            posAttr.array[idx + 1] = Math.random() * 4 + 4
            posAttr.array[idx + 2] = (Math.random() - 0.5) * 8 - 4
            const spd = Math.random() * 0.12 + 0.04
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            fwVelocities[i].vx = Math.sin(phi) * Math.cos(theta) * spd
            fwVelocities[i].vy = Math.sin(phi) * Math.sin(theta) * spd
            fwVelocities[i].vz = Math.cos(phi) * spd
          }
        }
        posAttr.needsUpdate = true
      } else {
        fireworksMesh.visible = false
      }

      // 15.8 Mouse & Mobile Gyro Parallax Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04
      cakeGroup.rotation.x = mouse.y * 0.14
      cakeGroup.rotation.z = -mouse.x * 0.1
      starField.position.x = mouse.x * 0.9
      starField.position.y = mouse.y * 0.6

      // 15.9 Candle Flame Flicker
      const flicker = Math.sin(elapsed * 18) * 0.12 + Math.cos(elapsed * 26) * 0.08
      flame.scale.set(1 + flicker * 0.2, 1 + flicker * 0.35, 1 + flicker * 0.2)
      flameGlow.scale.set(1 + flicker * 0.25, 1.5 + flicker * 0.4, 1 + flicker * 0.25)

      // Orbiting Stardust
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

    // 16. Cleanup
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
        opacity: 0.88,
      }}
    />
  )
}
