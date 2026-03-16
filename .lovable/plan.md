

# Roboti piltide parandamine — failinimede normaliseerimine

## Probleem
Failid `public/robot/` kaustas sisaldavad tühikuid nimedes (nt `1Rollo Proto render P006.png`). Kuigi `%20` kodeering peaks teoreetiliselt töötama, ei lahenda preview/hosting keskkond neid URL-e korrektselt — tagastatakse HTML, mitte pilt.

## Lahendus
Importida pildid otse TypeScriptis `src/assets/` kaudu, mitte kasutada `public/` URL-teid. Vite bundler lahendab imporditud pildid alati õigesti, olenemata failinimest.

## Sammud

1. **Kopeeri 3 pilti `src/assets/robot/` kausta** turvaliste nimedega:
   - `1Rollo Proto render P006.png` → `src/assets/robot/rollo-render-p006.png`
   - `1Rollo Proto P010.png` → `src/assets/robot/rollo-front-p010.png`
   - `1Rollo Proto render P013.png` → `src/assets/robot/rollo-render-p013.png`

2. **Uuenda `src/pages/Index.tsx`** — impordi pildid ülaosas ja kasuta `src={importedImage}`:
   ```tsx
   import rolloRenderP006 from "@/assets/robot/rollo-render-p006.png";
   import rolloFrontP010 from "@/assets/robot/rollo-front-p010.png";
   ```

3. **Uuenda `src/components/SpecsBlueprint.tsx`** — sama lähenemine P013 pildiga.

4. **Uuenda `src/pages/BlogPost.tsx`** — sama lähenemine P013 pildiga.

## Mõju
- 3 faili muudetakse: `Index.tsx`, `SpecsBlueprint.tsx`, `BlogPost.tsx`
- 3 uut pildifaili `src/assets/robot/` kaustas
- Pildid töötavad garanteeritult, sest Vite bundler haldab neid otse

