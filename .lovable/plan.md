## Plaan: meedia optimeerimine ja kasutamata failide kustutamine

Praegu on `public/` kaustas ~45 MB pilte/videosid ja Cloud storage'is ~166 MB. Suur osa sellest on kasutamata või optimeerimata.

### 1. Kustuta kasutamata failid `public/` ja `src/assets/` kaustadest

Kontrollisin koodiviiteid kogu `src/` ja `index.html` ulatuses — järgnevaid faile ei impordita ega refereerita kuskil:

| Fail | Suurus |
|---|---|
| `public/graph/pilt-2.png` | 115 KB |
| `public/graph/pilt-3.png` | 123 KB |
| `public/images/1rollo_security_guard.png` | 967 KB |
| `public/images/1rollo_market_3robots.png` | 2.4 MB |
| `public/images/rollo_hiring.png` | 1.7 MB |
| `public/robot/F6/1rollo_market_scale.webp` (+ -640/-960 variandid) | 115 KB |
| `public/robot/rollo-park.webp` (+ -640/-960 variandid) | 192 KB |
| `public/robot/team/field_prox.jpg` | 1.3 MB |
| `public/robot/vid/1rollo_hall_9-16.mp4` | 0.5 KB (tühi placeholder) |
| `src/assets/robot/1rollo_orbital_2.webp` (duplikaat public versioonist) | 94 KB |

**Kokku säästame: ~7 MB.**

### 2. Optimeeri suured kasutusel olevad PNG-d → WebP

Need failid on aktiivselt kasutuses, aga liiga suured (PNG asemel saaks WebP-d):

| Fail | Praegu | Sihtmärk |
|---|---|---|
| `public/favicon.png` | 686 KB | ~10 KB (32×32 favicon ei vaja suurt resolutsiooni) |
| `public/hero/1rollo_home_hero.png` | 1.5 MB | ~150 KB WebP |
| `public/images/1rollo_deploy.png` | 1.3 MB | ~150 KB WebP |
| `public/images/1rollo_solution_graph.png` | 1.6 MB | ~200 KB WebP |
| `public/images/1rollo_guards.png` | 2.0 MB | ~200 KB WebP |
| `public/images/1rollo_robots.png` | 3.6 MB | ~300 KB WebP |
| `public/patent/pilt-{1,2,3}.png` | 350 KB | ~80 KB WebP |
| `public/robot/team/profile/*.png` (11 faili: Sander, Lauri V, Lauri H, Kristi, Taavi, Rein, Raivo, Remi, Laido, Lauri L, Arno) | **~35 MB kokku** | ~5 MB WebP kokku |

Kasutan `sharp`'i (skript `/tmp/optimize.mjs`) — convert quality 82, max width 1600px (team profiilidele 800px). Originaalsed PNG-d kustutan pärast veendumist, et WebP versioon töötab. Uuendan kõik koodi viited (PNG → WebP).

**Kokku säästame: ~40+ MB.**

### 3. Cloud storage (blog-images / career-posters)

Sealne suur ruum (157 MB blog-images, 9 MB career-posters) sisaldab ka aktiivselt kasutuses olevaid faile (blog post sisus viidatud, mitte ainult thumbnail/galerii). **Automaatne "leia kasutamata" päring ei ole usaldusväärne** (sest peame parssima HTML sisust URL-e ja võiks valesti kustutada).

Soovitus: jätame Cloud storage puhastuse järgmiseks sammuks ja teen siis hoolika auditi (eelvaade enne kustutamist). Sellesse PR-i seda ei kaasa.

### Tegevuste järjekord

1. Installin `sharp` build-time skripti jaoks ühekordseks konversiooniks.
2. Käivitan `/tmp/optimize.mjs` mis konverteerib kõik #2 tabeli failid `.webp`-ks (favicon.png jääb PNG-na, ainult resize 64×64).
3. Uuendan koodi viited PNG-lt WebP-le (`src/pages/AboutUs.tsx`, `Index.tsx`, jt).
4. Kustutan kõik #1 nimekirja failid + originaalsed PNG-d, mille asendasin WebP-ga.
5. Kontrollin lehe brauserist, et pildid kuvatakse korrektselt.

Cloud storage puhastust ma siin ei tee — kinnitan järgmises iteratsioonis kui sa soovid.
