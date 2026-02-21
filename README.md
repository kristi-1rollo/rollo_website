# Rollo - Teie digitaalne visiitkaart investoritele ja klientidele

## Projekti ülevaade

Rollo on kaasaegne veebirakendus, mis on loodud toimima digitaalse visiitkaardina investoritele ja tulevastele klientidele. See projekt demonstreerib meie võimekust luua visuaalselt atraktiivseid ja funktsionaalseid veebilahendusi, kasutades kaasaegseid tehnoloogiaid. Projekti eesmärk on pakkuda selget ja kokkuvõtlikku teavet meie teenuste, tehnoloogiate ja visiooni kohta.

## Tehnoloogiad

See projekt on ehitatud järgmiste tehnoloogiatega:

*   **Vite**: Kiire arenduskeskkond ja ehitustööriist.
*   **TypeScript**: Tüübitud JavaScript, mis parandab koodi kvaliteeti ja hooldatavust.
*   **React**: Populaarne JavaScripti teek kasutajaliideste loomiseks.
*   **shadcn-ui**: Kaasaegne UI komponentide teek.
*   **Tailwind CSS**: Utiliidipõhine CSS raamistik kiireks ja paindlikuks stiilimiseks.
*   **Supabase**: Avatud lähtekoodiga Firebase alternatiiv andmebaasi ja autentimise jaoks.

## Kohalik arenduskeskkond

Projekti käivitamiseks kohalikus arenduskeskkonnas järgige neid samme:

1.  **Klooni repositoorium:**
    ```bash
    git clone <TEIE_GIT_URL>
    cd rollo
    ```
2.  **Paigalda sõltuvused:**
    ```bash
    npm install
    # või kui kasutate bun'i:
    bun install
    ```
3.  **Seadista Supabase:**
    Veenduge, et teil on Supabase projekt seadistatud ja vajalikud keskkonnamuutujad (.env failis) on paigas. Näiteks:
    ```
    VITE_SUPABASE_URL=teie_supabase_url
    VITE_SUPABASE_ANON_KEY=teie_supabase_anon_key
    ```
4.  **Käivita arendusserver:**
    ```bash
    npm run dev
    # või kui kasutate bun'i:
    bun run dev
    ```

Projekt peaks nüüd olema ligipääsetav teie brauseris aadressil `http://localhost:5173` (või muu Vitesi poolt määratud pordi peal).

## Töövoog VS Code, Codexi ja Vibecodinguga

Selle projekti arendamisel on oluline hoida töövoog sujuv ja efektiivne. Soovitame:

*   **VS Code laiendused**: Kasutage laiendusi nagu Prettier (koodi vormindamiseks), ESLint (koodi analüüsiks) ja Tailwind CSS IntelliSense (kiiremaks stiilimiseks).
*   **Codex/AI assistent**: Kasutage Codexit või sarnast AI assistenti koodi genereerimiseks, refaktoriseerimiseks ja dokumenteerimiseks. See aitab kiirendada arendust ja vähendada korduvaid ülesandeid.
*   **Vibecoding**: Hoidke oma koodibaas puhas ja hästi organiseeritud. Regulaarsed koodiülevaatused ja testide kirjutamine aitavad säilitada kõrget kvaliteeti ja vähendada vigu. Püüdke hoida commitid väikesed ja keskenduda ühele funktsionaalsusele.

## Juurutamine (Deployment)

Projekt on loodud juurutamiseks Lovable platvormile. Lisateavet leiate Lovable dokumentatsioonist.

## Kaastöö

Ootame kaastööd! Kui soovite panustada, palun looge tõmbetaotlus (pull request) või avage probleem (issue).
