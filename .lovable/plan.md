## Kiirplaan

Leidsin kontrolliga:
- Saatja domeen `notify.1rollo.com` on kinnitatud ja valmis.
- Test-backend töötab ning seal on e-kirjade järjekorra töö olemas.
- Viimastes Test-logides ei ole uusi vormi ega e-kirja sündmusi, seega probleem on tõenäoliselt Live keskkonnas `1rollo.com` poolel.

## Tegutsemine

1. Käivitame uuesti Publish flow
   - See on vajalik, et Live keskkonda uuesti seadistataks e-kirjade järjekorra taustatöö ja vajalikud võtmed.
   - Ilma selleta võib vorm näidata rohelist kinnitust, aga e-kiri jääb järjekorda või ei hakka üldse liikuma.

2. Pärast Publish’i testime kohe `1rollo.com` kontaktivormi
   - Saadame ühe värske testpäringu.
   - Kontrollime, kas kliendile tulev kinnituskiri jõuab inboxi/spämmi.
   - Kontrollime, kas tiimile minev teavitus liigub samuti.

3. Kui pärast Publish’i kirjad endiselt ei liigu
   - Kontrollin e-kirjade staatust logidest: kas seis on pending, failed, suppressed või sent.
   - Kui Live taustatöö jäi Publish’is ikkagi seadistamata, tuleb see eskaleerida Lovable Cloud toe poole, sest Live cron’i sisemist lippu ei saa projektikoodiga parandada.

## Kiireim eeldatav lahendus

Kõige kiirem ja tõenäolisem fix on praegu Publish flow uuesti läbi teha ning seejärel kohe üks uus vormitest teha.