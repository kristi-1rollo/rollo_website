
# Roboti Tulede Punane → Valge Animatsioon

## Ülevaade
Lisa roboti tuledele uus animatsioonifaas, kus tuled alguses vilguvad punasena (nagu pildil näha) ja seejärel muutuvad valgeks.

---

## Muudatused

### 1. Uus animatsioonifaas (HeroSection.tsx)

Praegu on 3 faasi: `entering` → `blinking` → `complete`

Uus loogika:
- `entering` (0-2.5s): Robot tuleb sisse, tuled kustus
- `blinking` (2.5-3.5s): Tuled vilguvad **punasena**
- `complete` (3.5s+): Tuled vilguvad **valgena** (jätkuv)

### 2. CSS animatsioonid (src/index.css)

Lisa uus punane vilkumise animatsioon:

```css
@keyframes lights-flash-red {
  0%, 100% {
    opacity: 0.3;
    background-color: hsl(0, 100%, 50%);
    box-shadow: 0 0 10px hsl(0, 100%, 50% / 0.2);
  }
  50% {
    opacity: 1;
    background-color: hsl(0, 100%, 50%);
    box-shadow: 0 0 30px hsl(0, 100%, 50% / 0.8),
                0 0 60px hsl(0, 100%, 50% / 0.5);
  }
}

.animate-lights-flash-red {
  animation: lights-flash-red 0.5s ease-in-out infinite;
}
```

### 3. Tulede värvi loogika (HeroSection.tsx)

```tsx
<div
  className={cn(
    "w-3 h-3 rounded-full",
    animationPhase === "entering" && "bg-foreground/30 opacity-30",
    animationPhase === "blinking" && "bg-red-500 animate-lights-flash-red",
    animationPhase === "complete" && "bg-foreground animate-lights-flash"
  )}
/>
```

---

## Animatsiooni ajakava

```text
Aeg (s):  0    1    2    2.5    3    3.5    4    ...
          |----|----|-----|-----|-----|-----|---->

Robot:    [  sissesõit  ][  sway liikumine jätkub  ]
Tuled:    [   kustus    ][ PUNANE ][ VALGE vilkumine ]
Tekst:                            [  fade in  ]
```

---

## Muudetavad failid

| Fail | Muudatus |
|------|----------|
| `src/index.css` | Lisa `@keyframes lights-flash-red` animatsioon |
| `src/components/HeroSection.tsx` | Lisa punane vilkumise faas tuledele |

---

## Visuaalne efekt

**Enne:** Tuled → valge vilkumine kohe

**Pärast:** Tuled → punane vilkumine (1s) → valge vilkumine (jätkuv)

See loob efekti, nagu robot "ärkab" - kõigepealt punased tuled (nagu pildil), siis muutub operatiivseks valgete tuledega.
