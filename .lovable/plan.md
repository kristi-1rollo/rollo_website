# Solution sektsiooni uuendus

Fail: `src/pages/Index.tsx`, read ~297–426.

## Muudatused

1. **Eemalda taustapilt desktopist**
   - Kustuta `<div>` (rida 300–307), mis renderdab `1rollo_solution_graph.webp` taustal.
   - Kustuta dark overlay (rida 308) ja `linear-gradient` overlay (rida 310) — neid pole enam vaja, kuna pilt ei ole enam taustal.
   - Säilita `section-glow-top` ja lime glow blob (rida 311) atmosfääri jaoks.

2. **Tausta gradient stiil (sama mis muudel sektsioonidel)**
   - Lisa sektsioonile pehme dark gradient overlay, sarnaselt Capabilities sektsiooni mustriga: 
     `bg-[radial-gradient(ellipse_at_50%_14%,rgba(22,74,173,0.10),transparent_44%),linear-gradient(180deg,rgba(4,10,24,0.10),rgba(0,0,0,0.05))]`.
   - Tulemus: tavaline lehe taust, mitte täisekraani robotipilt.

3. **Desktop layout: pilt tekstikastide kõrval**
   - Muuda `PublicContentRail` sisemine konteiner `md:`-l 2-veeruliseks grid-iks: vasakul tekst + kaardid (~58%), paremal pilt (~42%).
   - Pilt renderdatakse paremas veerus suurelt: `w-full h-auto object-contain`, ilma maski/overlay-ta. Pildi vertikaalne suurus joondub nii, et pildi **ülemine serv** algab pealkirja kõrguselt ja **alumine serv** lõpeb viimase kaardirea allservaga (st pilt skaaleeritakse veeru kõrguse järgi: `self-stretch` + `max-h-full`, vajadusel `aspect-ratio` fallback, kasuta `items-stretch` grid-il, et pildi konteiner saaks täiskõrguse).
   - Pildi konteiner: `flex items-center justify-center` — pilt täidab veeru kõrguse ja jääb keskele horisontaalselt.

4. **Mobile**
   - Mobile inline pilt (read 327–337) jääb nagu praegu — eraldi sektsioon pealkirja all.

## Tehniline struktuur (desktop)

```text
<section> (gradient bg, glow blob)
  <PublicContentRail>
    <div class="md:grid md:grid-cols-[58%_42%] md:gap-10 md:items-stretch">
      <div> (vasak: header + 4 kaarti) </div>
      <div class="hidden md:flex items-center justify-center">
        <img class="w-full h-auto max-h-full object-contain" />
      </div>
    </div>
  </PublicContentRail>
</section>
```

Et pildi top/bottom täpselt joonduks tekstiplokiga, kasuta `items-stretch` (juba grid default) + pildikonteineris `h-full` ning `<img>` `h-full w-auto object-contain` — see tagab, et pilt täidab vertikaalselt sama kõrguse kui tekstiveerg, kuid säilitab proportsiooni.

## Mida EI muudeta

- Mobile layout (inline pilt + kaardid stack)
- Kaartide sisu, ikoonid, tekstid
- Teised sektsioonid
