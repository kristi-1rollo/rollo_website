
# ROLLO Veebileht - Lõplik Plaan

## Ülevaade
Üheleheküljeline professionaalne "visiitkaart" veebileht ROLLO robotile. Tume minimalistlik disain, suunatud investoritele ja klientidele. Peamine funktsioon: huviliste registreerimine Google Sheets'i kaudu.

---

## 1. Header (Navigatsioon)
- **Logo**: 1ROLLO valge logo (üleslaetud pilt)
- **Tagline**: "Your Intelligent Robot Security Guard"
- **CTA nupp**: "Get Early Access" (sinine, avab registreerimisvormi)

---

## 2. Hero Sektsioon (Animeeritud sissesõit)
**Sisenemisanimatsioon:**
- Robot ilmub kaugusest (väike, tumedana)
- Tuled süttivad ja vilguvad (valge pulseeriv glow)
- Robot sõidab sujuvalt lähedale (CSS scale + translateY)
- Tekst ilmub fade-in efektiga pärast roboti saabumist

**Sisu:**
- Pealkiri: "ROLLO: The World's First Commercial Autonomous One-Wheeled Robot"
- Kolm rolli: Security Guard | Courier | Multi-talent
- Tagline: "Making security services 10x cheaper, smarter, and more energy-efficient"

---

## 3. Features Sektsioon
Neli peamist eelist ikoonidega:
- 10x Cost Reduction (€2/h vs €20/h)
- Ultimate Maneuverability (üherattaline täpsus)
- 24/7 Operation (iseseisev patrull)
- AI-Powered Vision (360° intelligentne vaade)

---

## 4. Spetsifikatsioonide Sektsioon (Radiaalsed kiired + Glassmorphism)
**Animeeritud esitlus:**
- Robot staatiliselt keskel, perspektiiviga (pseudo-3D CSS)
- Seitse spetsifikatsiooni karti ümber roboti radiaalselt paigutatud
- Iga kaart ühendatud robotiga peene helendava joonega
- Kaardid ilmuvad järjestikku animeeritult (stagger effect)
- Hoveri peal joon ja kaart helendavad tugevamalt

**Glassmorphism kaardid:**
- Poolläbipaistev taust (rgba + blur)
- Peen valge serv
- Subtiisilne vari sügavuse jaoks

**Spetsifikatsioonid:**
- Dimensions: 60 x 60 x 140 cm
- Weight: 35 kg
- Speed: Up to 10 km/h
- Battery: Up to 8 h
- Sensors: Motion & object detection
- Charging: Automatic recharging
- Availability: Pilot projects from 2025

---

## 5. Use Cases (Kasutusalad)
Visuaalne grid 14 kasutusalaga:
- Public safety, Airport security, Hospitals, Hotels
- Mining/construction, Industrial plants, Critical infrastructure
- Oil/gas facilities, Campuses, Gated communities
- Smart homes, Water stations, Data centers, Police/military

---

## 6. Call-to-Action Sektsioon
- Pealkiri: "Ready to Transform Your Security Operations?"
- Tekst: "Join the waitlist for early access"
- Suur nupp: "Get Early Access"

---

## 7. Footer
- Kontakt: Raua 16-2, Viljandi, Estonia, 71020
- Telefon: +372 123 456 789
- Email: info@1rollo.com
- EU rahastamise logo

---

## 8. Registreerimise Modal
Modal-vorm "Get Early Access" nupule vajutades:

**Väljad:**
- Name (kohustuslik)
- Email (kohustuslik, valideeritud)
- Region (dropdown: 6 regiooni)
- Topics of Interest (16 checkboxi)
- Message (vabatahtlik)

**Integratsioon:**
- Lovable Cloud Edge Function võtab vastu andmed
- Edge Function kirjutab Google Sheets'i

---

## 9. Disain ja Stiil
- **Taust**: Sügav must (#0a0a0f)
- **Tekst**: Valge
- **Aktsent**: Sinine (#3b82f6)
- **Glassmorphism**: rgba(255,255,255,0.1) + backdrop-blur
- **Glow efektid**: box-shadow valge/sinisega
- **Font**: Minimalistlik sans-serif

---

## 10. Animatsioonid (CSS-põhised)
- **Hero robot**: scale + translateY sisenemisanimatsioon
- **Roboti tuled**: Pulseeriv box-shadow glow
- **Spec kaardid**: Staggered fade-in + scale
- **Kiired/jooned**: Animeeritud joonistamine (stroke-dashoffset)
- **Hover efektid**: Glow intensiivsuse kasv
- **CTA nupp**: Subtiiilne pulseerimine

---

## 11. Pildid ja Varad
- rollo1_uus.png, rollo2_uus.png, rollo3_uus.png (roboti pildid)
- 1Rollo_B_W.png (logo)
- eu-fund-logo.jpg (EU rahastamise logo)

---

## 12. Tehniline Teostus
- React komponendid
- Tailwind CSS tume teema + custom animatsioonid
- Lovable Cloud Edge Function (register-interest)
- Google Sheets API integratsioon
- Responsive disain (mobiil, tahvel, desktop)
