## Plaan: Product lehe mobiili spec sektsioon — kahanev sticky robotipilt + 2x6 grid

### Idee
Mobiilis (`<md`):
1. Algul kuvatakse roboti pilt **suurena keskel üleval**.
2. Kui kasutaja kerib spec sektsiooni juurde, jääb pilt **sticky** ekraani ülaserva ja **kahaneb dünaamiliselt** (nt 320px → 100px) vastavalt scroll-progressile.
3. Spec'id kuvatakse 2-veerulises **kompaktses gridis** pildi all — kõik 12 korraga nähtavad ilma slidemata.
4. Kategooriapealkirjad ("DIMENSIONS & PERFORMANCE" / "AUTONOMY & CONNECTIVITY") eraldavad kaks gruppi.

Desktopi blueprint (md+) jääb täiesti puutumata.

### Tehniline lahendus (1 fail: `src/components/SpecsBlueprint.tsx`)

**Mobiili osa (`md:hidden`) ehitus:**

```tsx
<div ref={containerRef} className="md:hidden relative">
  {/* Sticky shrinking robot */}
  <div className="sticky top-16 z-10 flex justify-center pointer-events-none">
    <motion.img
      src="/robot/F6/f6_tech_spec.webp"
      alt="1ROLLO"
      style={{ width: imageWidth, mixBlendMode: "lighten" }}
      className="h-auto transition-none"
    />
  </div>

  {/* Specs grid below — pushes image into shrink range */}
  <div className="relative -mt-8 space-y-10">
    {[leftCategory, rightCategory].map(cat => (
      <div key={cat.category}>
        <p className="mono-spec text-[#B4FF33] text-[10px] mb-4 text-center">
          {cat.category}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {cat.specs.map(spec => <SpecGridCard spec={spec} />)}
        </div>
      </div>
    ))}
  </div>
</div>
```

**Shrink-loogika:** `useScroll({ target: containerRef, offset: ["start start", "end start"] })` + `useTransform(scrollYProgress, [0, 0.3], [320, 100])` Framer Motioniga (juba imported).

**SpecGridCard (uus, kompaktne):**
- `glass` taust, `border-[#B4FF33]/10`, `p-3`
- Ikoon top-left (h-4 w-4, lime)
- `mono-spec` label (text-[10px] lime)
- Bold value (text-sm white)
- Optional subValue (text-[10px] white/50)
- Minimaalne kõrgus, et grid oleks ühtlane

### Muudatused
1. Eemalda Carousel kasutus mobiili osas (jätame impordid alles, kui Carousel pole mujal vaja — kontrollin enne).
2. Eemalda `useState`, `useCallback`, `useEffect` carousel api jaoks; lisa `useRef`, `useScroll`, `useTransform`.
3. Asenda mobiili plokk uue sticky-shrink + grid lahendusega.
4. Lisa uus `SpecGridCard` komponent (asendab `SpecCard` mobiili jaoks; `SpecCard` võib eemaldada kui pole mujal kasutusel).

### Tulemus
- Pole rohkem peidetud spec'e ega manuaalset slidemist.
- Visuaalne side robotiga säilib läbi sticky kahaneva pildi (delight efekt).
- Kõik 12 spec'i ühe kerimisega kohe nähtavad.
- Desktopi vaade puutumata.