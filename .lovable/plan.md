

## Probleem

Sisselogimisel kuvatakse viga **"Backend not available"**, sest `supabase` klient on `null`. See juhtub, kuna:

1. `src/integrations/supabase/client.ts` on käsitsi muudetud (see fail genereeritakse automaatselt ja ei tohiks käsitsi muuta)
2. Keskkonnamuutujad ei jõua korrektselt kliendini

## Lahendus

### 1. Taasta `src/integrations/supabase/client.ts` automaatselt genereeritud kujule

Fail tuleb taastada originaalkujule, kus see kasutab `VITE_SUPABASE_PUBLISHABLE_KEY` muutujat otse (mitte fallback-loogikat). Automaatne genereerimine peaks selle üle kirjutama.

### 2. Uuenda `useAuth.ts` veakäsitlust

Praegu viskab `signIn` funktsiooni kohe vea, kui `supabase` on `null`. Lisame parema veateate ja konsoolilogi, et tulevikus oleks kergem tuvastada, kas probleem on ühenduses.

### Tehniline detail

Fail `src/integrations/supabase/client.ts` peaks välja nägema nii (automaatselt genereeritud kujul):

```typescript
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://igdxbtuaajrhvuqtwhmm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

Kuna see fail on automaatselt genereeritud, peame lihtsalt tagama, et see taastub õigesse olekusse hardcoded väärtustega (nagu Lovable Cloud seda tavaliselt teeb), mitte ei sõltu puuduvast `.env` failist.

