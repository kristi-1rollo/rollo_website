

# Animatsioonide Lisamine ROLLO Veebilehele

## Ülevaade
Lisan kolm animatsiooni: roboti liikumine edasi-tagasi, tulede vilkumine Hero sektsioonis ning specs-sõlmede ilmumine Technical Specifications sektsioonis.

---

## Animatsioon 1: Roboti Edasi-Tagasi Liikumine

### Fail: `src/index.css`
Lisa uus keyframes animatsioon:

```css
@keyframes robot-sway {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(25px);
  }
}

.animate-robot-sway {
  animation: robot-sway 4.5s ease-in-out infinite;
}
```

### Fail: `src/components/HeroSection.tsx`
Muuda roboti pildi konteinerit (rida 39-56), et lisada liikumise animatsioon pärast sissepääsu lõppu:

```tsx
<div 
  className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : "animate-robot-sway"}`}
>
```

**Parameetrid:**
- Liikumise kaugus: 25px (x-teljel)
- Kiirus: 4.5 sekundit (üks tsükkel)
- Algab automaatselt pärast sissepääsu
- Jätkub pidevalt (infinite loop)

---

## Animatsioon 2: 4 Valge Tule Vilkumine

### Fail: `src/index.css`
Lisa uus keyframes animatsioon kiireks vilkumiseks:

```css
@keyframes lights-flash {
  0%, 100% {
    opacity: 0.3;
    box-shadow: 0 0 10px hsl(var(--rollo-glow) / 0.2);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 30px hsl(var(--rollo-glow) / 0.8),
                0 0 60px hsl(var(--rollo-glow) / 0.5);
  }
}

.animate-lights-flash {
  animation: lights-flash 0.5s ease-in-out infinite;
}
```

### Fail: `src/components/HeroSection.tsx`
Muuda üksik tulede element (rida 42-48) neljaks eraldi tuleks ja lisa vilkumise animatsioon:

```tsx
{/* 4 Robot lights */}
<div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-2">
  {[0, 1, 2, 3].map((i) => (
    <div
      key={i}
      className={`w-3 h-3 rounded-full bg-white
        ${animationPhase === "complete" ? "animate-lights-flash" : "opacity-30"}
      `}
    />
  ))}
</div>
```

**Parameetrid:**
- 4 valget tuld reas
- Vilkumise kiirus: 0.5 sekundit
- Intensiivsus: 0.3 (30%) kuni 1 (100%)
- Kõik vilguvad sünkroonselt
- Algab pärast roboti sissepääsu lõppu

---

## Animatsioon 3: Specs Ilmumine Staggered

### Fail: `src/index.css`
Lisa uus keyframes animatsioon fade-in + scale efektiks:

```css
@keyframes node-appear {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.animate-node-appear {
  animation: node-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### Fail: `src/components/OrbitalNode.tsx`
Lisa ilmumise animatsioon ja staggered delay:

```tsx
interface OrbitalNodeProps {
  // ... existing props
  isVisible: boolean;  // uus prop
  appearDelay: number; // uus prop (ms)
}

// Komponendi sees:
<div
  className={cn(
    "absolute z-20 cursor-pointer",
    isVisible ? "animate-node-appear" : "opacity-0"
  )}
  style={{
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${appearDelay}ms`,
  }}
>
```

### Fail: `src/components/RadialOrbitalTimeline.tsx`
Muuda sõlmede renderimist, et lisada staggered delay:

```tsx
{timelineData.map((item, index) => {
  // Arvutame delay päripäeva järjekorras (ülevalt paremalt alustades)
  const staggerDelay = index * 150; // 150ms iga sõlme vahel
  
  return (
    <OrbitalNode
      key={item.id}
      // ... existing props
      isVisible={isVisible}
      appearDelay={staggerDelay}
    />
  );
})}
```

**Parameetrid:**
- Ilmumise efekt: Fade-in + scale (0.5 -> 1)
- Kiirus: 0.6 sekundit
- Staggered delay: 150ms iga sõlme vahel
- Järjekord: Esimene sõlm (Dimensions) ülevalt, siis päripäeva
- Käivitub IntersectionObserver'iga kui sektsioon tuleb vaatevälja

---

## Muudetavad failid

| Fail | Muudatus |
|------|----------|
| `src/index.css` | Lisa 3 uut keyframes animatsiooni |
| `src/components/HeroSection.tsx` | Lisa roboti sway ja 4 tule vilkumine |
| `src/components/OrbitalNode.tsx` | Lisa isVisible ja appearDelay props |
| `src/components/RadialOrbitalTimeline.tsx` | Lisa staggered delay loogika |

---

## Tehnilised nõuded

- **60fps sujuvus**: Kõik animatsioonid kasutavad `transform` ja `opacity` (GPU-kiirendatud)
- **Ei häiri teksti**: Roboti liikumine on piiritletud 25px-ga, tuled on väikesed
- **Cross-device**: Puhas CSS animatsioonid töötavad kõigil seadmetel
- **Prefers-reduced-motion**: Võimalus lisada `@media (prefers-reduced-motion: reduce)` query

