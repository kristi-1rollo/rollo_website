## Eesmärk
1. Lisa hõljuv tüpograafia tööriistariba (BubbleMenu), mis ilmub teksti valimisel kursori juurde — pole vaja üles scrollida.
2. Tee bullet/numbered listide reavahe väiksemaks kui tavalise teksti reavahe.

## Muudatused

### 1. `src/components/RichTextEditor.tsx`
- Impordi `BubbleMenu` paketist `@tiptap/react`.
- Renderda `<BubbleMenu editor={editor}>` editori juurde järgmiste kiirvalikutega:
  - Bold, Italic, Underline
  - H1, H2, H3
  - Bullet list, Ordered list
  - Link
- Stiil sobitub olemasoleva esteetikaga: `bg-popover border border-border rounded-[4px] shadow-lg p-1 flex items-center gap-0.5`.
- Aktiivse nupu rõhutus sama nagu top-toolbaril (lime accent).
- Kompaktsemad listi-stiilid `editorProps.attributes.class`-is:
  - Asenda `[&_li]:my-1` → `[&_li]:my-0.5`
  - Lisa `[&_li]:leading-tight`
  - Lisa `[&_li>p]:my-0` (eemaldab paragraph margin'i listi sees)
  - Lisa `[&_ul]:my-2 [&_ol]:my-2` (kompaktsem listi enda margin, asendades olemasoleva `mb-2`)

### 2. `src/pages/BlogPost.tsx`
- Sünkroniseeri `proseClasses` samade kompaktsete listi-stiilidega:
  - `[&_li]:my-0.5 [&_li]:leading-tight [&_li>p]:my-0 [&_ul]:my-2 [&_ol]:my-2`
- Nii näeb avalik blogi välja täpselt nagu redaktori eelvaade.

## Tehnilised märkused
- `@tiptap/react` on juba olemas — uut sõltuvust pole vaja.
- BubbleMenu kasutab Tippy.js'i, mis tuleb koos `@tiptap/react`-ga.
- Tavaparagraafi reavahe (`mb-4`) jääb samaks → selge visuaalne kontrast listi ja paragraafi vahel.
