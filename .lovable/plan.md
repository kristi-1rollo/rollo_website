

# Fix: /set-password jääb "Linki töödeldakse…" vaatesse kinni

## Probleem

Supabase kasutab PKCE (Proof Key for Code Exchange) voogu parooli taastamiseks. See tähendab, et reset-lingist tulev redirect sisaldab URL-is `code` query parameetrit (mitte hash fragmenti). Praegune `SetPassword` lehekülg ootab ainult hash-põhist sessiooni taastamist (`onAuthStateChange` + `getSession`), aga **ei kutsu `exchangeCodeForSession(code)`**, mistõttu sessioon ei taastu kunagi ja leht jääb igaveseks laadima.

## Lahendus

Muuda `src/pages/SetPassword.tsx` — lisa `useEffect`-i loogika, mis:

1. Kontrollib URL-ist `code` query parameetrit
2. Kui `code` on olemas, kutsub `supabase.auth.exchangeCodeForSession(code)`
3. Kui kood puudub ja hash fragment on olemas, laseb olemasoleval `onAuthStateChange` loogikal tööd teha
4. Kui kumbagi pole, kuvab veateate (kehtetu link)
5. Lisab timeout (nt 10 sekundit), et mitte igavesti laadida — kuvab veateate

### Muudetav fail

**`src/pages/SetPassword.tsx`** — useEffect sees:

```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (session) setSessionReady(true);
    }
  );

  // Handle PKCE code exchange (password reset redirects with ?code=...)
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  if (code) {
    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      if (error) {
        setError("Link on aegunud või kehtetu. Palun taotle uus parooli taastamise link.");
      } else if (data.session) {
        setSessionReady(true);
      }
    });
  } else {
    // Fallback: check existing session (invite link or hash fragment)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });
  }

  // Timeout to avoid infinite loading
  const timeout = setTimeout(() => {
    setSessionReady((prev) => {
      if (!prev) setError("Link on aegunud või kehtetu.");
      return prev;
    });
  }, 10000);

  return () => {
    subscription.unsubscribe();
    clearTimeout(timeout);
  };
}, []);
```

Ainult see üks failimuudatus peaks probleemi lahendama.

