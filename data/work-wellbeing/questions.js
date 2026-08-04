"use strict";

window.WORK_WELLBEING_TEST_ID = "werkbeleving::Werkbelevings- en welzijnstest";

window.WORK_WELLBEING_STATUSES = [
  {
    id: "student",
    label: "Student",
    description: "Mijn studie is momenteel mijn belangrijkste structurele activiteit.",
    shortLabel: "student"
  },
  {
    id: "employee",
    label: "Werkende",
    description: "Ik werk momenteel in loondienst binnen een organisatie.",
    shortLabel: "werkende"
  },
  {
    id: "working-student",
    label: "Werkende student",
    description: "Ik combineer structureel een opleiding met betaald werk.",
    shortLabel: "werkende student"
  },
  {
    id: "self-employed",
    label: "Zelfstandige of freelancer",
    description: "Ik werk voornamelijk voor eigen rekening, via opdrachten of als ondernemer.",
    shortLabel: "zelfstandige of freelancer"
  },
  {
    id: "not-working",
    label: "Niet-werkende",
    description: "Ik heb momenteel geen structureel betaald werk of voltijdse studie.",
    shortLabel: "niet-werkende"
  }
];

window.WORK_WELLBEING_FREQUENCY_CHOICES = [
  { value: 0, label: "Nooit", marker: "1" },
  { value: 1, label: "Zelden", marker: "2" },
  { value: 2, label: "Soms", marker: "3" },
  { value: 3, label: "Vaak", marker: "4" },
  { value: 4, label: "Altijd", marker: "5" }
];

window.WORK_WELLBEING_STATUS_CHOICES = window.WORK_WELLBEING_STATUSES.map((status, index) => ({
  value: status.id,
  label: status.label,
  description: status.description,
  marker: String(index + 1)
}));

const wwQuestion = (id, dimensionId, reverse, texts) => ({
  id,
  type: "frequency",
  dimensionId,
  reverse: Boolean(reverse),
  category: "Denk aan de afgelopen vier weken",
  instruction: "Hoe vaak kwam dit voor?",
  texts
});

window.WORK_WELLBEING_QUESTIONS = [
  {
    id: "WW-STATUS",
    type: "status",
    category: "Jouw huidige situatie",
    text: "Welke situatie sluit momenteel het best bij jou aan?",
    instruction: "Kies de kaart die je huidige situatie het beste beschrijft. De volgende vragen worden daarop afgestemd."
  },

  wwQuestion("WW-PRESSURE-01", "pressure", false, {
    student: "Ik had meer studietaken, lessen of deadlines dan ik binnen de beschikbare tijd goed kon verwerken.",
    employee: "Ik had meer werk of taken dan ik binnen de beschikbare tijd goed kon verwerken.",
    "working-student": "De combinatie van werk, studie en deadlines was groter dan ik binnen de beschikbare tijd goed kon verwerken.",
    "self-employed": "De hoeveelheid opdrachten, administratie of zakelijke verplichtingen was groter dan ik binnen de beschikbare tijd goed kon verwerken.",
    "not-working": "De hoeveelheid verplichtingen, administratie of zaken die ik moest regelen was groter dan ik goed kon verwerken."
  }),
  wwQuestion("WW-PRESSURE-02", "pressure", false, {
    student: "Ik moest mij haasten om opdrachten, lessen of examens voldoende voor te bereiden.",
    employee: "Ik moest mij haasten om mijn werk tijdig of voldoende goed af te krijgen.",
    "working-student": "Ik moest mij haasten om zowel mijn werk- als studieverplichtingen bij te houden.",
    "self-employed": "Ik moest mij haasten om opdrachten, klantenverwachtingen of administratie tijdig af te handelen.",
    "not-working": "Ik voelde tijdsdruk bij het uitvoeren van mijn dagelijkse verplichtingen of vervolgstappen."
  }),
  wwQuestion("WW-PRESSURE-03", "pressure", false, {
    student: "Ik voelde dat ik voortdurend moest doorgaan om niet achterop te raken.",
    employee: "Ik voelde dat ik voortdurend moest doorgaan om niet achterop te raken met mijn werk.",
    "working-student": "Ik voelde dat ik voortdurend moest doorgaan om op werk én in mijn studie niet achterop te raken.",
    "self-employed": "Ik voelde dat ik voortdurend moest doorgaan om opdrachten, inkomsten of zakelijke verplichtingen bij te houden.",
    "not-working": "Ik voelde dat ik voortdurend bezig moest blijven om mijn situatie onder controle te houden."
  }),

  wwQuestion("WW-AUTONOMY-01", "autonomy", false, {
    student: "Ik kon zelf mee bepalen wanneer en in welke volgorde ik mijn studietaken uitvoerde.",
    employee: "Ik kon zelf mee bepalen wanneer en in welke volgorde ik mijn werkzaamheden uitvoerde.",
    "working-student": "Ik kon mijn werk- en studieplanning voldoende op elkaar afstemmen.",
    "self-employed": "Ik kon zelf bepalen hoe ik mijn opdrachten en zakelijke werkzaamheden plande.",
    "not-working": "Ik kon zelf voldoende richting geven aan de indeling van mijn dagen."
  }),
  wwQuestion("WW-AUTONOMY-02", "autonomy", false, {
    student: "Ik had voldoende vrijheid om een studiemethode te gebruiken die bij mij paste.",
    employee: "Ik had voldoende vrijheid om mijn werk op een manier uit te voeren die bij de taak en bij mij paste.",
    "working-student": "Ik had voldoende vrijheid om mijn aanpak voor werk en studie aan mijn situatie aan te passen.",
    "self-employed": "Ik had voldoende vrijheid om mijn eigen aanpak en werkwijze te kiezen.",
    "not-working": "Ik had voldoende ruimte om zelf te bepalen hoe ik mijn doelen of vervolgstappen aanpakte."
  }),
  wwQuestion("WW-AUTONOMY-03", "autonomy", true, {
    student: "Belangrijke keuzes over mijn studieplanning werden genomen zonder dat ik daar zelf invloed op had.",
    employee: "Belangrijke keuzes over mijn werk werden genomen zonder dat ik daar zelf invloed op had.",
    "working-student": "Beslissingen over werk of studie beperkten mijn planning zonder dat ik daar voldoende invloed op had.",
    "self-employed": "Klanten of omstandigheden bepaalden mijn manier van werken zo sterk dat ik weinig eigen regelruimte overhield.",
    "not-working": "Andere personen, instanties of omstandigheden bepaalden mijn dagelijkse stappen zo sterk dat ik weinig eigen regie ervoer."
  }),

  wwQuestion("WW-SUPPORT-01", "support", false, {
    student: "Ik kon bij medestudenten, docenten of begeleiders terecht wanneer ik praktische hulp nodig had.",
    employee: "Ik kon bij collega’s of mijn leidinggevende terecht wanneer ik praktische hulp nodig had.",
    "working-student": "Ik kon bij relevante mensen op mijn werk of opleiding terecht wanneer ik praktische hulp nodig had.",
    "self-employed": "Ik kon bij klanten, samenwerkingspartners of mijn professionele netwerk terecht wanneer ik praktische hulp nodig had.",
    "not-working": "Ik kon bij mensen of begeleiders terecht wanneer ik praktische hulp nodig had."
  }),
  wwQuestion("WW-SUPPORT-02", "support", false, {
    student: "Ik voelde mij gesteund wanneer mijn studie moeilijk of zwaar aanvoelde.",
    employee: "Ik voelde mij gesteund wanneer mijn werk moeilijk of zwaar aanvoelde.",
    "working-student": "Ik voelde mij gesteund wanneer de combinatie van werk en studie moeilijk of zwaar aanvoelde.",
    "self-employed": "Ik voelde mij gesteund wanneer mijn werk als zelfstandige moeilijk of onzeker aanvoelde.",
    "not-working": "Ik voelde mij gesteund wanneer mijn huidige situatie moeilijk of zwaar aanvoelde."
  }),
  wwQuestion("WW-SUPPORT-03", "support", true, {
    student: "Wanneer problemen ontstonden in mijn studie, had ik het gevoel dat ik ze alleen moest oplossen.",
    employee: "Wanneer problemen ontstonden in mijn werk, had ik het gevoel dat ik ze alleen moest oplossen.",
    "working-student": "Wanneer problemen ontstonden in mijn werk of studie, had ik het gevoel dat ik ze alleen moest oplossen.",
    "self-employed": "Wanneer problemen ontstonden in mijn opdrachten of onderneming, had ik het gevoel dat ik er alleen voor stond.",
    "not-working": "Wanneer problemen ontstonden in mijn huidige situatie, had ik het gevoel dat ik ze alleen moest oplossen."
  }),

  wwQuestion("WW-CLARITY-01", "clarity", false, {
    student: "Het was duidelijk wat er bij opdrachten, lessen of examens van mij werd verwacht.",
    employee: "Het was duidelijk wat er in mijn werk van mij werd verwacht.",
    "working-student": "Het was duidelijk wat er zowel op mijn werk als in mijn studie van mij werd verwacht.",
    "self-employed": "Het was duidelijk wat klanten, opdrachtgevers of mijn onderneming van mij vroegen.",
    "not-working": "Het was duidelijk welke doelen of vervolgstappen in mijn huidige situatie belangrijk waren."
  }),
  wwQuestion("WW-CLARITY-02", "clarity", false, {
    student: "Ik wist welke studietaken op dat moment de hoogste prioriteit hadden.",
    employee: "Ik wist welke werkzaamheden op dat moment de hoogste prioriteit hadden.",
    "working-student": "Ik wist hoe ik de prioriteiten tussen werk, studie en privé moest afwegen.",
    "self-employed": "Ik wist welke opdrachten of zakelijke activiteiten op dat moment de hoogste prioriteit hadden.",
    "not-working": "Ik wist welke dagelijkse verplichtingen of vervolgstappen op dat moment de hoogste prioriteit hadden."
  }),
  wwQuestion("WW-CLARITY-03", "clarity", true, {
    student: "Ik kreeg tegenstrijdige of onduidelijke informatie over wat ik voor mijn studie moest doen.",
    employee: "Ik kreeg tegenstrijdige of onduidelijke informatie over wat ik in mijn werk moest doen.",
    "working-student": "Ik kreeg tegenstrijdige of onduidelijke verwachtingen vanuit mijn werk en opleiding.",
    "self-employed": "Ik kreeg tegenstrijdige of onduidelijke verwachtingen van klanten, opdrachtgevers of andere betrokkenen.",
    "not-working": "Ik kreeg tegenstrijdige of onduidelijke informatie over wat van mij werd verwacht."
  }),

  wwQuestion("WW-FAIRNESS-01", "fairness", false, {
    student: "Taken, kansen en aandacht werden binnen mijn studieomgeving op een eerlijke manier verdeeld.",
    employee: "Werk, kansen en middelen werden binnen mijn werkomgeving op een eerlijke manier verdeeld.",
    "working-student": "Verplichtingen en kansen werden binnen mijn werk- en studieomgeving op een eerlijke manier verdeeld.",
    "self-employed": "Afspraken, vergoedingen en verantwoordelijkheden werden in mijn professionele contacten op een eerlijke manier verdeeld.",
    "not-working": "Verplichtingen, ondersteuning en mogelijkheden werden in mijn huidige situatie op een eerlijke manier verdeeld."
  }),
  wwQuestion("WW-FAIRNESS-02", "fairness", false, {
    student: "Beslissingen die gevolgen hadden voor mijn studie werden op een begrijpelijke en zorgvuldige manier genomen.",
    employee: "Beslissingen die gevolgen hadden voor mijn werk werden op een begrijpelijke en zorgvuldige manier genomen.",
    "working-student": "Beslissingen die gevolgen hadden voor mijn werk of studie werden op een begrijpelijke en zorgvuldige manier genomen.",
    "self-employed": "Beslissingen van klanten of samenwerkingspartners die gevolgen hadden voor mijn werk werden op een begrijpelijke en zorgvuldige manier genomen.",
    "not-working": "Beslissingen van betrokken personen of instanties werden op een begrijpelijke en zorgvuldige manier genomen."
  }),
  wwQuestion("WW-FAIRNESS-03", "fairness", false, {
    student: "Ik werd door docenten, begeleiders en medestudenten respectvol behandeld.",
    employee: "Ik werd door collega’s en leidinggevenden respectvol behandeld.",
    "working-student": "Ik werd zowel op mijn werk als binnen mijn opleiding respectvol behandeld.",
    "self-employed": "Ik werd door klanten, opdrachtgevers en samenwerkingspartners respectvol behandeld.",
    "not-working": "Ik werd door mensen en instanties die bij mijn huidige situatie betrokken waren respectvol behandeld."
  }),

  wwQuestion("WW-SAFETY-01", "safety", false, {
    student: "Ik kon vragen stellen wanneer ik iets niet begreep, zonder bang te zijn negatief beoordeeld te worden.",
    employee: "Ik kon vragen stellen wanneer ik iets niet wist, zonder bang te zijn negatief beoordeeld te worden.",
    "working-student": "Ik kon op mijn werk en opleiding vragen stellen zonder bang te zijn negatief beoordeeld te worden.",
    "self-employed": "Ik kon in professionele contacten vragen stellen of onzekerheid tonen zonder dat dit direct tegen mij werkte.",
    "not-working": "Ik kon vragen stellen of aangeven dat ik iets niet begreep zonder bang te zijn negatief beoordeeld te worden."
  }),
  wwQuestion("WW-SAFETY-02", "safety", false, {
    student: "Ik kon fouten, problemen of zorgen over mijn studie openlijk bespreken.",
    employee: "Ik kon fouten, problemen of zorgen over mijn werk openlijk bespreken.",
    "working-student": "Ik kon problemen op mijn werk of in mijn studie openlijk bespreken.",
    "self-employed": "Ik kon fouten, problemen of onzekerheden in mijn professionele contacten openlijk bespreken.",
    "not-working": "Ik kon problemen of zorgen over mijn huidige situatie openlijk bespreken."
  }),
  wwQuestion("WW-SAFETY-03", "safety", true, {
    student: "Ik hield mijn mening soms voor mij omdat een afwijkend standpunt negatieve gevolgen kon hebben.",
    employee: "Ik hield mijn mening soms voor mij omdat een afwijkend standpunt negatieve gevolgen kon hebben.",
    "working-student": "Ik hield op mijn werk of opleiding mijn mening soms voor mij uit vrees voor negatieve gevolgen.",
    "self-employed": "Ik hield in professionele contacten mijn mening soms voor mij uit vrees een klant, opdracht of samenwerking te verliezen.",
    "not-working": "Ik hield mijn mening soms voor mij omdat een afwijkend standpunt negatieve gevolgen kon hebben."
  }),

  wwQuestion("WW-ENGAGEMENT-01", "engagement", false, {
    student: "Mijn studie gaf mij regelmatig energie om ermee verder te gaan.",
    employee: "Mijn werk gaf mij regelmatig energie om ermee verder te gaan.",
    "working-student": "Mijn werk of studie gaf mij regelmatig positieve energie.",
    "self-employed": "Mijn opdrachten of onderneming gaven mij regelmatig energie om ermee verder te gaan.",
    "not-working": "Mijn dagelijkse activiteiten of doelen gaven mij regelmatig energie om ermee verder te gaan."
  }),
  wwQuestion("WW-ENGAGEMENT-02", "engagement", false, {
    student: "Ik voelde mij oprecht betrokken bij wat ik in mijn studie deed.",
    employee: "Ik voelde mij oprecht betrokken bij wat ik in mijn werk deed.",
    "working-student": "Ik voelde mij oprecht betrokken bij mijn werk en/of studie.",
    "self-employed": "Ik voelde mij oprecht betrokken bij mijn opdrachten, klanten of onderneming.",
    "not-working": "Ik voelde mij oprecht betrokken bij de activiteiten en doelen waarmee ik bezig was."
  }),
  wwQuestion("WW-ENGAGEMENT-03", "engagement", false, {
    student: "Tijdens betekenisvolle studietaken ging ik zo op in mijn bezigheid dat de tijd snel voorbijging.",
    employee: "Tijdens betekenisvolle werkzaamheden ging ik zo op in mijn bezigheid dat de tijd snel voorbijging.",
    "working-student": "Tijdens betekenisvolle werk- of studietaken ging ik zo op in mijn bezigheid dat de tijd snel voorbijging.",
    "self-employed": "Tijdens betekenisvolle opdrachten ging ik zo op in mijn bezigheid dat de tijd snel voorbijging.",
    "not-working": "Tijdens betekenisvolle activiteiten ging ik zo op in mijn bezigheid dat de tijd snel voorbijging."
  }),

  wwQuestion("WW-SATISFACTION-01", "satisfaction", false, {
    student: "Over het algemeen was ik tevreden over mijn huidige studiesituatie.",
    employee: "Over het algemeen was ik tevreden over mijn huidige werksituatie.",
    "working-student": "Over het algemeen was ik tevreden over de manier waarop mijn werk- en studiesituatie waren georganiseerd.",
    "self-employed": "Over het algemeen was ik tevreden over mijn huidige professionele situatie.",
    "not-working": "Over het algemeen was ik tevreden over de inrichting van mijn huidige dagelijkse situatie."
  }),
  wwQuestion("WW-SATISFACTION-02", "satisfaction", false, {
    student: "De positieve kanten van mijn studie wogen voor mij zwaarder dan de negatieve kanten.",
    employee: "De positieve kanten van mijn werk wogen voor mij zwaarder dan de negatieve kanten.",
    "working-student": "De positieve kanten van mijn werk en studie wogen samen zwaarder dan de negatieve kanten.",
    "self-employed": "De positieve kanten van mijn werk als zelfstandige wogen voor mij zwaarder dan de negatieve kanten.",
    "not-working": "De positieve kanten van mijn huidige situatie wogen voor mij zwaarder dan de negatieve kanten."
  }),
  wwQuestion("WW-SATISFACTION-03", "satisfaction", true, {
    student: "Ik wenste regelmatig dat mijn studiesituatie fundamenteel anders was.",
    employee: "Ik wenste regelmatig dat mijn werksituatie fundamenteel anders was.",
    "working-student": "Ik wenste regelmatig dat de combinatie van mijn werk en studie fundamenteel anders was.",
    "self-employed": "Ik wenste regelmatig dat mijn professionele situatie fundamenteel anders was.",
    "not-working": "Ik wenste regelmatig dat mijn huidige dagelijkse situatie fundamenteel anders was."
  }),

  wwQuestion("WW-RECOVERY-01", "recovery", false, {
    student: "Na mijn studiedag kon ik mijn studie mentaal voldoende loslaten.",
    employee: "Na mijn werkdag kon ik mijn werk mentaal voldoende loslaten.",
    "working-student": "Na mijn verplichtingen kon ik werk en studie mentaal voldoende loslaten.",
    "self-employed": "Na mijn werk kon ik opdrachten, klanten en zakelijke zorgen mentaal voldoende loslaten.",
    "not-working": "Na mijn dagelijkse verplichtingen kon ik mijn zorgen en vervolgstappen mentaal voldoende loslaten."
  }),
  wwQuestion("WW-RECOVERY-02", "recovery", false, {
    student: "Mijn rustmomenten hielpen mij om opnieuw energie op te bouwen voor mijn studie.",
    employee: "Mijn rustmomenten hielpen mij om opnieuw energie op te bouwen voor mijn werk.",
    "working-student": "Mijn rustmomenten hielpen mij om opnieuw energie op te bouwen voor werk én studie.",
    "self-employed": "Mijn rustmomenten hielpen mij om opnieuw energie op te bouwen voor mijn professionele activiteiten.",
    "not-working": "Mijn rustmomenten hielpen mij om opnieuw energie op te bouwen voor mijn dagelijkse activiteiten."
  }),
  wwQuestion("WW-RECOVERY-03", "recovery", true, {
    student: "Ik begon aan een nieuwe studie- of lesdag terwijl ik nog onvoldoende hersteld was van de vorige.",
    employee: "Ik begon aan een nieuwe werkdag terwijl ik nog onvoldoende hersteld was van de vorige.",
    "working-student": "Ik begon aan een nieuwe werk- of studiedag terwijl ik nog onvoldoende hersteld was.",
    "self-employed": "Ik begon aan een nieuwe werkdag terwijl ik nog onvoldoende hersteld was van mijn eerdere inspanningen.",
    "not-working": "Ik begon aan een nieuwe dag terwijl ik nog onvoldoende hersteld was van eerdere belasting of zorgen."
  }),

  wwQuestion("WW-BALANCE-01", "balance", true, {
    student: "Mijn studie nam zoveel tijd of energie in beslag dat mijn privéleven eronder leed.",
    employee: "Mijn werk nam zoveel tijd of energie in beslag dat mijn privéleven eronder leed.",
    "working-student": "Werk en studie namen samen zoveel tijd of energie in beslag dat mijn privéleven eronder leed.",
    "self-employed": "Mijn opdrachten of onderneming namen zoveel tijd of energie in beslag dat mijn privéleven eronder leed.",
    "not-working": "Mijn verplichtingen of zorgen namen zoveel tijd of energie in beslag dat mijn privéleven eronder leed."
  }),
  wwQuestion("WW-BALANCE-02", "balance", false, {
    student: "Naast mijn studie hield ik voldoende tijd en energie over voor mijn persoonlijke behoeften.",
    employee: "Naast mijn werk hield ik voldoende tijd en energie over voor mijn persoonlijke behoeften.",
    "working-student": "Naast werk en studie hield ik voldoende tijd en energie over voor mijn persoonlijke behoeften.",
    "self-employed": "Naast mijn professionele activiteiten hield ik voldoende tijd en energie over voor mijn persoonlijke behoeften.",
    "not-working": "Naast mijn verplichtingen hield ik voldoende tijd en energie over voor mijn persoonlijke behoeften."
  }),
  wwQuestion("WW-BALANCE-03", "balance", true, {
    student: "Mijn studie bleef ook tijdens mijn vrije tijd voortdurend mijn aandacht opeisen.",
    employee: "Mijn werk bleef ook tijdens mijn vrije tijd voortdurend mijn aandacht opeisen.",
    "working-student": "Werk en studie bleven ook tijdens mijn vrije tijd voortdurend mijn aandacht opeisen.",
    "self-employed": "Mijn werk of onderneming bleef ook tijdens mijn vrije tijd voortdurend mijn aandacht opeisen.",
    "not-working": "Mijn verplichtingen of zorgen bleven ook tijdens mijn vrije tijd voortdurend mijn aandacht opeisen."
  })
];
