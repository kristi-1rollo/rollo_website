

# Parooli taastamise e-kirja parandamine

## Probleem

Edge function `manage-admin` kasutab `admin.generateLink({ type: "recovery" })`, mis **ainult genereerib lingi, aga ei saada e-kirja**. See on Supabase API iseärasus — `generateLink` on mõeldud juhtudeks, kus sa ise saadad kirja.

## Lahendus

Asenda `generateLink` meetodiga, mis tegelikult saadab e-kirja. Kaks võimalust:

**Valik: kasuta `resetPasswordForEmail`** — see käivitab Supabase sisseehitatud e-kirja saatmise. Kuna e-domeeni pole seadistatud, kasutatakse Supabase vaikimisi e-posti süsteemi, mis töötab ilma lisaseadistuseta.

### Muudatus failis `supabase/functions/manage-admin/index.ts`

Rida ~195–198: asenda `generateLink` plokk järgmisega:

```typescript
const siteUrl = Deno.env.get("SITE_URL") || req.headers.get("origin") || "https://rollo.lovable.app";
const { error: resetError } = await adminClient.auth.resetPasswordForEmail(
  targetData.user.email,
  { redirectTo: `${siteUrl}/set-password` }
);
```

See üks muudatus paneb parooli taastamise e-kirja tööle, kasutades Supabase vaikimisi e-posti teenust.

### Pärast parandust

Edge function tuleb uuesti deploy'ida, et muudatus jõustuks.

