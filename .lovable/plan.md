

## Blogi parandused -- tervikplaan

### 1. Rööpjoonduse (justify) lisamine

**RichTextEditor.tsx:**
- Lisada TextAlign konfiguratsioonile `alignments: ['left', 'center', 'right', 'justify']`
- Lisada tööriistaribale "Align Justify" nupp (lucide `AlignJustify` ikoon)

**BlogPost.tsx:**
- Lisada prose stiilide hulka justify tugi: `[&_p]:text-justify` vaikimisi või lasta joondus HTML-ist läbi tulla

### 2. Lõiguvahed ja pealkirjade vahed

**RichTextEditor.tsx:**
- Suurendada lõiguvahed: `[&_p]:mb-2` -> `[&_p]:mb-4`
- Lisada pealkirjade ülemised vahed: `[&_h1]:mt-8 [&_h2]:mt-6 [&_h3]:mt-5`

**BlogPost.tsx:**
- Sama loogika: suuremad lõiguvahed ja pealkirjavahed prose stiilides
- Lisada `[&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4`

### 3. Tühjad read (empty paragraphs) säilitamine

See on peamine tehniline probleem. TipTap vaikimisi eemaldab tühjad lõigud (`<p></p>`) või ahendab need kokku.

**RichTextEditor.tsx:**
- Konfigureerida StarterKit nii, et tühjad lõigud säiliksid: lisada `Paragraph` laiendus `keepOnSplit: true` seadistusega
- Lisada custom `handleKeyDown` et Enter-klahv looks uue tühja lõigu koos `<br class="ProseMirror-trailingBreak">` asemel tõelise tühja `<p>` elemendiga

**CSS (nii redaktoris kui BlogPost.tsx):**
- Lisada `[&_p:empty]:min-h-[1.5em]` stiil, et tühjad `<p>` elemendid saaksid visuaalse kõrguse ja ei kaoks ära
- Lisada `[&_p:empty]:before:content-['\\00a0']` et tühjad lõigud saaksid `&nbsp;` sisu ja renderduksid korrektselt

### 4. Lugemise edenemisriba

**Uus fail: `src/components/ReadingProgressBar.tsx`**
- Kerimise jälgimine `window.scrollY` abil
- Roheline (`#B4FF33`) riba lehe ülaosas, mis täitub kerimise protsendi järgi
- Fikseeritud positsioon (`fixed top-0`)

**BlogPost.tsx:**
- Importida ja lisada `ReadingProgressBar` komponendi artiklivaatesse

### 5. Automaatne sisukord

**Uus fail: `src/components/TableOfContents.tsx`**
- Parsida HTML sisust H2 ja H3 pealkirjad regex abil
- Genereerida igale pealkirjale slug-põhine `id`
- Kuvada klõpsitav sisukord ankurlinkidega

**BlogPost.tsx:**
- Lisada pealkirjadele automaatsed `id` atribuudid (HTML-i töötlemine enne `dangerouslySetInnerHTML` renderdamist)
- Kuvada sisukord artikli alguses

### 6. Lugemisaja indikaator

**BlogPost.tsx:**
- Arvutada sõnade arv sisust (`content.replace(/<[^>]+>/g, '').split(/\s+/).length`)
- Jagada ~200 sõna/min ja kuvada päises "X min read"

### Tehnilised detailid

**Muudetavad failid:**
- `src/components/RichTextEditor.tsx` -- justify, lõiguvahed, tühjad read
- `src/pages/BlogPost.tsx` -- prose stiilid, sisukord, lugemisaeg, progress bar, tühjad read
- `src/index.css` -- tühjade lõikude stiilid

**Uued failid:**
- `src/components/ReadingProgressBar.tsx`
- `src/components/TableOfContents.tsx`

Uusi sõltuvusi ei lisata. Kasutatakse olemasolevat Framer Motion teeki animatsioonideks.

