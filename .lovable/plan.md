## Probleem

Blog post `df24963d-…` sisaldab YouTube iframe’i:
```html
<div data-youtube-video=""><iframe src="https://www.youtube-nocookie.com/embed/94nZjwyQDaA?..."></iframe></div>
```

Preview’s töötab pärast viimast DOMPurify-fix’i, aga `https://new.1rollo.com/blog/...` (avaldatud versioon) jookseb veel vanal buildil, kus iframe filtreeritakse välja.

## Lahendus

1. **Avalda sait uuesti** — see on peamine põhjus, miks live URL-il videot pole.
2. **Tugevda `BlogPost.tsx` DOMPurify konfiguratsiooni**, et iframe’i põhilised atribuudid (`src`, `width`, `height`, `title`) säiliksid garanteeritult — praegune `ADD_ATTR` loend ei sisalda `src`-i otseselt.

### Failimuudatus

`src/pages/BlogPost.tsx` (`contentSections` useMemo) — lisa `src`, `width`, `height`, `title` `ADD_ATTR`-i:

```ts
DOMPurify.sanitize(s, {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: [
    "id","allow","allowfullscreen","frameborder","scrolling",
    "referrerpolicy","loading","src","width","height","title",
  ],
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel|ftp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
})
```

3. Pärast seda **publish uuesti**, et muudatus jõuaks `new.1rollo.com`-i.

## Eeldatav tulemus

YouTube embed renderdub nii preview’s kui avaldatud lehel.
