// Vocabulary data for Woordenschat Atelier

const vocabularyData = {
  // Formal words (60+)
  words: [
    { word: "Impliceren", definition: "Iets indirect suggereren of insluiten zonder het expliciet te zeggen", example: "Zijn opmerking impliceert dat hij het niet eens is." },
    { word: "Ad hoc", definition: "Voor dit specifieke doel; speciaal hiervoor gemaakt", example: "We hebben een ad hoc commissie gevormd." },
    { word: "Rudimentair", definition: "Eenvoudig, primitief of onvolledig ontwikkeld", example: "Hij heeft slechts rudimentaire kennis van het onderwerp." },
    { word: "Eclectisch", definition: "Samengesteld uit verschillende bronnen, stijlen of methoden", example: "Haar eclectische smaak combineert moderne en klassieke elementen." },
    { word: "Ambigue", definition: "Meerduidig; op verschillende manieren te interpreteren", example: "Zijn ambigue antwoord liet ruimte voor twijfel." },
    { word: "Pragmatisch", definition: "Praktisch ingesteld; gericht op wat werkt in de praktijk", example: "Een pragmatische oplossing voor het probleem." },
    { word: "Intrinsiek", definition: "Inherent; van nature erbij horend", example: "Motivatie is intrinsiek aan het leerproces." },
    { word: "Proloog", definition: "Inleiding of voorwoord van een boek, toneelstuk of gebeurtenis", example: "De proloog schetst de achtergrond van het verhaal." },
    { word: "Efemeer", definition: "Kortstondig; van voorbijgaande aard", example: "De roem van een virale video is efemeer." },
    { word: "Paradigma", definition: "Een denkmodel of voorbeeld dat als norm geldt", example: "Een paradigmaverschuiving in de wetenschap." },
    
    { word: "Connotatie", definition: "Bijbetekenis; associaties die een woord oproept", example: "Het woord 'huis' heeft een warme connotatie." },
    { word: "Deduceren", definition: "Afleiden door logisch redeneren", example: "Uit de feiten kunnen we deduceren wat er gebeurd is." },
    { word: "Redundant", definition: "Overbodig; meer dan nodig", example: "Die opmerking was volkomen redundant." },
    { word: "Coherent", definition: "Samenhangend en logisch opgebouwd", example: "Een coherent verhaal vertellen." },
    { word: "Discrepantie", definition: "Verschil of tegenstrijdigheid tussen zaken", example: "Er is een discrepantie tussen theorie en praktijk." },
    { word: "Eloquent", definition: "Welsprekend; mooi en overtuigend kunnen spreken", example: "Een eloquente spreker boeide het publiek." },
    { word: "Exponentieel", definition: "In snel toenemende mate; met steeds grotere snelheid groeiend", example: "De kosten stegen exponentieel." },
    { word: "Imminent", definition: "Dreigend; op het punt staand te gebeuren", example: "Een imminente crisis." },
    { word: "Impliciteren", definition: "Indirect of stilzwijgend insluiten", example: "Dat is in de regel geïmpliceerd." },
    { word: "Inherent", definition: "Wezenlijk erbij horend; van nature aanwezig", example: "Risico's zijn inherent aan ondernemen." },
    
    { word: "Juxtapositie", definition: "Het naast elkaar plaatsen van contrasterende elementen", example: "De juxtapositie van arm en rijk." },
    { word: "Legitimeren", definition: "Rechtvaardigen of wettigen", example: "Hij probeerde zijn handelen te legitimeren." },
    { word: "Magnanimiteit", definition: "Grootmoedigheid; edelmoedigheid", example: "Hij toonde magnanimiteit door zijn tegenstander te vergeven." },
    { word: "Notoir", definition: "Algemeen bekend (vaak in negatieve zin)", example: "Een notoire leugenaar." },
    { word: "Obsoleet", definition: "Verouderd; niet meer in gebruik", example: "Deze technologie is obsoleet geworden." },
    { word: "Paradoxaal", definition: "Schijnbaar tegenstrijdig maar toch waar", example: "Een paradoxale situatie." },
    { word: "Provoceren", definition: "Uitlokken of uitdagen", example: "Hij probeerde een reactie te provoceren." },
    { word: "Quintessentieel", definition: "De zuiverste of meest perfecte vorm", example: "Het quintessentiële voorbeeld van kunst." },
    { word: "Reciprook", definition: "Wederzijds; wederkerig", example: "Een reciproke relatie." },
    { word: "Substantieel", definition: "Belangrijk in omvang of betekenis; wezenlijk", example: "Een substantiële bijdrage." },
    
    { word: "Tangentieel", definition: "Zijdelings; slechts oppervlakkig gerelateerd", example: "Een tangentiële opmerking." },
    { word: "Ubiquiteus", definition: "Alomtegenwoordig", example: "Smartphones zijn ubiquiteus geworden." },
    { word: "Verifieren", definition: "Controleren of bevestigen", example: "De gegevens moeten geverifieerd worden." },
    { word: "Ambivalent", definition: "Tegenstrijdige gevoelens hebbend", example: "Ik ben ambivalent over deze keuze." },
    { word: "Catharsis", definition: "Emotionele reiniging of bevrijding", example: "Het verhaal bood catharsis voor de toeschouwer." },
    { word: "Dichotomie", definition: "Tweedeling; strikte scheiding in twee delen", example: "De dichotomie tussen goed en kwaad." },
    { word: "Empathie", definition: "Het vermogen je in te leven in een ander", example: "Empathie is essentieel voor goede zorg." },
    { word: "Faciliteren", definition: "Vergemakkelijken; mogelijk maken", example: "De organisatie faciliteert het leerproces." },
    { word: "Generen", definition: "Opwekken of voortbrengen", example: "Deze methode genereert nieuwe ideeën." },
    { word: "Hypocriet", definition: "Schijnheilig; anders doen dan zeggen", example: "Het is hypocriet om dit te beweren." },
    
    { word: "Indolent", definition: "Lui; traag; onverschillig", example: "Zijn indolente houding frustreerde zijn collega's." },
    { word: "Jargon", definition: "Vaktaal; specifieke terminologie van een groep", example: "Medisch jargon is vaak onbegrijpelijk." },
    { word: "Kampioen", definition: "Voorvechter; pleitbezorger (formeel)", example: "Hij is een kampioen van gelijke rechten." },
    { word: "Latent", definition: "Aanwezig maar nog niet zichtbaar; sluimerend", example: "Een latent talent." },
    { word: "Mediëren", definition: "Bemiddelen in een conflict", example: "Een neutrale partij kan mediëren." },
    { word: "Nuanceren", definition: "Verfijnen door kleine verschillen toe te voegen", example: "Het is belangrijk om je mening te nuanceren." },
    { word: "Oscilleren", definition: "Schommelen; heen en weer bewegen tussen twee posities", example: "De beslissing oscilleert tussen ja en nee." },
    { word: "Pertinent", definition: "Relevant; ter zake doend", example: "Een pertinente vraag stellen." },
    { word: "Quintessence", definition: "De essentie; het zuiverste en meest geconcentreerde", example: "Dit werk is de quintessence van zijn talent." },
    { word: "Reputatie", definition: "Aanzien; goede naam (formele context)", example: "Zijn reputatie staat op het spel." },
    
    { word: "Stringent", definition: "Strikt; nauwkeurig; dwingend", example: "Stringente regels toepassen." },
    { word: "Taciet", definition: "Stilzwijgend; zonder dat het uitgesproken wordt", example: "Een taciete afspraak." },
    { word: "Unanimiteit", definition: "Volledige overeenstemming; eensgezindheid", example: "De beslissing werd met unanimiteit genomen." },
    { word: "Volatile", definition: "Wisselvallig; snel veranderend", example: "De markt is zeer volatiel." },
    { word: "Willekeurig", definition: "Zonder bepaalde orde of reden (formele context)", example: "Een willekeurige selectie maken." },
    { word: "Xenofobie", definition: "Angst of afkeer van vreemdelingen", example: "Xenofobie is schadelijk voor de samenleving." },
    { word: "Zenit", definition: "Hoogtepunt; het hoogste punt", example: "Hij bereikte het zenit van zijn carrière." },
    { word: "Abjureren", definition: "Officieel afzweren of herroepen", example: "Hij moest zijn overtuigingen abjureren." },
    { word: "Arbitrair", definition: "Willekeurig; op grillige gronden gebaseerd", example: "Een arbitraire beslissing." },
    { word: "Corroboreren", definition: "Bevestigen of staven met bewijs", example: "De getuigen corroboreerden zijn verhaal." },
    
    { word: "Derivaat", definition: "Afgeleid product; iets dat voortkomt uit iets anders", example: "Dit woord is een derivaat van Latijn." },
    { word: "Erudiet", definition: "Geleerd; zeer ontwikkeld", example: "Een erudiete lezing geven." },
    { word: "Fluctueren", definition: "Schommelen; variëren", example: "De prijzen fluctueren sterk." },
    { word: "Hegemonie", definition: "Overheersing; leidende positie", example: "Culturele hegemonie uitoefenen." },
    { word: "Incidenteel", definition: "Bij toeval voorkomend; af en toe", example: "Incidentele fouten zijn normaal." },
    { word: "Jurist", definition: "Rechtsgeleerde (formele context)", example: "Een jurist raadplegen." }
  ],

  // Stylistic devices (30)
  figures: [
    { 
      name: "Metafoor", 
      definition: "Een verborgen vergelijking zonder 'als' of 'zoals'",
      example: "Tijd is geld.",
      choices: ["Metafoor", "Personificatie", "Hyperbool", "Ironie"],
      correct: 0
    },
    { 
      name: "Personificatie", 
      definition: "Menselijke eigenschappen geven aan niet-menselijke dingen",
      example: "De wind fluistert door de bomen.",
      choices: ["Metafoor", "Personificatie", "Alliteratie", "Eufemisme"],
      correct: 1
    },
    { 
      name: "Hyperbool", 
      definition: "Overdrijving om nadruk te leggen",
      example: "Ik heb je duizend keer gezegd...",
      choices: ["Litotes", "Hyperbool", "Ironie", "Metafoor"],
      correct: 1
    },
    { 
      name: "Ironie", 
      definition: "Het tegenovergestelde bedoelen van wat je zegt",
      example: "Wat een prachtig weer! (terwijl het regent)",
      choices: ["Sarcasme", "Ironie", "Eufemisme", "Paradox"],
      correct: 1
    },
    { 
      name: "Alliteratie", 
      definition: "Herhaling van beginmedeklinkers",
      example: "De kat krabt de krullen van de trap.",
      choices: ["Assonantie", "Alliteratie", "Anafoor", "Rijm"],
      correct: 1
    },
    { 
      name: "Eufemisme", 
      definition: "Verzachtende of verhullende uitdrukking",
      example: "Hij is van ons heengegaan (= overleden).",
      choices: ["Eufemisme", "Hyperbool", "Litotes", "Metonymie"],
      correct: 0
    },
    { 
      name: "Anafoor", 
      definition: "Herhaling van een woord aan het begin van opeenvolgende zinnen",
      example: "Nooit meer oorlog. Nooit meer geweld. Nooit meer verdriet.",
      choices: ["Epistrofe", "Anafoor", "Parallelisme", "Chiasme"],
      correct: 1
    },
    { 
      name: "Allegorie", 
      definition: "Doorlopende metafoor; verhaal met verborgen betekenis",
      example: "Animal Farm van Orwell (over politiek)",
      choices: ["Parabel", "Allegorie", "Symbool", "Metafoor"],
      correct: 1
    },
    { 
      name: "Paradox", 
      definition: "Schijnbare tegenstrijdigheid die diepere waarheid bevat",
      example: "Minder is meer.",
      choices: ["Paradox", "Oxymoron", "Ironie", "Antithese"],
      correct: 0
    },
    { 
      name: "Litotes", 
      definition: "Bevestigen door het tegenovergestelde te ontkennen (understatement)",
      example: "Dat is niet onverstandig (= verstandig).",
      choices: ["Eufemisme", "Ironie", "Litotes", "Hyperbool"],
      correct: 2
    },
    
    { 
      name: "Symboliek", 
      definition: "Object dat voor iets anders staat",
      example: "Een duif als symbool voor vrede.",
      choices: ["Metafoor", "Symboliek", "Allegorie", "Personificatie"],
      correct: 1
    },
    { 
      name: "Assonantie", 
      definition: "Herhaling van klinkers",
      example: "De regen plensde neer.",
      choices: ["Alliteratie", "Assonantie", "Consonantie", "Rijm"],
      correct: 1
    },
    { 
      name: "Antithese", 
      definition: "Tegenstelling tussen twee begrippen",
      example: "Groot versus klein, rijk versus arm.",
      choices: ["Paradox", "Antithese", "Chiasme", "Parallelisme"],
      correct: 1
    },
    { 
      name: "Retorische vraag", 
      definition: "Vraag waarop geen antwoord verwacht wordt",
      example: "Wie wil er nu niet gelukkig zijn?",
      choices: ["Retorische vraag", "Vraagstelling", "Interrogatie", "Apostrofe"],
      correct: 0
    },
    { 
      name: "Oxymoron", 
      definition: "Combinatie van twee tegenstrijdige begrippen",
      example: "Oorverdovende stilte.",
      choices: ["Paradox", "Antithese", "Oxymoron", "Ironie"],
      correct: 2
    },
    { 
      name: "Metonymie", 
      definition: "Vervangen van woord door gerelateerd begrip",
      example: "Het Witte Huis besloot... (= de president).",
      choices: ["Synecdoche", "Metonymie", "Metafoor", "Symboliek"],
      correct: 1
    },
    { 
      name: "Synecdoche", 
      definition: "Deel voor geheel of geheel voor deel",
      example: "Alle handen aan dek (= alle mensen).",
      choices: ["Metonymie", "Synecdoche", "Metafoor", "Personificatie"],
      correct: 1
    },
    { 
      name: "Chiasme", 
      definition: "Kruisgewijze herhaling van zinsdelen",
      example: "Je moet eten om te leven, niet leven om te eten.",
      choices: ["Parallelisme", "Anafoor", "Chiasme", "Antithese"],
      correct: 2
    },
    { 
      name: "Climax", 
      definition: "Oplopende reeks; stijgende lijn naar hoogtepunt",
      example: "Goed, beter, best.",
      choices: ["Climax", "Anticlimax", "Gradatie", "Hyperbool"],
      correct: 0
    },
    { 
      name: "Apostrofe", 
      definition: "Directe aanspraak van afwezige of dode persoon/ding",
      example: "O Nederland, land van mijn vaderen!",
      choices: ["Apostrofe", "Anafoor", "Retorische vraag", "Uitroep"],
      correct: 0
    },
    
    { 
      name: "Parallelisme", 
      definition: "Herhaling van zinsbouw",
      example: "Hij kwam, hij zag, hij overwon.",
      choices: ["Anafoor", "Parallelisme", "Chiasme", "Herhaling"],
      correct: 1
    },
    { 
      name: "Enjambement", 
      definition: "Doorlopen van zin over versregel heen",
      example: "De bloemen staan / in volle bloei.",
      choices: ["Caesuur", "Enjambement", "Rijm", "Versregel"],
      correct: 1
    },
    { 
      name: "Onomatopee", 
      definition: "Klanknabootsing",
      example: "De bij zoemt, de kat miauwt.",
      choices: ["Alliteratie", "Assonantie", "Onomatopee", "Rijm"],
      correct: 2
    },
    { 
      name: "Ellips", 
      definition: "Weglating van woorden die uit context blijken",
      example: "Hoe oud? Vijftien. (Hoe oud ben je?)",
      choices: ["Ellips", "Verkorting", "Afbreking", "Synecdoche"],
      correct: 0
    },
    { 
      name: "Vergelijking", 
      definition: "Expliciete vergelijking met 'als' of 'zoals'",
      example: "Zo wit als sneeuw.",
      choices: ["Metafoor", "Vergelijking", "Symboliek", "Beeld"],
      correct: 1
    },
    { 
      name: "Epistrofe", 
      definition: "Herhaling van woord aan einde van opeenvolgende zinnen",
      example: "Dit moeten we doen. Dit willen we doen. Dit gaan we doen.",
      choices: ["Anafoor", "Epistrofe", "Parallelisme", "Herhaling"],
      correct: 1
    },
    { 
      name: "Archaïsme", 
      definition: "Gebruik van verouderde woorden of uitdrukkingen",
      example: "Alzo sprak hij (= zo sprak hij).",
      choices: ["Neologisme", "Archaïsme", "Jargon", "Dialect"],
      correct: 1
    },
    { 
      name: "Zeugma", 
      definition: "Eén werkwoord dat op verschillende betekenis slaat",
      example: "Hij verloor zijn sleutels en zijn geduld.",
      choices: ["Zeugma", "Ellips", "Synecdoche", "Metonymie"],
      correct: 0
    },
    { 
      name: "Anticlimax", 
      definition: "Dalende reeks; van belangrijk naar onbelangrijk",
      example: "De keizer, de koning, de voetballer.",
      choices: ["Climax", "Anticlimax", "Ironie", "Hyperbool"],
      correct: 1
    },
    { 
      name: "Pleonasme", 
      definition: "Onnodige herhaling ter versterking",
      example: "Hij zag het met eigen ogen.",
      choices: ["Tautologie", "Pleonasme", "Redundantie", "Herhaling"],
      correct: 1
    }
  ]
};
