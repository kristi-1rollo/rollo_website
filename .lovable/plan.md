

## Muudatused

### 1. Product lehelt "Drones" eemaldamine

"Intelligent Situational Awareness" sektsioonis (rida 262-276) on tuvastamiste nimekirjas "Drones" -- see eemaldatakse loendist.

### 2. Pricing sektsiooni tapsustamine

Praegune Pricing sektsioon (read 456-505) asendatakse parema struktuuriga:
- Selgem pealkiri ja selgitav tekst: "The expected monthly rental price for the ROLLO F6 is below USD 4,000 (all-inclusive service)."
- Kolm kaarti jaavad, aga lisatakse "all-inclusive service" taend hinna juurde
- Tellimuste vastuvott: "Customer order intake is scheduled to begin in the second half of 2026."
- Tarned: "Customer deliveries are expected to begin in 2027."

### 3. Headerisse Contact nupp

Desktop navigatsioonile (rida 88-111) lisatakse parast nav-linke eraldi "Contact" nupp [#B4FF33] taustavarvi ja mustade tahtedega, mis viib `/contact` lehele.

Mobiilimenuusse lisatakse samuti "Contact" link teiste navigatsioonilinke jargides.

### Tehnilised detailid

**Muudetavad failid:**
- `src/pages/Product.tsx` -- eemaldada "Drones" nimekirjast (rida 268), tapsustada Pricing sektsiooni tekste
- `src/components/Header.tsx` -- lisada Contact nupp desktop navisse ja mobiilimenuusse

