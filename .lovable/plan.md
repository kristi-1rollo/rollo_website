

# Roboti Tulede Parandamine - Oige Paigutus, Suurus ja Naktavus

## Probleem
Roboti pildil on nahtavad 4 valget rombikujulist tuld, mille keskel on ROLLO logo. Praegu CSS-iga loodud tuled:
1. Ei ole nahtavad (opacity liiga madal)
2. On vales kohas (top-[42%] ei vasta tegelikule asukohale)
3. On liiga vaiksed (w-3 h-3 = 12px)

## Lahendus

### 1. HeroSection.tsx Muudatused

**Positsioon:** Nihuta tulede konteinerit roboti kerel tapsemalt kohale

**Suurus:** Suurenda tuled w-3 h-3 -> w-4 h-4 voi w-5 h-5 (16-20px)

**Naktavus:** Paranda entering faasi varve:
- Praegu: `bg-blue-400/20 opacity-20` (~4% naktav)
- Uus: `bg-blue-400/60` (60% naktav, selgelt nahtav)

**Konteiner:** Suurenda `w-12 h-6` -> `w-20 h-12` et tuled mahuks paremini

### 2. index.css Animatsioonide Kontroll

Veendu, et `animate-lights-breathe` ja `animate-lights-breathe-red` animatsioonid:
- Algavad kohe (mitte viivitusega)
- Omavad tugevat drop-shadow glow efekti
- Opacity vahemik on 0.6-1.0 (mitte 0.5-1.0)

---

## Tehniline Lahendus

### HeroSection.tsx

```tsx
{/* Diamond-shaped breathing lights - positioned on robot's chest */}
<div className="absolute top-[45%] left-1/2 -translate-x-1/2 z-10">
  <div className="relative w-20 h-12">
    {/* Top light */}
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45
        ${animationPhase === "entering" ? "bg-white/60" : ""}
        ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
        ${animationPhase === "complete" ? "bg-white animate-lights-breathe" : ""}
      `}
      style={{ animationDelay: "0s" }}
    />
    {/* Left light */}
    <div
      className={`absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rotate-45
        ${animationPhase === "entering" ? "bg-white/60" : ""}
        ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
        ${animationPhase === "complete" ? "bg-white animate-lights-breathe" : ""}
      `}
      style={{ animationDelay: "0.15s" }}
    />
    {/* Right light */}
    <div
      className={`absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rotate-45
        ${animationPhase === "entering" ? "bg-white/60" : ""}
        ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
        ${animationPhase === "complete" ? "bg-white animate-lights-breathe" : ""}
      `}
      style={{ animationDelay: "0.3s" }}
    />
    {/* Bottom light */}
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45
        ${animationPhase === "entering" ? "bg-white/60" : ""}
        ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
        ${animationPhase === "complete" ? "bg-white animate-lights-breathe" : ""}
      `}
      style={{ animationDelay: "0.45s" }}
    />
  </div>
</div>
```

### index.css - Animatsioonide Uuendused

```css
/* White/blue diamond breathing lights */
@keyframes lights-breathe {
  0%, 100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 30px rgba(255, 255, 255, 0.6));
  }
}

/* Red diamond breathing lights */
@keyframes lights-breathe-red {
  0%, 100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.5));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.9))
            drop-shadow(0 0 30px rgba(239, 68, 68, 0.6));
  }
}
```

---

## Kokkuvote

| Parameeter | Enne | Parast |
|------------|------|--------|
| Entering varv | `bg-blue-400/20 opacity-20` | `bg-white/60` |
| Tule suurus | `w-3 h-3` (12px) | `w-4 h-4` (16px) |
| Konteiner | `w-12 h-6` | `w-20 h-12` |
| Positsioon | `top-[42%]` | `top-[45%]` |
| Complete varv | `bg-blue-400` | `bg-white` |
| Glow varv | Sinine | Valge |

## Failid

| Fail | Muudatus |
|------|----------|
| `src/components/HeroSection.tsx` | Tulede suurus, konteiner, entering varv, complete varv |
| `src/index.css` | Animatsioonid valge glow efektiga |

