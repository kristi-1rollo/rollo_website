
# Roboti Tulede Positsioneerimise ja Kuju Parandamine

## Ulevaade
Praegu on roboti tuled (4 ringi) paigutatud valesti - need asuvad roboti pildi kohal `top-[15%]` positsioonil ja on ummargused. Vastavalt kasutaja soovile tuleb:
1. Muuta tuled rombikujuliseks (diamond shape)
2. Paigutada need tapselt roboti esikiljele
3. Tagada oige kihtide jarjekord (tuled pildi peal)
4. Lisada drop-shadow glow efekt

---

## Muudatused

### 1. HeroSection.tsx - Tulede Struktuuri Uuendamine

**Praegune probleem (read 67-80):**
- Tuled on horisontaalses reas `flex gap-3`
- Positsioon `top-[15%]` on vale
- Tuled on ummargused (`rounded-full`)

**Uus lahendus:**
```text
+------------------+
|     Roboti       |
|      pilt        |
|                  |
|    [tuled]       |  <- Tuled roboti rindkere piirkonnas
|                  |
+------------------+
```

**Muudatused:**

a) **Kihtide jarjekord** - Tulede konteiner liigutatakse pildi JARELE HTML-is ja lisatakse `z-10`:
```tsx
{/* Robot image */}
<img src={rollo1} alt="ROLLO Robot" ... />

{/* Diamond-shaped breathing lights - AFTER image */}
<div className="absolute top-[42%] left-1/2 -translate-x-1/2 z-10">
  ...
</div>
```

b) **Rombikujuline paigutus** - 4 tule grid paigutus:
```tsx
<div className="relative w-16 h-8">
  {/* Top light */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 ..." />
  {/* Left light */}
  <div className="absolute top-1/2 left-0 -translate-y-1/2 ..." />
  {/* Right light */}
  <div className="absolute top-1/2 right-0 -translate-y-1/2 ..." />
  {/* Bottom light */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ..." />
</div>
```

c) **Rombi kuju** - Kasuta `rotate(45deg)` koos ruuduga:
```tsx
className="w-3 h-3 rotate-45 ..."  // rotate(45deg) teeb ruudust rombi
```

d) **Tapse positsioon** - `top-[42%]` roboti rindkere piirkonnale

---

### 2. index.css - Animatsioonide Uuendamine

**Muuda `lights-breathe` animatsiooni:**
- Eemalda `filter: blur()` (rombi jaoks ei sobi)
- Lisa `filter: drop-shadow()` glow efekti jaoks

```css
@keyframes lights-breathe {
  0%, 100% {
    opacity: 0.5;
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.9))
            drop-shadow(0 0 40px rgba(59, 130, 246, 0.6));
  }
}
```

**Sama muudatus `lights-breathe-red` jaoks:**
```css
@keyframes lights-breathe-red {
  0%, 100% {
    opacity: 0.5;
    filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.4));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.9))
            drop-shadow(0 0 40px rgba(239, 68, 68, 0.6));
  }
}
```

---

## Tehniline kokkuvote

| Fail | Muudatus |
|------|----------|
| `src/components/HeroSection.tsx` | Tulede HTML umber, rombi kuju, oige positsioon, z-index |
| `src/index.css` | Animatsioonid drop-shadow efektiga |

### Vordlus enne/parast

| Omadus | Enne | Parast |
|--------|------|--------|
| Kuju | Ummargune (`rounded-full`) | Romb (`rotate-45`) |
| Positsioon | `top-[15%]` | `top-[42%]` |
| Paigutus | Horisontaalne rida | Diamond grid (4 punkti) |
| Z-index | Puudub | `z-10` |
| Glow efekt | `blur()` + `box-shadow` | `drop-shadow()` |
| HTML jarjekord | Enne pilti | Parast pilti |

### Parameeted
- Tulede suurus: `w-3 h-3` (vaiksem, tapsem)
- Roteeritud ruut: `rotate-45` = rombi kuju
- Drop-shadow varv: `rgba(59, 130, 246, ...)` (sinine) / `rgba(239, 68, 68, ...)` (punane)
- Glow ulatus: 8-40px
