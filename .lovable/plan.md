
Eesmärk: lahendada sinu 4 konkreetset muret korraga (Instagram jagamine, meedia optimeerimine, admini lisamise viga + parooli vood, drafti töökindlus) ja lisada testiplaan, et saaksid kindlalt kinnitada, et kõik töötab.

Mida ma koodist ja logidest tuvastasin:
1) Instagram jagamine: praegu nupp avab lihtsalt `instagram.com`, sest veebis ei ole ametlikku “pre-filled post/story share URL” mehhanismi nagu LinkedIn/Facebookil. See on platvormi piirang, mitte ainult sinu koodi viga.
2) Admini lisamise error: `manage-admin` backend-funktsioonis kasutatakse `auth.getClaims(token)`, mida selles SDK voos ei ole usaldusväärselt kasutusel; see põhjustabki katkise admini lisamise flow.
3) “Lisa admin emailiga” praegune loogika eeldab, et kasutaja konto juba eksisteerib. Kui kasutajat pole, tulebki “ei leitud” tüüpi olukord.
4) Drafti autosave on liiga habras: salvestab ainult 10s intervalliga. Kui katkestad enne esimest intervalli (või tab sulgub kiiresti), võib sisestatu kaduda.
5) Meedia optimeerimine puudub süsteemselt: üleslaadimisel läheb fail toorelt storage’i ja renderduses kasutatakse täisresolutsiooniga URL-e.

Rakendusplaan (teostusjärjekord):

1. Parandan admini haldusfunktsiooni autentimise ja kutsun flow turvaliseks
- Fail: `supabase/functions/manage-admin/index.ts`
- Asendan kasutaja kontrolli robustse serveripoolse kontrolliga (`auth.getUser()` auth headeriga), mitte klient-salvestuse ega hardcoded väärtustega.
- Säilitan rollikontrolli olemasoleva `has_role` funktsiooni kaudu (role on jätkuvalt eraldi `user_roles` tabelis).
- Jätan rollide mudeli puutumata (nagu nõutud: rollid eraldi tabelis, mitte profiles/users tabelis).

2. Teen “admini lisamine emailiga” päris kutsevooks (invite flow)
- Sama backend-funktsioonis lisan eraldi action’i, mis:
  - kui kasutajat pole: saadab kutsekirja parooli määramiseks;
  - kui kasutaja on olemas: lisab admin-rolli (kui puudub) ja saadab vajadusel parooli taastamise kirja.
- Lisan auditikirjed `admin_audit_log` tabelisse tegevustele:
  - `invite_admin`
  - `grant_admin`
  - `send_password_reset`
- Frontendis (`src/components/AdminUsersTab.tsx`) “Lisa admin” nupp hakkab kutsuma uut action’it ning näitab kasutajale selget staatust (kutse saadetud / roll lisatud / juba admin).

3. Lisan admini kasutajate vaatesse “Saada parooli taastamise kiri” nupu
- Fail: `src/components/AdminUsersTab.tsx`
- Iga kasutaja rea tegevuste hulka lisandub reset-email nupp.
- Nupp kutsub backend-funktsiooni uut action’it (`send_reset`) ja logib auditi.
- Turve:
  - ainult admin saab action’it teha (serveris kontrollitud),
  - tulemused auditeeritavad (kes, kellele, millal).

4. Teen Instagram jagamise UX-i realistlikuks ja arusaadavaks
- Fail: `src/pages/BlogPost.tsx`
- Eemaldan vale ootuse “Instagram share URL” osas:
  - Instagram nupu käitumine muutub “Copy + Open Instagram” flow’ks:
    1) kopeerib postituse lingi lõikelauale,
    2) avab Instagrami,
    3) kuvab toasti/sildi “Link copied, paste into story/bio”.
- Nii saab kasutaja päriselt kasutada jagamist platvormi piiranguid arvestades.

5. Teen draft-autosave’i töökindlaks (katkestuskindel)
- Fail: `src/components/BlogPostEditor.tsx`
- Muudan salvestuse intervallipõhisest “debounced on-change + lifecycle flush” mudeliks:
  - debounce ~800–1500ms iga muutuse järel;
  - lisasalvestus `beforeunload` ja `visibilitychange` sündmustel;
  - salvestus ka siis, kui komponent unmountib.
- Taastamise UX:
  - drafti olemasolul kuvatakse selge restore banner/modaal (mitte ainult browser `confirm`);
  - “Discard draft” nõuab teadlikku kinnitust;
  - edukal “Save” kustutan drafti.
- Lisan “Last saved at …” indikaatori, et oleks visuaalne kindlus.

6. Rakendan meedia automaatse optimeerimise üle lehe (et suured failid ei tapaks performance’it)
- Üleslaadimisel:
  - lisan piltidele client-side optimeerimise (resize + kvaliteet) enne uploadi;
  - vaikimisi konverteerin web-optimeeritud formaati (kus võimalik) ja piiran max dimensioone;
  - videodele lisan mõistliku piirangu/hoiatused (suured failid), sest browseris täis transcode on ebastabiilne.
- Renderdamisel:
  - kasutan optimeeritud pildi URL-i varianti (laiuse/quality järgi) blogikaartidel, detailvaates, galeriis, admini eelvaates;
  - lisan `loading="lazy"` + `decoding="async"` + sobiva `sizes` kõikidesse mitte-kriitilistesse piltidesse;
  - hero/LCP piltidele jätan prioriteetse laadimise.
- Eesmärk: vähendada allalaaditavat mahtu ilma visuaalset kvaliteeti lõhkumata.

7. Väiksed seotud parandused, mis vähendavad kõrvalvigu
- `BlogPost` tüüpi laiendan, et eemaldada `as any` castid thumbnail focal/zoom väljade ümber.
- See vähendab regressiooniriski pildi positsioneerimise ja salvestuse vahel.

Testiplaan (mida ma pärast kinnitamist läbi teen):
1) Admin invite E2E:
- sisene adminina,
- lisa uus email,
- kontrolli, et UI annab “kutse saadetud” kinnituse,
- kontrolli audit logi kirjet.
2) Existing user admin + reset E2E:
- lisa olemasolev kasutaja adminiks,
- käivita “saada parooli taastamise kiri”,
- kontrolli audit logi kirjeid.
3) Blog draft recovery E2E:
- alusta uue postituse kirjutamist,
- oota lühike hetk, sulge/refresh,
- ava editor uuesti ja taasta draft,
- kontrolli, et content + gallery + thumbnail state taastub.
4) Instagram share UX E2E:
- vajuta Instagram nuppu,
- kontrolli, et link kopeeritakse ja kasutaja saab selge juhise.
5) Meedia performance smoke-test:
- lae üles suur pilt,
- kontrolli, et salvestatud/kuvatav variant on optimeeritud,
- kontrolli blog list + post detail + gallery requestide mahtu.

Mõju ja riskid:
- Kõrge mõju: admini flow hakkab päriselt tööle; drafti kaod vähenevad; lehe performance paraneb.
- Keskmine risk: invite/reset email vood sõltuvad backend auth provideri emaili käitumisest; maandan selgete veateadete ja auditiga.
- Madal risk: Instagram osa on UX-parandus, mitte backend-sõltuvus.

Tehniline kokkuvõte failidest, mida muudan:
- `supabase/functions/manage-admin/index.ts` (auth fix + invite/reset actions + audit)
- `src/components/AdminUsersTab.tsx` (invite/reset UI ja veakäsitlus)
- `src/pages/BlogPost.tsx` (Instagram jagamise UX)
- `src/components/BlogPostEditor.tsx` (robust autosave/restore)
- `src/hooks/useBlogPosts.ts` (tüübi laiendus)
- meedia utiliidid ja piltide renderi kasutuskohad (blog list/post/gallery/admin preview) optimeeritud URL-ideks

Kui kinnitad, liigun kohe teostusse ja teen pärast ka reaalse kontrolltesti samm-sammult läbi.
