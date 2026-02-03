
# Hero Sektsiooni Interaktiivsuse ja Visuaalsete Efektide Uuendamine

## Ulevaade
Kolm suurt taiendustust, mis muudavad roboti elavaks ja interaktiivseks:

1. **3D-sugavus ja hiire jalgimine** - Robot reageerib hiire liikumisele
2. **"Hingavad" tuled** - Tugevam glow efekt koos blur filtriga
3. **Luksusliku sissesõidu animatsioon** - Starlink-stiilis lehe avanemine

---

## 1. 3D Hiire Jalgimine (Mouse Tracking)

### Fail: `src/components/HeroSection.tsx`

Lisa uued state'id ja hiire jalgimise loogika:

```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  
  // Arvuta hiire positsioon keskpunkti suhtes (-1 kuni 1)
  const x = (clientX - innerWidth / 2) / (innerWidth / 2);
  const y = (clientY - innerHeight / 2) / (innerHeight / 2);
  
  setMousePosition({ x, y });
};

// Roboti 3D pöörde stiil
const robot3DStyle = {
  transform: animationPhase === "complete" 
    ? `perspective(1200px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 8}deg)`
    : undefined,
  transition: "transform 0.2s ease-out",
  transformStyle: "preserve-3d" as const,
};
```

Lisa `onMouseMove` sektsioonile:

```tsx
<section 
  className="relative min-h-screen ..."
  onMouseMove={handleMouseMove}
>
```

Rakenda stiil roboti konteinerile:

```tsx
<div 
  className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : ""}`}
  style={robot3DStyle}
>
```

**Parameetrid:**
- Max pööre X-teljel: 5 kraadi (ules-alla)
- Max pööre Y-teljel: 8 kraadi (vasakule-paremale)
- Ülemineku aeg: 0.2s ease-out
- Perspektiiv: 1200px

---

## 2. "Hingavad" Tuled Blur Efektiga

### Fail: `src/index.css`

Uuenda olemasolevaid tulede animatsioone blur efektiga:

```css
/* Breathing light animation with blur */
@keyframes lights-breathe {
  0%, 100% {
    opacity: 0.4;
    filter: blur(8px);
    box-shadow: 0 0 15px hsl(217 91% 60% / 0.3),
                0 0 30px hsl(217 91% 60% / 0.2);
  }
  50% {
    opacity: 1;
    filter: blur(12px);
    box-shadow: 0 0 40px hsl(217 91% 60% / 0.8),
                0 0 80px hsl(217 91% 60% / 0.5),
                0 0 120px hsl(217 91% 60% / 0.3);
  }
}

.animate-lights-breathe {
  animation: lights-breathe 2s ease-in-out infinite;
}

/* Red breathing lights */
@keyframes lights-breathe-red {
  0%, 100% {
    opacity: 0.4;
    filter: blur(8px);
    box-shadow: 0 0 15px hsl(0 100% 50% / 0.3),
                0 0 30px hsl(0 100% 50% / 0.2);
  }
  50% {
    opacity: 1;
    filter: blur(12px);
    box-shadow: 0 0 40px hsl(0 100% 50% / 0.8),
                0 0 80px hsl(0 100% 50% / 0.5),
                0 0 120px hsl(0 100% 50% / 0.3);
  }
}

.animate-lights-breathe-red {
  animation: lights-breathe-red 1.5s ease-in-out infinite;
}
```

### Fail: `src/components/HeroSection.tsx`

Uuenda tulede elemendid suurema ja udusema efektiga:

```tsx
{/* 4 Robot breathing lights */}
<div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-3">
  {[0, 1, 2, 3].map((i) => (
    <div
      key={i}
      className={`w-4 h-4 rounded-full
        ${animationPhase === "entering" ? "bg-blue-400/20 opacity-20" : ""}
        ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
        ${animationPhase === "complete" ? "bg-blue-400 animate-lights-breathe" : ""}
      `}
      style={{ 
        animationDelay: `${i * 0.15}s`,
      }}
    />
  ))}
</div>
```

**Parameetrid:**
- Tule suurus: `w-4 h-4` (suurem)
- Blur intensiivsus: 8-12px
- Hingamise kiirus: 2s (valge), 1.5s (punane)
- Staggered delay: 0.15s tuledele (lainetus efekt)
- Varv: Sinine (`hsl(217 91% 60%)`) - sama mis primary

---

## 3. Luksusliku Sissesõidu Animatsioon

### Fail: `src/index.css`

Uuenda olemasolev `robot-entrance` animatsioon luksusliku kõveraga:

```css
/* Luxurious robot entrance animation */
@keyframes robot-entrance {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(60px);
    filter: brightness(0.3) blur(4px);
  }
  40% {
    opacity: 0.6;
    filter: brightness(0.6) blur(2px);
  }
  70% {
    opacity: 0.9;
    transform: scale(0.95) translateY(10px);
    filter: brightness(0.9) blur(0px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: brightness(1) blur(0px);
  }
}

.animate-robot-entrance {
  animation: robot-entrance 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

### Fail: `src/components/HeroSection.tsx`

Uuenda tausta tumedamaks ja teksti pehme kontrastiga:

```tsx
{/* Background - pure dark */}
<div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,10%,3%)] via-background to-[hsl(240,10%,6%)]" />

{/* Subtle ambient glow */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[100px]" />
```

Uuenda pealkirja teksti stiilid:

```tsx
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
  <span className="text-primary">ROLLO:</span> The World's First Commercial{" "}
  <span className="text-slate-200">Autonomous One-Wheeled Robot</span>
</h1>

<p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
  Making security services <span className="text-[hsl(30,100%,50%)] font-semibold">10x cheaper</span>, smarter, and more energy-efficient
</p>
```

**Parameetrid:**
- Animatsiooni kestus: 1.8s (oli 2.5s)
- Kover: `cubic-bezier(0.22, 1, 0.36, 1)` - luksuslik inertne liikumine
- Algus: `scale(0.7)`, `blur(4px)` (sugavusest tulev efekt)
- Taht vahe: `tracking-tight` (-0.025em)
- Teksti varv: `text-slate-200` ja `text-slate-400` (pehmemad toonid)
- Taust: Tumedam gradient minimalistliku valge fokuseerimiseks

---

## Muudetavad failid

| Fail | Muudatus |
|------|----------|
| `src/index.css` | Uuenda animatsioone, lisa blur efektid |
| `src/components/HeroSection.tsx` | Lisa hiire jalgimine, 3D pöörde efekt, uuenda tuled ja taust |

---

## Tehnilised nouded

- **GPU kiirendus**: `transform`, `opacity`, `filter` - kõik GPU-l
- **Sujuvus**: 60fps animatsioonid
- **Perspektiiv**: 1200px annab realistliku 3D efekti
- **Responsive**: Hiire jalgimine töötab desktopil, mobiilil staatiline
- **Blur efekt**: Annab tuledele realistliku "glow" ilme
- **Timing kurv**: `cubic-bezier(0.22, 1, 0.36, 1)` - sama mis Apple/Starlink kasutab

---

## Kokkuvote

Pärast neid muudatusi:
1. Robot reageerib hiire liikumisele sujuva 3D pöördega
2. Tuled "hingavad" ja kumavad nagu päris LED tuled
3. Lehe avanemine on luksuslik Starlink-stiilis kogemus
4. Tekst on pehmema kontrastiga, professionaalne look
