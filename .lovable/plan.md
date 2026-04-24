# Airports + Communities pildi parandus

## Probleem
Eelmises sammus sai `rollo-city.webp` (Communities kast) ekslikult üle kirjutatud sinu üleslaaditud lennujaama pildiga. Lisaks pole Airports kast veel uue pildiga seotud — see näitab praegu hero-pilti `/hero/rollo-street.webp`.

Sa ei soovi AI-genereeritud asenduspilti Communities jaoks — peame taastama algse `rollo-city` pildi.

## Mida teen

### 1. Taasta Communities pilt
Vaatan, kas algne `rollo-city.webp` on saadaval src/assets või mõnes varukoopias. Kui ei ole, küsin sinult uue Communities pildi üleslaadimist enne edasiminekut. **Ma ei genereeri AI pilti.**

Kui leian algse, taastan need failid:
- `public/robot/rollo-city.webp`
- `public/robot/rollo-city-640.webp`
- `public/robot/rollo-city-960.webp`

### 2. Seo Airports kast uue pildiga
Failis `src/pages/Index.tsx` (rida 45) muudan Airports kirje:

```diff
- image: "/hero/rollo-street.webp",
+ image: "/robot/rollo-airport.webp",
```

Pilt `rollo-airport.webp` (74 KB) ja variandid (640w: 16 KB, 960w: 28 KB) on juba olemas ning optimeeritud — ei ole vaja uuesti genereerida.

### 3. Kinnitamine
- Kontrollin, et Communities kast näitab algset linnatänava pilti
- Kontrollin, et Airports kast näitab uut lennujaama pilti (sinu üleslaaditud rollo_nordica)
- Kontrollin, et `OptimizedImage` srcSet kasutab `localVariants={[640, 960]}` mõlemas kastis (mobiilne payload jääb minimaalseks)

## Kui algne Communities pilt pole leitav
Peatun ja palun sul üles laadida algne `rollo-city` pilt (linnatänav). Ei genereeri AI-d ega kasuta asenduspilti.
