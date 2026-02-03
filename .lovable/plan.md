

# Tulede Positsiooni Tapsem Kohandamine

## Referentspildi Analuus

Kasutaja pildilt on nahtav:
- 4 valget rombi roboti rindkerel
- Tuled on paigutatud teemandi kujuliselt (1 uleval, 2 keskel, 1 all)
- Tulede vahel on ROLLO logo
- Asuvad roboti keskosas, umbes poole korgusel

## Praegune vs Oige Positsioon

| Parameeter | Praegu | Uus |
|------------|--------|-----|
| Vertikaalne positsioon | `top-[45%]` | `top-[50%]` |
| Konteineri laius | `w-20` (80px) | `w-24` (96px) |
| Konteineri korgus | `h-12` (48px) | `h-14` (56px) |
| Tule suurus | `w-4 h-4` (16px) | `w-5 h-5` (20px) |

## Muudatused HeroSection.tsx

### Rida 75 - Konteineri positsioon

```tsx
// Praegu:
<div className="absolute top-[45%] left-1/2 -translate-x-1/2 z-10">

// Uus - nihutatud veidi madalamale:
<div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
```

Lisa `-translate-y-1/2` et konteiner oleks tapselt tsentreeritud 50% kohal.

### Rida 76 - Konteineri suurus

```tsx
// Praegu:
<div className="relative w-20 h-12">

// Uus - suurem konteiner:
<div className="relative w-24 h-14">
```

### Read 79, 88, 97, 106 - Tulede suurus

```tsx
// Praegu:
w-4 h-4

// Uus - suuremad tuled:
w-5 h-5
```

---

## Kokkuvote

| Fail | Muudatus |
|------|----------|
| `src/components/HeroSection.tsx` | Positsioon `top-[50%] -translate-y-1/2`, konteiner `w-24 h-14`, tuled `w-5 h-5` |

### Visuaalne Tulemus

```text
Roboti pilt:
+------------------+
|                  |
|      (pea)       |
|                  |
|    +--------+    |  <- top-[50%] -translate-y-1/2
|    |   [T]  |    |      (tsentreeritud)
|    | [L] [R]|    |
|    |   [B]  |    |
|    +--------+    |
|                  |
|     (jalad)      |
+------------------+
```

Muudatused tagavad, et tuled asuvad tapselt roboti rindkere keskel ja on proportsionaalselt suuremad.

