## Probleem

Tahvli vaates (≈768–1023px) on Header.tsx-s liiga palju sisu ühel real:
- Logo + "Autonomous Security Robotics" silt (kuvatud alates `sm:` = 640px)
- 6-pealkirjaline desktopi navigatsioon (kuvatud alates `md:` = 768px)

Tulemus: logo on kokku surutud ja menüü venitatud / paigast ära.

## Lahendus

`src/components/Header.tsx` — tõsta lülituspunktid kõrgemaks, et tahvli vaade kasutaks hamburgeri-menüüd ja silt ilmuks alles siis, kui ruumi piisab:

1. **Desktopi navigatsioon** (rida 92): `hidden md:flex` → `hidden lg:flex`
2. **Mobiili hamburger** (rida 118): `md:hidden` → `lg:hidden`
3. **Tagline "Autonomous Security Robotics"** (rida 86): `hidden sm:block` → `hidden xl:block` (et ka väiksematel desktopidel jääks navigatsioonile õhku)
4. **Konteineri kõrgus** (rida 74): `h-16 md:h-20` → `h-16 lg:h-20` (sünkroonis uue lülituspunktiga)

Tulemus: kuni 1023px (sh kogu tahvli vahemik) kuvatakse kompaktne logo + hamburger; 1024px+ täisnavigatsioon; tagline ilmub 1280px+ juures.

Ühtegi muud faili ei muudeta.
