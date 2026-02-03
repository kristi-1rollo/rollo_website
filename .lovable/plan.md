
# Topics of Interest Checkboxes Uuendamine

## Ülevaade
Asendan praegused 16 teemat uute 16 teemaga registreerimise modalis. Validatsioon jääb samaks (vähemalt üks peab olema valitud).

---

## Muudatused

### Fail: `src/components/RegistrationModal.tsx`

**Rida 41-58** - Asendan `topicsOfInterest` massiivi uute teemadega:

```typescript
const topicsOfInterest = [
  "Public safety in the city",
  "Airport security",
  "Hospitals and Medical Facilities Security",
  "Hotels security",
  "Mining and construction equipment parking lots",
  "Industrial plants and manufacturing factories",
  "Critical infrastructure protection",
  "Oil and gas facilities, refineries, chemical plants",
  "Corporate and university campuses",
  "Gated communities, resorts, golf clubs",
  "Smart home, villa, luxury estate",
  "Water supply area stations and reservoirs",
  "Data centers",
  "Enhancing the work of the police force and military",
  "Investing in a business",
  "Other",
];
```

---

## Säilitatav loogika
- Zod validatsioon: `z.array(z.string()).min(1, "Please select at least one topic")` - jääb samaks
- Checkbox toggle funktsioon - jääb samaks
- Vormi esitamise loogika - jääb samaks
- Veateadete kuvamine - jääb samaks

---

## Tulemus
- 16 uut teemat õiges järjekorras
- Validatsioon nõuab vähemalt ühte valikut
- Kõik muu vormi loogika jääb muutmata
