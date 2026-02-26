

## Blogi disaini premium-uuendus

### Probleem

Blogiartikli sisu kasutab praegu `text-muted-foreground` (heledus 47%), mis on tumedal taustal väga madala kontrastsusega. Saidi ülejäänud osad kasutavad pealkirjadele `text-white` ja kehatekstile `text-slate-300/400`, mis on palju loetavam. Samuti puudub sektsioonide vahel visuaalne eraldus.

### Muudatused

#### 1. Teksti kontrasti tostmine (BlogPost.tsx)

Praegune prose div kasutab `text-muted-foreground` (HSL 215 16% 47%) -- see on liiga tume. Muudatused:

- Kehatekst: `text-muted-foreground` asendada kontrastsema `text-slate-300` variandiga -- see vastab saidi uldisele disainile (HeroSection kasutab `text-slate-300` ja `text-slate-400`)
- H2 pealkirjad: lisada `[&_h2]:text-white [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:tracking-tight` -- vastab saidi globaalsetele h1/h2/h3 stiilidele (font-weight 800, uppercase, tracking -0.04em)
- H3 pealkirjad: `[&_h3]:text-white [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-tight`
- Bold tekst: `[&_strong]:text-white` -- rõhutatud tekst paistab selgelt silma
- Artikli pealkiri (h1): muuta `text-foreground` -> `text-white`

#### 2. Sektsioonide visuaalne eraldamine (BlogPost.tsx)

Iga H2 pealkiri tähendab uut teemasektsiooni. Lisada stiilsed eraldajad:

- `[&_h2]:border-t [&_h2]:border-border [&_h2]:pt-10 [&_h2]:mt-14` -- peen horisontaalne joon enne iga uut sektsiooni (vastavalt saidi border-värviskeemile)
- Esimene H2 ei tohiks saada ülemist joont: `[&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-8`
- Alternatiivne aktsent: lisada H2-le `[&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-8 [&_h2]:before:h-[2px] [&_h2]:before:bg-primary [&_h2]:before:mb-4` -- luhike roheline aktsendijoon enne pealkirja (vastab saidi `#B4FF33` primaarvarvile)

#### 3. Tsitaatide ja linkide stiilid (BlogPost.tsx)

- Blockquote: tugevam aarjoon `[&_blockquote]:border-primary/60` ja valge tekst `[&_blockquote]:text-slate-300`
- Lingid: juba on `text-primary`, aga lisada `[&_a]:hover:text-primary/80`

#### 4. Sisukorra disaini toustmine (TableOfContents.tsx)

Praegune kast on minimalistlik, aga ei vasta saidi premium-tundele:

- Taust: `bg-muted/30` -> `bg-white/[0.02]` (lahemale saidi body stiilidele)
- Aarjoon: `border-border` -> `border-white/[0.06]` (pehmem)
- Pealkiri: lisada roheline aktsendijoon vasakule

### Tehnilised detailid

**Muudetavad failid:**
- `src/pages/BlogPost.tsx` -- prose klasside uuendamine, h1 varvi muutmine
- `src/components/TableOfContents.tsx` -- sisukorra stiilide premium-uuendus

Uusi faile ega soltuvusi ei lisata. Koik muudatused on CSS-klasside tasemel.

