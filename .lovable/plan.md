

# Radial Orbital Timeline Komponendi Implementeerimine

## Ülevaade
Asendan praeguse "Technical Specifications" sektsiooni staatilise radiaalse layout'i uue dünaamilise "Radial Orbital Timeline" komponendiga, kus spetsifikatsioonide sõlmed tiirlevad roboti ümber animeeritult.

---

## Arhitektuur

### Uued failid
1. **`src/components/RadialOrbitalTimeline.tsx`** - Põhikomponent orbitaalse ajaskaala jaoks
2. **`src/components/OrbitalNode.tsx`** - Üksiku tiirlevate sõlme komponent

### Muudetavad failid
1. **`src/components/SpecificationsSection.tsx`** - Integreerima uus komponent
2. **`src/index.css`** - Lisama orbitaalne animatsioon CSS

---

## Tehniline plaan

### 1. Orbitaalse animatsiooni CSS (src/index.css)

Lisa uus CSS keyframes animatsioon:

```css
@keyframes orbital-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-orbital {
  animation: orbital-rotate 60s linear infinite;
}
```

---

### 2. OrbitalNode komponent (src/components/OrbitalNode.tsx)

Loo uus komponent üksiku sõlme jaoks:

```text
+----------------------------------+
|  Props:                          |
|  - id: number                    |
|  - title: string                 |
|  - content: string               |
|  - Icon: LucideIcon              |
|  - status: "completed"|"pending" |
|  - angle: number (kraadides)     |
|  - isActive: boolean             |
|  - onClick: () => void           |
+----------------------------------+
```

**Omadused:**
- Positsioneeritud absoluutselt radiaalselt keskpunktist
- Hover efekt skaleerimisega
- Erinevad värvid staatuse järgi:
  - `completed`: Sinine (#3B82F6)
  - `pending`: Oranž (#FF8C00)
- Ikoon Lucide React'ist
- Glassmorphism stiil

---

### 3. RadialOrbitalTimeline komponent (src/components/RadialOrbitalTimeline.tsx)

Põhikomponent struktuuri:

```text
+----------------------------------------+
| RadialOrbitalTimeline                  |
|                                        |
|  +----------------------------------+  |
|  |        Orbital Container         |  |
|  |                                  |  |
|  |    [Node 1]     [Node 2]         |  |
|  |         \       /                |  |
|  |          \     /                 |  |
|  |     [Node 7] ● [Node 3]          |  |
|  |    (Robot image center)          |  |
|  |          /     \                 |  |
|  |         /       \                |  |
|  |    [Node 6]     [Node 4]         |  |
|  |            [Node 5]              |  |
|  +----------------------------------+  |
|                                        |
|  +----------------------------------+  |
|  |     Active Node Details Card     |  |
|  |     Title: Dimensions            |  |
|  |     Content: 60 x 60 x 140 cm    |  |
|  +----------------------------------+  |
+----------------------------------------+
```

**Props:**
- `timelineData`: TimelineItem[] - Andmed sõlmede jaoks
- `centerImage`: string - Keskpildi URL (rollo2.png)

**Funktsioonid:**
- `useState` aktiivsete sõlmede jälgimiseks
- `useEffect` IntersectionObserver animatsiooni käivitamiseks
- SVG jooned sõlmedelt keskpunkti

---

### 4. Timeline andmed (timelineData)

```typescript
import { Ruler, Weight, Zap, Battery, Eye, Plug, Calendar } from "lucide-react";

const timelineData = [
  { id: 1, title: "Dimensions", content: "60 x 60 x 140 cm", Icon: Ruler, status: "completed" },
  { id: 2, title: "Weight", content: "35 kg", Icon: Weight, status: "completed" },
  { id: 3, title: "Speed", content: "Up to 10 km/h", Icon: Zap, status: "completed" },
  { id: 4, title: "Battery", content: "Up to 8 hours", Icon: Battery, status: "completed" },
  { id: 5, title: "Sensors", content: "Motion & object detection", Icon: Eye, status: "completed" },
  { id: 6, title: "Charging", content: "Automatic recharging", Icon: Plug, status: "completed" },
  { id: 7, title: "Availability", content: "Pilot projects from 2025", Icon: Calendar, status: "pending" },
];
```

---

### 5. SpecificationsSection uuendamine

Asendan praeguse sisu uue komponendiga:

```tsx
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
import rollo2 from "@/assets/rollo2.png";

const SpecificationsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Technical <span className="text-primary">Specifications</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16">
          Explore ROLLO's cutting-edge specifications
        </p>
        
        <RadialOrbitalTimeline 
          timelineData={timelineData} 
          centerImage={rollo2} 
        />
      </div>
    </section>
  );
};
```

---

## Visuaalne disain

### Värvid
- **Completed sõlmed**: `#3B82F6` (sinine) - sama mis primary
- **Pending sõlmed**: `#FF8C00` (oranž)
- **Jooned**: Gradient sinisest valgeni
- **Taust**: Glassmorphism efekt

### Animatsioonid
1. **Orbitaalne pöörlemine**: Sõlmed tiirlevad aeglaselt (60s täisring)
2. **Hover efekt**: Skaleerumine 1.1x + glow efekt
3. **Entrance animation**: Fade-in + scale sõlmede ilmumisel
4. **Joonte joonistamine**: stroke-dashoffset animatsioon

### Responsive design
- **Desktop (>768px)**: 
  - Suur orbitaalring (raadius 180px)
  - Sõlmed nähtavad koos ikoonide ja tekstiga
- **Mobiil (<768px)**: 
  - Väiksem ring (raadius 120px)
  - Ainult ikoonid nähtavad sõlmedel
  - Aktiivne sõlm kuvatakse eraldi kaardil allpool

---

## Failide struktuur pärast muudatusi

```text
src/components/
├── SpecificationsSection.tsx  (muudetud)
├── RadialOrbitalTimeline.tsx  (uus)
├── OrbitalNode.tsx            (uus)
└── ...

src/index.css (muudetud - uus animatsioon)
```

---

## Märkused

- Lucide React'ist kasutatakse: `Ruler`, `Weight`, `Zap`, `Battery`, `Eye`, `Plug`, `Calendar`
- Roboti pilt (`rollo2.png`) jääb keskpunkti
- IntersectionObserver käivitab animatsiooni kui sektsioon tuleb vaatevälja
- Sõlmede klikkimine näitab detailset infot (eriti mobiilil kasulik)

