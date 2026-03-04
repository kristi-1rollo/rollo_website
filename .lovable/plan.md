

# Kõik pooleliolevad muudatused

Kolm asja, mis tuleb ära teha:

## 1. Hero taustapilt (Index.tsx)
- Kopeerin üleslaetud pildi → `public/hero/rollo_street.png`
- Rida 131: `src="/robot/rollo_tunnel.png"` → `src="/hero/rollo_street.png"`
- Rida 133: `object-center` → `object-[75%_center]` et robot paremal pool näha oleks
- Rida 136: overlay `bg-black/55` → `bg-black/45` et pilt paremini läbi paistaks

## 2. Patendisektsioon Product lehelt ära (Product.tsx)
- Eemaldan read 456-478 (kogu patent section)

## 3. Patendipildid avalehe Product Teaser sektsiooni (Index.tsx)
- Read 248-264: asendan tekstikaardid piltidega kaartidega
- Iga kaart saab patendipildi (`Pilt1.png`, `Pilt2.png`, `Pilt3.png`) tumeda taustaga (`bg-black` mitte `bg-white`)
- Piltidel `invert` filter et tumedal taustal näha oleks
- Tekstid ja lingid jäävad samaks `productTiles` massiivist

