## Probleem

Kui klient saadab kontaktivormi, läheb `contact_notification` meil `info@1rollo.com`-i — aga Gmailis "Reply" vajutades läheb vastus `noreply@notify.1rollo.com` peale, mitte kliendi e-posti aadressile.

## Põhjus

`submit-registration` annab `replyTo: email` õigesti edasi `send-transactional-email`-ile, mis lisab selle ka queue payloadi (`reply_to`). **Aga `process-email-queue/index.ts` ei edasta `reply_to` välja `sendLovableEmail()` kutsele** — seal puudub rida `reply_to: payload.reply_to`. Seega Reply-To header ei jõua kunagi meilini.

## Lahendus

Üks väike muudatus `supabase/functions/process-email-queue/index.ts` real ~252-266: lisa `reply_to: payload.reply_to` `sendLovableEmail` argumentide objekti.

Seejärel deploy `process-email-queue` funktsioon.

## Tehnilised detailid

```ts
await sendLovableEmail(
  {
    run_id: payload.run_id,
    to: payload.to,
    from: payload.from,
    reply_to: payload.reply_to,   // ← lisa see rida
    sender_domain: payload.sender_domain,
    ...
  },
  { apiKey, sendUrl: ... }
)
```

Pärast seda: uus testesitus → notification meil saabub `info@1rollo.com`-i ja Gmailis Reply läheb kliendi aadressile.
