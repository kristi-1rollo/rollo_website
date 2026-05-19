## Eesmärk
Taastada `/career` lehele 11-liikmeline meeskonnafotode galerii (marquee scroll + klikitav modal portreepildiga), mis varem oli olemas `CareerNew.tsx`-s ja eemaldati `Career.tsx`-st. Kõik pildid (`public/robot/team/profile/*.webp`) ja CSS klass `.team-marquee` index.css-s on juba olemas, ainult komponent puudub.

## Muudatused

**Fail:** `src/pages/Career.tsx`

1. **Lisada importe:** `motion` (framer-motion), `ImagePlus`, `ArrowRight` (lucide-react), `FadeInView`.

2. **Lisada andmemassiiv** `teamProfiles` 11 inimesega (Arno Kütt, Sander Sebastian Agur, Kristi Vahter, Laido Valdvee, Lauri Hirvesaar, Lauri Laanmets, Lauri Vaher, Raivo Sulla, Rein Saetalu, Remi Lossov, Taavi Varjund) viidates olemasolevatele `.webp` failidele.

3. **State + handlerid:** `selectedTeamIndex`, `handleOpenTeamMember`, `handleCloseTeamMember`, `handleTeamNavigate(direction)`.

4. **Uus sektsioon** sisestada `<main>`-i alguses (enne "Why Join Rollo" Section'it):
   - SectionTag "Team"
   - Pealkiri "We're engineers, builders and problem-solvers"
   - Kirjeldav lõik
   - Marquee track (`team-marquee`, `team-marquee__track`, kaks `team-marquee__edge`) — duplitseeritud `teamProfiles` lõpmatuks scrollimiseks
   - Iga kaart on `<button>` ruudukujulise pildiga + "View" + ikoon, klikates avab modali
   - Wrapper'iks `FadeInView` (vastab projekti animatsioonimustritele)

5. **Lisada modal** Career.tsx lõppu (enne `</>`-i):
   - Dialog avab `selectedTeamIndex !== null` korral
   - Pealkiri = inimese nimi, "Team" eyebrow
   - Vasak/parem nooled (desktop, sm:flex) navigeerimiseks
   - `motion.div` drag="x" mobiilis swipe'imiseks (±80px → next/prev)
   - Suur portreepilt keskel

## Tehnilised märkused
- `.team-marquee` CSS animatsioon on juba index.css real ~543 olemas — taaskasutame.
- Disain vastab projekti memo'le: 4px border-radius, primary `#B4FF33` accent, slate/white text, scroll fade-in.
- Pildid (`/robot/team/profile/*.webp`) on serveris juba olemas.
- Ei mõjuta olemasolevat "Why Join Rollo" / "Open Positions" sektsiooni — lisatakse selle ette.

## Tulemus
Career-lehel ilmub Hero ja Why Join-sektsiooni vahele scrollima meeskonnaribake 11 portreega; klikates avaneb modal suurema pildiga ja navigatsiooniga.