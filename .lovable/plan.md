## Plaan: vahepeal saadetud kirjade taastamine

Kontrolli järgi on saatjadomeen korras ja taustatöö olemas, aga nähtavas e-kirjade logis ega järjekorras ei ole kirju alles. Seega ei tasu taastamist teha e-kirja järjekorrast, vaid kindlamalt vormi salvestatud päringutest: kui vorm näitas rohelist kinnitust, salvestati päring enne e-kirja saatmise katset.

### 1. Taastan lähteandmed registreeringutest
- Võtan kõik viimase perioodi kontaktivormi päringud `Registrations` andmetest.
- Kontrollin, millistel päringutel puudub vastav e-kirja saatmise logi.
- Väldin duplikaate, et sama päring ei läheks kogemata mitu korda välja.

### 2. Teen turvalise uuestisaatmise
- Lisan ajutise/haldusliku taastamismehhanismi, mis saadab iga salvestatud päringu põhjal uuesti:
  - tiimile teavituse `info@1rollo.com`
  - kliendile kinnituskirja tema e-posti aadressile
- Iga taastatud kiri saab stabiilse unikaalse võtme, et korduv käivitamine ei tekitaks duplikaatsaateid.

### 3. Käivitan taastamise ja kontrollin tulemuse
- Käivitan taastamise ainult nende päringute jaoks, mis jäid probleemse perioodi sisse.
- Kontrollin pärast käivitamist e-kirjade logi:
  - `pending` tähendab järjekorras
  - `sent` tähendab edukalt välja saadetud
  - `failed/dlq/suppressed` tähendab, et tuleb konkreetne viga lahendada

### 4. Teen süsteemi edaspidi kindlamaks
- Muudan vormi e-kirjade saatmise jälgitavamaks, et roheline kinnitusteade ei jätaks muljet, nagu e-kiri oleks kindlasti kohale jõudnud, kui tegelikult jäi saatmine kinni.
- Vajadusel lisan admin-vaatesse lihtsa “resend” võimaluse konkreetse päringu jaoks.

### Tehniline märkus
Praegu nähtavas backendis on e-kirjade järjekord tühi ja e-kirjade logi tühi; taastamise usaldusväärne allikas on `registrations` tabel, mitte aegunud e-kirja järjekord. Kui Live keskkonna salvestatud päringud on eraldi, tuleb taastamine käivitada pärast Live publish’i samas Live andmestikus.