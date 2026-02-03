
# CSS Filter + Blend Mode Tulede Lahendus

## Kontseptsioon

Loome elegantse "Starlinki-laadse" tulede efekti ilma eraldi overlay-pildita:
1. **Duplitseerime** roboti pildi samasse konteinerisse
2. **Rakendame CSS filtreid** ülemisele pildile, et isoleerida heledad punktid (tuled)
3. **Kasutame screen blend-mode'i** loomulikuks säraefektiks
4. **Animeerime opacity'd** pulseeriva efekti saavutamiseks

---

## Tehniline Lahendus

### 1. HeroSection.tsx Struktuur

**Eemaldatav kood** (read 74-114):
Kogu praegune CSS-põhine teemanti-tulede lahendus.

**Uus struktuur**:

```tsx
{/* Robot container - relative for overlay positioning */}
<div className="relative">
  {/* Base robot image */}
  <img
    src={rollo1}
    alt="ROLLO Robot"
    className="w-auto h-[400px] md:h-[500px] object-contain drop-shadow-2xl"
  />
  
  {/* Lights overlay - same image with filter magic */}
  <img
    src={rollo1}
    alt=""
    aria-hidden="true"
    className={`absolute inset-0 w-auto h-[400px] md:h-[500px] object-contain pointer-events-none
      ${animationPhase === "entering" ? "opacity-30" : ""}
      ${animationPhase === "blinking" ? "animate-lights-glow-red" : ""}
      ${animationPhase === "complete" ? "animate-lights-glow" : ""}
    `}
    style={{
      filter: 'brightness(0) invert(1) contrast(1000%) brightness(1000%)',
      mixBlendMode: 'screen',
      maskImage: 'radial-gradient(circle at 50% 45%, black 10%, transparent 15%)',
      WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 10%, transparent 15%)',
    }}
  />
</div>
```

### 2. index.css Animatsioonid

Lisa uued animatsioonid ja eemalda vanad `lights-breathe` animatsioonid:

```css
/* Lights glow animation - white pulse */
@keyframes lights-glow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

/* Lights glow animation - red pulse (for blinking phase) */
@keyframes lights-glow-red {
  0%, 100% {
    opacity: 0.2;
    filter: brightness(0) invert(1) contrast(1000%) brightness(1000%) 
            sepia(100%) saturate(10000%) hue-rotate(0deg);
  }
  50% {
    opacity: 1;
    filter: brightness(0) invert(1) contrast(1000%) brightness(1000%) 
            sepia(100%) saturate(10000%) hue-rotate(0deg);
  }
}

.animate-lights-glow {
  animation: lights-glow 2s ease-in-out infinite;
}

.animate-lights-glow-red {
  animation: lights-glow-red 0.5s ease-in-out infinite;
}
```

---

## CSS Filtrite Selgitus

```text
filter: brightness(0) invert(1) contrast(1000%) brightness(1000%)
        │           │         │               │
        │           │         │               └── Teeb heledad alad üliheledaks
        │           │         └── Suurendab kontrasti äärmuseni
        │           └── Inverteerib värvid (must -> valge)
        └── Teeb pildi täiesti mustaks
```

```text
mask-image: radial-gradient(circle at 50% 45%, black 10%, transparent 15%)
            │                           │
            │                           └── 50% horisontaalselt, 45% vertikaalselt
            └── Näitab ainult ringi sees olevat osa (tuled)
```

---

## Failide Muudatused

| Fail | Tegevus |
|------|---------|
| `src/components/HeroSection.tsx` | Eemaldada read 74-114 (CSS tuled), lisada piltide overlay-struktuur |
| `src/index.css` | Lisada `lights-glow` ja `lights-glow-red` animatsioonid |

---

## Eelised

| Aspekt | Vana CSS-lahendus | Uus Filter-lahendus |
|--------|-------------------|---------------------|
| Positsioneerimine | Käsitsi, ebatäpne | Automaatne, 1:1 kattuvus |
| Tulede kuju | Lihtsustatud rombid | Täpselt pildil nähtavad tuled |
| Hooldus | Palju CSS klasse | Üks img element + filter |
| Visuaalne kvaliteet | Standardne | Premium "Starlink" efekt |

---

## Mask-Image Positsioon

Radial-gradient'i keskpunkt `50% 45%` on ligikaudne. Seda saab vajadusel kohandada:
- **50%** = horisontaalne keskpunkt (roboti keskjoon)
- **45%** = vertikaalne positsioon (tulede kõrgus)
- **10%** = maski raadius (kui suur ala on nähtav)
- **15%** = üleminekuala (fade-out raadius)

Kui tuled on teises kohas, saab neid väärtusi kohendada.
