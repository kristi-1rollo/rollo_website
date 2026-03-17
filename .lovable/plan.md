
# EU rahastuse lehe link footerisse tagasi

## Probleem
Footeri "Supported by" sektsioonis on EU NextGenerationEU logo tavalises `div`-is (rida 120), mitte lingina. Kasutaja ei saa sealt enam EU rahastuse lehele navigeerida.

## Lahendus
Asendan footeri EU logo umber oleva `<div className="block">` elemendi `<Link to="/funding">` elemendiga, lisades hover-efekti (nagu on juba EDIA logol).

## Tehniline detail
- **Fail:** `src/components/Footer.tsx`, read 120-126
- Muudan `<div className="block">` asemele `<Link to="/funding" className="block group">` ja lisan pildile `group-hover:opacity-100 transition-opacity` klassid (sama muster mis EDIA logol real 133-139)
