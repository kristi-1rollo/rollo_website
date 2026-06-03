YouTube embed näitab praegu ikka YouTube logo, pealkirja ja "Watch later"/"Share" nuppe — neid ei saa 100% ära peita (YouTube ei luba), aga saame need maksimaalselt minimeerida ja meie enda mute-nupu jätta.

## Mida muudame

**`src/components/BlogPostHeader.tsx` → `toYouTubeEmbed`:**
- Lisame `showinfo=0` (vana, aga kahjutu)
- Lisame `disablekb=1` (klahvid välja)
- Lisame `fs=0` (fullscreen nupp välja)
- `controls=0`, `modestbranding=1`, `rel=0`, `iv_load_policy=3` on juba olemas

**CSS overlay trikk pealkirja peitmiseks:**
YouTube näitab video alguses ja lõpus pealkirja/seotud videoid üleval. Lisame iframe'i peale kaks õhukest läbipaistmatut riba (`pointer-events: none`):
- Üleval ~60px must riba pealkirja katmiseks
- All ei ole vaja, sest `controls=0` peidab juba

Riba värv `bg-[#050505]` (sama mis taust), `pointer-events-none`, et mute-nupp jääks klikitavaks.

**Vimeo:** juba `background=1` peidab kõik — seal pole midagi muuta.

**Tulemus:** puhas video, ainult meie mute-nupp paremas alanurgas. YouTube vesimärk vasakus alanurgas jääb (seda ei saa eemaldada ilma YouTube'i tingimusi rikkumata), aga muu kaob.

## Tähelepanu

YouTube Terms of Service keelab brändingu täielikult ära peita. Vesimärk vasakus alanurgas peab jääma. Kui soovid täiesti puhast pleierit, peab kasutama `.mp4` faili (otselink) — siis pole ühtegi YouTube'i märki.
