// Ana ekran: siyah tayra logosunun dış hattı boyunca dolaşan yeşil ışık (leba.tr'deki tutulma efektinin kodla yapılmış hali).
// Işık harflerin dışında, logonun en dış kenarında gezer; yalnızca dış kenar parlar, logo geniş ve soluk bir halede hep seçilir.
// Ağır işler (bulanık şablonlar, logo hattı) yalnızca boyut değişince hazırlanır; her karede birkaç drawImage çalışır.

const TAU = Math.PI * 2
const LOOP_MS = 5000 // bir tur süresi
const TRAIL = 12 // kenardaki ışık kuyruğunu oluşturan nokta sayısı

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new Image()
    im.onload = () => resolve(im)
    im.onerror = reject
    im.src = src
  })
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.ceil(w))
  c.height = Math.max(1, Math.ceil(h))
  return c
}

// Logo + "interactive" yazısını tek renkte tek bir şablona çizer
function drawLockup(logo, w, logoH, color, pad, withLabel = true) {
  const size = w * 0.042
  const c = makeCanvas(w + pad * 2, logoH + size * 2.4 + pad * 2)
  const x = c.getContext('2d')
  x.drawImage(logo, pad, pad, w, logoH)
  if (withLabel) {
    x.font = `300 ${size}px Poppins, sans-serif`
    x.textBaseline = 'top'
    x.letterSpacing = `${size * 0.55}px`
    const label = 'interactive'
    const tw = x.measureText(label).width - size * 0.55
    x.fillText(label, pad + w - tw, pad + logoH + size * 0.9)
  }
  x.globalCompositeOperation = 'source-in'
  x.fillStyle = color
  x.fillRect(0, 0, c.width, c.height)
  return c
}

function blurred(src, radius) {
  const c = makeCanvas(src.width, src.height)
  const x = c.getContext('2d')
  x.filter = `blur(${radius}px)`
  x.drawImage(src, 0, 0)
  return c
}

// Logonun dış hattını çıkarır: her açıdan merkeze doğru ışın atıp ilk dolu pikseli bulur.
// raw: dış silüet (iç boşluklar hariç), smooth: ışığın yolu için yumuşatılmış hat. Noktalar şablona göre 0–1 aralığında.
function traceOutline(src, samples = 900) {
  const sw = 520
  const sh = Math.round(sw * (src.height / src.width))
  const c = makeCanvas(sw, sh)
  const x = c.getContext('2d', { willReadFrequently: true })
  x.drawImage(src, 0, 0, sw, sh)
  const alpha = x.getImageData(0, 0, sw, sh).data
  const solid = (px, py) => {
    const ix = px | 0
    const iy = py | 0
    if (ix < 0 || iy < 0 || ix >= sw || iy >= sh) return false
    return alpha[(iy * sw + ix) * 4 + 3] > 128
  }
  const ccx = sw / 2
  const ccy = sh / 2
  const rMax = Math.hypot(sw, sh) / 2
  let radii = []
  for (let k = 0; k < samples; k++) {
    const a = (k / samples) * TAU
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    let hit = 0
    for (let r = rMax; r > 0; r -= 0.5) {
      if (solid(ccx + dx * r, ccy + dy * r)) { hit = r; break }
    }
    radii.push(hit)
  }
  const toPoints = (rs) => rs.map((r, k) => {
    const a = (k / samples) * TAU
    return { x: (ccx + Math.cos(a) * r) / sw, y: (ccy + Math.sin(a) * r) / sh }
  })
  const raw = toPoints(radii)
  const next = []
  for (let k = 0; k < samples; k++) {
    let s = 0
    for (let j = -4; j <= 4; j++) s += radii[(k + j + samples) % samples]
    next.push(s / 9)
  }
  return { raw, smooth: toPoints(next) }
}

// Dış silüetin hemen dışında kalan parlama bandı: silüet bulanıklaştırılır, silüetin kendisi oyulur,
// gerçek harf kenarlarından uzak kalan kısımlar (harf aralarındaki boşluklar) atılır
function outerBand(hull, logoNear, blur, gain) {
  const band = blurred(hull, blur)
  const b = band.getContext('2d')
  b.globalCompositeOperation = 'destination-out'
  b.drawImage(hull, 0, 0)
  b.globalCompositeOperation = 'destination-in'
  b.drawImage(logoNear, 0, 0)
  const c = makeCanvas(band.width, band.height)
  const x = c.getContext('2d')
  x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < gain; i++) x.drawImage(band, 0, 0)
  return c
}

export async function createHeroLight(canvas, logoSrc) {
  const ctx = canvas.getContext('2d')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let alive = true
  let raf = 0

  const [logo] = await Promise.all([loadImage(logoSrc), document.fonts.load('300 20px Poppins').catch(() => {})])

  let dpr = 1
  let lw = 0, logoH = 0, pad = 0
  let ink, glowWide, glowTight, work, mask
  let ox = 0, oy = 0 // şablonların ekrandaki sol üst köşesi
  let path = [] // ekran koordinatlarında hat + kümülatif uzunluk
  let pathLen = 0

  function layout() {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    const W = canvas.clientWidth
    const H = canvas.clientHeight
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    lw = Math.min(W * 0.78, 1180, H * 1.45) * dpr
    logoH = lw * (logo.naturalHeight / logo.naturalWidth)
    pad = lw * 0.08
    ink = drawLockup(logo, lw, logoH, '#000', pad)
    // Işık yalnızca logoyu dolaşır, "interactive" yazısına değmez
    const white = drawLockup(logo, lw, logoH, '#fff', pad, false)
    const outline = traceOutline(white)

    // Dış silüet: harflerin iç boşlukları dolu, böylece yalnızca en dış kenar yanar
    const hull = makeCanvas(white.width, white.height)
    const hx = hull.getContext('2d')
    hx.fillStyle = '#fff'
    hx.beginPath()
    outline.raw.forEach((p, i) => {
      const x = p.x * hull.width
      const y = p.y * hull.height
      if (i) hx.lineTo(x, y)
      else hx.moveTo(x, y)
    })
    hx.closePath()
    hx.fill()
    hx.drawImage(white, 0, 0)
    glowWide = outerBand(hull, blurred(white, lw * 0.014), lw * 0.016, 2)
    glowTight = outerBand(hull, blurred(white, lw * 0.005), Math.max(1.2, lw * 0.0026), 4)
    work = makeCanvas(ink.width, ink.height)
    mask = makeCanvas(ink.width, ink.height)
    ox = canvas.width / 2 - ink.width / 2
    oy = canvas.height / 2 - ink.height / 2

    // Işığın yolu: dış hattın tam üstü; çekirdeğin yarısı harfin arkasında, yarısı dışarıda kalır
    const ccx = ox + ink.width / 2
    const ccy = oy + ink.height / 2
    const offset = lw * 0.004
    path = []
    pathLen = 0
    outline.smooth.forEach((p, i) => {
      let x = ox + p.x * ink.width
      let y = oy + p.y * ink.height
      const d = Math.hypot(x - ccx, y - ccy) || 1
      x += ((x - ccx) / d) * offset
      y += ((y - ccy) / d) * offset
      if (i > 0) pathLen += Math.hypot(x - path[i - 1].x, y - path[i - 1].y)
      path.push({ x, y, s: pathLen })
    })
    pathLen += Math.hypot(path[0].x - path[path.length - 1].x, path[0].y - path[path.length - 1].y)
  }

  function pointAt(t) {
    const target = (((t % 1) + 1) % 1) * pathLen
    let lo = 0
    let hi = path.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (path[mid].s <= target) lo = mid
      else hi = mid - 1
    }
    const a = path[lo]
    const b = path[(lo + 1) % path.length]
    const segEnd = lo + 1 < path.length ? b.s : pathLen
    const f = segEnd > a.s ? (target - a.s) / (segEnd - a.s) : 0
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
  }

  // Şablonu, ışığın hat üzerindeki son konumlarından oluşan uzun bir kuyrukla keser:
  // yalnızca ışığın geçtiği kenarlar yanar, kuyruk geriye doğru söner
  function trailed(src, t, length, radius, color) {
    const m = mask.getContext('2d')
    m.globalCompositeOperation = 'source-over'
    m.clearRect(0, 0, mask.width, mask.height)
    m.globalCompositeOperation = 'lighter'
    const step = length / pathLen / TRAIL
    for (let k = TRAIL - 1; k >= -2; k--) {
      const p = pointAt(t - k * step)
      const fall = k < 0 ? 0.35 : Math.pow(1 - k / TRAIL, 1.6)
      const r = radius * (k < 0 ? 0.7 : 1 - (k / TRAIL) * 0.45)
      const x = p.x - ox
      const y = p.y - oy
      const g = m.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${color}, ${fall})`)
      g.addColorStop(1, `rgba(${color}, 0)`)
      m.fillStyle = g
      m.fillRect(x - r, y - r, r * 2, r * 2)
    }
    const w = work.getContext('2d')
    w.globalCompositeOperation = 'source-over'
    w.clearRect(0, 0, work.width, work.height)
    w.drawImage(src, 0, 0)
    w.globalCompositeOperation = 'source-in'
    w.drawImage(mask, 0, 0)
    return work
  }

  const motes = Array.from({ length: 50 }, () => ({
    a: Math.random() * TAU, r: Math.random(), s: 0.4 + Math.random() * 0.8, o: Math.random() * TAU,
  }))

  // Işığın yanında kıvrılan ince duman çizgileri; logonun dışına doğru açılır
  const wisps = Array.from({ length: 5 }, (_, i) => ({
    spread: (i - 2) * 0.42, curl: (i % 2 ? 1 : -1) * (0.6 + Math.random() * 0.6), o: Math.random() * TAU,
  }))

  function drawWisps(L, sec) {
    const out = Math.atan2(L.y - (oy + ink.height / 2), L.x - (ox + ink.width / 2))
    const step = lw * 0.0062
    ctx.lineWidth = Math.max(0.8, dpr * 0.75)
    ctx.lineCap = 'round'
    for (const w of wisps) {
      let x = L.x
      let y = L.y
      let dir = out + w.spread + Math.sin(sec * 0.9 + w.o) * 0.35
      for (let j = 0; j < 22; j++) {
        dir += w.curl * 0.09 * Math.sin(j * 0.22 + sec * 1.6 + w.o)
        const nx = x + Math.cos(dir) * step
        const ny = y + Math.sin(dir) * step
        const fade = (1 - j / 22) * (j / 5 < 1 ? j / 5 : 1)
        ctx.strokeStyle = `rgba(232, 255, 190, ${0.2 * fade})`
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nx, ny)
        ctx.stroke()
        x = nx
        y = ny
      }
    }
  }

  const start = performance.now()
  function frame(now) {
    const t = reduced ? 0.95 : (0.5 + (now - start) / LOOP_MS) % 1
    const L = pointAt(t)
    const sec = now / 1000

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = 'lighter'
    // Geniş ve soluk hale: logo her an koyu bir siluet olarak seçilir
    const haloR = lw * 0.8
    const halo = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, haloR)
    halo.addColorStop(0, 'rgba(220, 252, 160, .16)')
    halo.addColorStop(0.1, 'rgba(190, 242, 90, .06)')
    halo.addColorStop(0.45, 'rgba(178, 239, 43, .018)')
    halo.addColorStop(1, 'rgba(178, 239, 43, 0)')
    ctx.fillStyle = halo
    ctx.fillRect(L.x - haloR, L.y - haloR, haloR * 2, haloR * 2)

    // Parlak çekirdek: hattın üstünde; yarısı harfin arkasında kalır
    const coreR = lw * 0.04
    const core = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, coreR)
    core.addColorStop(0, 'rgba(250, 255, 236, .85)')
    core.addColorStop(0.2, 'rgba(226, 252, 170, .35)')
    core.addColorStop(1, 'rgba(178, 239, 43, 0)')
    ctx.fillStyle = core
    ctx.fillRect(L.x - coreR, L.y - coreR, coreR * 2, coreR * 2)

    // Dış kenardan taşan yumuşak parıltı ve ince, uzun kenar yayı
    ctx.drawImage(trailed(glowWide, t, lw * 0.36, lw * 0.11, '190, 242, 80'), ox, oy)
    ctx.drawImage(trailed(glowTight, t, lw * 0.5, lw * 0.05, '232, 255, 180'), ox, oy)

    // Siyah logo
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(ink, ox, oy)

    // Duman ve toz
    ctx.globalCompositeOperation = 'lighter'
    drawWisps(L, sec)
    for (const m of motes) {
      const rr = lw * 0.015 + m.r * lw * 0.08
      const a = m.a + sec * 0.35 * m.s
      const px = L.x + Math.cos(a) * rr
      const py = L.y + Math.sin(a) * rr * 0.7
      const alpha = (1 - m.r) * 0.5 * (0.5 + 0.5 * Math.sin(sec * 3 * m.s + m.o))
      ctx.fillStyle = `rgba(226, 252, 170, ${alpha})`
      ctx.fillRect(px, py, dpr, dpr)
    }

    if (alive && !reduced) raf = requestAnimationFrame(frame)
  }

  layout()
  const ro = new ResizeObserver(() => {
    layout()
    if (reduced) requestAnimationFrame(frame) // hareket azaltılmışsa döngü yok, tek kare yeniden çizilir
  })
  ro.observe(canvas)
  raf = requestAnimationFrame(frame)

  return () => {
    alive = false
    cancelAnimationFrame(raf)
    ro.disconnect()
  }
}
