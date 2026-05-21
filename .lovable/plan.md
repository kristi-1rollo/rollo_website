## Eesmärk
Solution sektsioonis on roboti graafika (`/images/1rollo_solution_graph.webp`) mobiilis taustal, kuid sisu ja gradient katavad selle nii palju, et toodet pole näha. Desktopis töötab praegune lahendus hästi ja jääb puutumata.

## Lahendus
Mobiilivaates eemaldame roboti pildi taustalt ja paigutame selle eraldi inline-pildiks kohe pealkirja alla, et toode oleks selgelt nähtav. Desktopis (md ja suuremad) jääb kõik täpselt nii nagu praegu.

## Muudatused

Fail: `src/pages/Index.tsx`, Solution sektsioon (read 263–294)

1. **Taustapilt** (rida 266): lisa `hidden md:flex`, et tausta-img näeks ainult desktopis.
2. **Mobiili gradient** (rida 276): eemaldame või muudame nõrgemaks, sest mobiilis pole enam tausta peita.
3. **Pealkirja `FadeInView` järele** lisame mobiili-only inline pildi:
   ```tsx
   <FadeInView delay={50}>
     <img
       src="/images/1rollo_solution_graph.webp"
       alt="1Rollo autonomous security robots"
       className="md:hidden w-full h-auto object-contain"
       loading="lazy"
     />
   </FadeInView>
   ```
   See ilmub pealkirja ja Solution Cards vahele ainult mobiilis.

Desktop layout (`md:` ja suurem) jääb identseks.

## Tulemus
- Desktop: muutmata
- Mobiil: SECTION TAG + pealkiri → suur selge roboti pilt → Solution kaardid
