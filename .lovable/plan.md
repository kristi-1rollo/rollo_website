## Probleem

`send-transactional-email` viidi `verify_jwt = true` peale, mis blokeerib `submit-registration` kõned (uus `sb_secret_*` teenuserolli võti ei ole JWT). Tulemus: kontaktivorm salvestab andmed DB-sse, aga teavitus- ja kinnituskirju ei lähe välja (401 logides).

## Lahendus

Asendada gateway-tasandi JWT-kontroll funktsiooni-sisese jagatud saladusega serveri-serveri kõnedele. See on tugevam kaitse kui `verify_jwt=true` (anon-võti on avalik), ja samas töötab usaldusväärselt edge function vahel.

### Muudatused

1. **Lisa uus saladus** `INTERNAL_FUNCTION_SECRET` (juhuslik string) Lovable Cloud secret store'i.

2. **`supabase/config.toml`** — tagasi `verify_jwt = false` funktsioonile `send-transactional-email`. `generate-excerpt` jääb `verify_jwt = true` (kutsutakse autenditud admin brauserist, kus JWT on olemas).

3. **`supabase/functions/send-transactional-email/index.ts`** — lisa funktsiooni alguses (peale CORS preflight'i) kontroll:
   - Loe header `x-internal-secret`.
   - Kui see vastab `INTERNAL_FUNCTION_SECRET`-le → luba läbi.
   - Muidu kontrolli `Authorization: Bearer <jwt>` ja vali sealt admin roll (nagu `manage-admin`).
   - Kui kumbki ei sobi → tagasta 401.

4. **`supabase/functions/submit-registration/index.ts`** — kutsu `send-transactional-email` otse `fetch`-iga (mitte `supabase.functions.invoke`), lisades:
   - `Authorization: Bearer <SUPABASE_ANON_KEY>` (gateway nõuab apikey't)
   - `x-internal-secret: <INTERNAL_FUNCTION_SECRET>`
   - `Content-Type: application/json`

   Säilita "fire-and-forget" muster ja vealogimine.

5. **Verify deploy** — `deploy_edge_functions` mõlemale funktsioonile, siis testi kontaktivormi ning kontrolli `email_send_log` tabelit.

## Turvamõju

- Anonüümsed (gateway-läbised) ja autenditud anon-võtmega kõned hakkavad saama 401 funktsiooni enda sees → spämmi/phishing risk lahendatud.
- Serveri-serveri kõned (`submit-registration` → `send-transactional-email`) töötavad jälle jagatud saladusega.
- Admin brauserist tulnud kõned (kui kunagi vaja) saaks läbi JWT + admin role kontrolli.

## Failid mida muudame

- `supabase/config.toml`
- `supabase/functions/send-transactional-email/index.ts`
- `supabase/functions/submit-registration/index.ts`
- Uus saladus: `INTERNAL_FUNCTION_SECRET`
