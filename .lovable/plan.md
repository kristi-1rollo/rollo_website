

## Kerimispõhised fade-in animatsioonid blogiartiklitele

### Lähenemine

Loon uue `ScrollFadeIn` wrapper-komponendi, mis kasutab Intersection Observer API-t. Iga artikli sektsioon (header, thumbnail, sisukord, sisu, galerii) mähitakse sellesse komponenti ja ilmub sujuvalt, kui kasutaja kerib selle juurde.

### Uus komponent: `src/components/ScrollFadeIn.tsx`

- Kasutab `useRef` + `useEffect` koos `IntersectionObserver`-iga
- Algseis: `opacity: 0`, `translateY(24px)`
- Kui element on vaateväljas (threshold ~0.1): sujuv üleminek `opacity: 1`, `translateY(0)`
- Konfigureeritav viivitus (`delay`) prop erinevate elementide järjestikuseks ilmumiseks
- Animatsioon käivitub ainult üks kord (`once: true`)

### Muudetav fail: `src/pages/BlogPost.tsx`

- Importida `ScrollFadeIn`
- Mähkida iga peamine sektsioon `ScrollFadeIn`-i sisse:
  1. Back link
  2. Header (tag, kuupäev, pealkiri)
  3. Thumbnail pilt
  4. Sisukord
  5. Artikli sisu
  6. Meediagalerii

### Tehniline detail

Komponent on puhas CSS + Intersection Observer lahendus, Framer Motion pole vajalik. See hoiab koodi kergena ja jõudlust optimaalsena.

