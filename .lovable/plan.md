## 1. Scroll top pärast submit

Pärast edukat saatmist kerime vormi alguse juurde, et "Thank you" sõnum oleks kohe näha.

**Muudatus:** `src/pages/Contact.tsx` — lisame formi ümber `ref` ja `useEffect`, mis jälgib `isSuccess` muutust → `formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })` koos väikese offsetiga headeri jaoks.

## 2. Kohustuslikud väljad (*)

**Praegune olukord:** Name, E-mail, Company, Country on juba HTML `required` + JS validatsioonis (`useContactForm` `requiredFields: ["company", "country"]` + sisseehitatud name/email check). Brauser blokeerib submiti tühjade väljadega.

**Mida teen:** Kontrollin, et iga * väli oleks järjepidev (HTML `required` + JS validate + visuaalne veateade). Lisan iga välja alla inline veateate (mitte ainult toast), et kasutaja näeks kohe, kus viga on.

## 3. Sisestusreeglid väljade kaupa

| Väli | Reegel |
|---|---|
| Name * | `maxLength=100`, `pattern` lubab tähed/tühikud/sidekriipsud/apostroofid |
| E-mail * | juba `type="email"` + `maxLength=255` + zod-laadne regex |
| Company * | `maxLength=150` |
| Country * | `maxLength=80`, tähed/tühikud |
| Number of Robots | `type="number"` + `inputMode="numeric"` + `min=1` + `max=10000` + `onKeyDown` blokeerib `e/+/-/.` (praegu lubab teadusliku notatsiooni) |
| Estimated Demand | jääb vabaks tekstiks (kasutaja palus mitte piirata "tekstvastuse" välja) |
| Additional Info | `maxLength=2000` |

Lisame ka serveripoolse valideerimise `submit-registration` edge functionisse (zod schema), et keegi ei saaks API otse kutsudes pikki/pahatahtlikke väärtusi sisestada.

## 4. Andmete säilimise garantii

**Praegune olukord (juba töötab):**
1. Klient klikib Submit → `submit-registration` edge function INSERTib esmalt `registrations` tabelisse → ALLES SIIS saadab meilid
2. Kui meilide saatmine ebaõnnestub, lead on ikkagi DB-s alles
3. Iga meil logitakse `email_send_log` tabelisse (pending → sent/failed/dlq) — kõik katsed jäävad logi
4. Meilijärjekord (`pgmq` + `process-email-queue` cron) proovib ebaõnnestunud saadetisi 5x uuesti automaatselt
5. Admin paneel näitab kõiki `registrations` kirjeid → ükski lead ei kao

**Mida juurde lisan:**
- **Client-side backup:** Enne submit-i salvestame vormi snapshot `localStorage`-i. Kui võrk katkeb / saatmine ebaõnnestub, sõnum jääb `localStorage`-i ja kasutaja saab uuesti saata. Pärast edukat saatmist puhastame.
- **Network failure fallback:** Kui `supabase.functions.invoke` viskab vea (võrk maas), näitame veateadet + ütleme et andmed on lokaalselt salvestatud.
- **Admin nähtavus:** Kontrollin, et admin tabel `/admin` näitab kõiki `registrations` koos meili staatusega (`email_send_log` join), et oleks kohe näha kui mõne kirja meil ebaõnnestus.

## Failid mida muudan

- `src/pages/Contact.tsx` — scroll top, input atribuudid, inline veateated
- `src/hooks/useContactForm.ts` — zod validatsioon, localStorage backup, parem veatöötlus
- `src/components/RegistrationModal.tsx` — samad input reeglid (et oleks järjepidev)
- `supabase/functions/submit-registration/index.ts` — zod server-side schema, pikkuse piirid
- Deploy `submit-registration` edge function

Pärast muudatusi teen testesituse ja kontrollin, et `registrations` kirje + `email_send_log` ridade staatus on `sent`.
