## Probleem
BubbleMenu kuvab valesti aktiivse oleku — nt "H2" nupp jääb rõhutatuks ka tavateksti peal. Põhjus: TipTap v3 BubbleMenu ei trigeri React re-renderit selectionchange'i peale, seega `editor.isActive(...)` otsene kutse renderdamise ajal annab vananenud tulemuse.

## Muudatused

### `src/components/RichTextEditor.tsx`
1. Impordi `useEditorState` paketist `@tiptap/react`.
2. Loo reaktiivne `editorState` objekt, mis jälgib kõiki BubbleMenu nuppude olekuid:
   ```tsx
   const editorState = useEditorState({
     editor,
     selector: (ctx) => ({
       isBold: ctx.editor?.isActive("bold") ?? false,
       isItalic: ctx.editor?.isActive("italic") ?? false,
       isUnderline: ctx.editor?.isActive("underline") ?? false,
       isH1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
       isH2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
       isH3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
       isBulletList: ctx.editor?.isActive("bulletList") ?? false,
       isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
       isLink: ctx.editor?.isActive("link") ?? false,
     }),
   });
   ```
3. Asenda BubbleMenu nuppude `active={editor.isActive(...)}` propid `editorState`-ist tulevate boolean-väärtustega (nt `active={editorState?.isH2}`).

## Mõju
- Top toolbar jääb puutumata (see töötas juba korralikult).
- Ühtegi uut paketti pole vaja — `useEditorState` on osa `@tiptap/react`-st.
- "H2" rõhutus ilmub ainult siis, kui kursor on tõesti H2 sees.