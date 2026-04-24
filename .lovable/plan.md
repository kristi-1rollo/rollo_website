## Probleem
`prose` ja `prose-invert` klassid on kasutuses nii `RichTextEditor.tsx` kui `BlogPost.tsx` failis, aga `@tailwindcss/typography` plugin pole `tailwind.config.ts` plugins-massiivis aktiveeritud. Tailwind preflight reset eemaldab `<ul>`, `<ol>` jt. vaikevormingud, mistõttu täpid (bullets) ja numbrid kaovad ning pealkirjad jäävad ilma vahedeta.

## Muudatused

### 1. `tailwind.config.ts`
- Lisan ülaossa: `import typography from "@tailwindcss/typography";`
- Muudan `plugins: [animate]` → `plugins: [animate, typography]`

### 2. `src/components/RichTextEditor.tsx` (rida 98-112)
Lisan olemasolevasse `editorProps.attributes.class` stringi täpsed list-fallbackid, et bullets/numbrid kuvaksid ka siis, kui `prose` failib:
- `[&_ul]:list-disc [&_ul]:pl-6`
- `[&_ol]:list-decimal [&_ol]:pl-6`
- `[&_li]:my-1`

### 3. `src/pages/BlogPost.tsx` (rida 37-50, `proseClasses`)
Sama loogika avalikule blogile — lisan:
- `[&_ul]:list-disc [&_ul]:pl-6`
- `[&_ol]:list-decimal [&_ol]:pl-6`
- `[&_li]:my-1 [&_li]:text-white/90`

Säilitan kogu ülejäänud premium-stiili (uppercase H2, lime-aktsendijooned, jne).

## Tulemus
- Admin TipTap redaktoris on bullets, numbrid ja H1/H2/H3 visuaalselt korrektsed.
- Avalikus blogis renderdub sama vorming identselt premium-aestheetikaga.
- Olemasolev memory `mem://design/blog-premium-aesthetic` reegleid ei muudeta.

## Failid
- `tailwind.config.ts`
- `src/components/RichTextEditor.tsx`
- `src/pages/BlogPost.tsx`