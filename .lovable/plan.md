
## Ühendatud admin paneel

Liidetakse blogi haldus ja registratsioonide vaade ühte admin lehte, kasutades tab-navigatsiooni.

### Mida tehakse

**1. Uus leht `src/pages/Admin.tsx`**
- Asendab praeguse `AdminBlog.tsx` lehe
- Tabs komponent kahe vahelehega:
  - **Blog** -- kogu praegune blogi halduse funktsionaalsus (postituste nimekiri, loomine, muutmine, kustutamine)
  - **Registrations** -- tabel kõigi kontaktivormi kirjadega (nimi, email, regioon, teemad, sonum, kuupaev)
- Yhine ylemine riba: pealkiri "Admin", Sign Out nupp
- Sama turvaloogika (useAuth, admin kontroll, redirect)

**2. Registratsioonide vaade**
- Parib andmed: `supabase.from('registrations').select('*').order('created_at', { ascending: false })`
- Tabel veergudega: nimi, email, regioon, teemad, sonum (laieneb klikkides), kuupaev
- Otsinguvalg nime/emaili jargi

**3. `src/App.tsx` muudatused**
- Asendatakse `AdminBlog` import uue `Admin` lehega
- Route `/admin/blog` -> `/admin` (voi moolemad toimivad)

**4. Kustutatakse `src/pages/AdminBlog.tsx`**
- Kogu funktsionaalsus kolib uude Admin lehte

### Tehniline detail
- Kasutatakse olemasolevat `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` komponente
- Registratsioonide paringule luuakse uus React Query hook `useRegistrations`
- RLS poliitika on juba paigas -- ainult admin saab registratsioone lugeda
- Andmebaasi muudatusi ei ole vaja
