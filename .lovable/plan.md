# Solution-pildi zoom → PhotoSwipe stiilis lightbox

Viidatud sait (riidedjailu.ee) kasutab WooCommerce'i PhotoSwipe galeriid. Käitumine:
- Klõps pildil → avaneb fullscreen tume lightbox
- Mobiilis: **pinch-to-zoom** kahe sõrmega, drag pildil ringi liikumiseks
- Desktopil: hiire scroll või topelt-klõps zoomimiseks, drag panimiseks
- ESC või X-nupp sulgemiseks

## Lahendus

Asendame praeguse oma-tehtud `ZoomableImage` lightbox-osa hästi testitud teegiga, mis kaetaks kõiki neid žeste karbist välja.

**Soovitatav teek:** [`yet-another-react-lightbox`](https://yet-another-react-lightbox.com/) + `Zoom` plugin.
- ~30 KB, React 18, TS tugi
- Sisseehitatud pinch-zoom, scroll-zoom, double-click zoom, drag-pan
- Dark fullscreen UI, mille stiili saame ülemääratleda meie tumeda paletiga
- ESC + tausta-klõps sulgemiseks

Alternatiivina `react-medium-image-zoom` on kergem (10 KB), aga ei toeta natiivselt pinch-zoomi mobiilis – ainult smooth expand. Seega valime `yet-another-react-lightbox`.

## Mida muudame

**Fail 1:** install
- `bun add yet-another-react-lightbox`

**Fail 2:** `src/components/ZoomableImage.tsx`
- Eemalda praegune oma-kirjutatud drag-pan loogika ja Dialog
- Asenda Lightbox + Zoom plugin
- Säilita thumbnail render (klikitav pilt + "Zoom" badge)
- Open state juhitakse sama nagu praegu: klõps → open

```tsx
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
// thumbnail: <button onClick={() => setOpen(true)}>...</button>
// <Lightbox open={open} close={() => setOpen(false)} slides={[{ src }]} plugins={[Zoom]} ... />
```

**Fail 3:** vajadusel global CSS overrides (`src/index.css`)
- Lightboxi tausta tume (juba default), close-nupp lime accent

## Kus seda kasutame
Sama komponent jääb kasutusele `src/pages/Index.tsx` Solution sektsioonis (mobile + tablet variant, `lg:hidden`). Desktop column jääb staatiline (võime soovi korral ka sinna lisada – kinnitan eraldi).

## Mida EI muuda
- Tausta gradient ja layout
- Pildi fail (`/images/1rollo_solution_graph_v2.webp`)
- Desktop layout
