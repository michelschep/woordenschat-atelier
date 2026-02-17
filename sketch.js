// Woordenschat Atelier - Main Game Logic

let currentItem = null;
let currentMode = null;
let allItems = [];
let learnedItems = [];
let reviewItems = [];
let currentIndex = 0;
let cardY = 200;
let cardScale = 1;
let isRevealed = false;

// Colors
const COLORS = {
  sage: '#8B9D83',
  rose: '#C9ADA7',
  mauve: '#9A8C98',
  teal: '#A8DADC',
  text: '#4A4A4A',
  lightBg: '#FAF8F5'
};

function setup() {
  const canvas = createCanvas(min(windowWidth - 40, 700), 300);
  canvas.parent('canvas-container');
  
  loadProgress();
  prepareItems();
  
  // Event listeners
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('reset-btn').addEventListener('click', resetProgress);
  document.getElementById('reveal-btn').addEventListener('click', revealAnswer);
  document.getElementById('check-btn').addEventListener('click', checkAnswer);
  document.getElementById('learned-btn').addEventListener('click', markAsLearned);
  document.getElementById('review-btn').addEventListener('click', markForReview);
  document.getElementById('skip-btn').addEventListener('click', nextCard);
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  
  // Enter key for quiz mode
  document.getElementById('answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
  });
  
  updateProgress();
}

function draw() {
  background(COLORS.lightBg);
  
  if (currentItem && document.getElementById('card-screen').classList.contains('hidden') === false) {
    drawCard();
  }
}

function drawCard() {
  push();
  translate(width / 2, cardY);
  
  // Card shadow
  fill(0, 0, 0, 20);
  noStroke();
  rectMode(CENTER);
  rect(5, 5, 500 * cardScale, 220 * cardScale, 20);
  
  // Card
  fill(255);
  stroke(COLORS.sage);
  strokeWeight(3);
  rect(0, 0, 500 * cardScale, 220 * cardScale, 20);
  
  // Content
  fill(COLORS.text);
  noStroke();
  textAlign(CENTER, CENTER);
  
  if (currentMode === 'flashcard') {
    // Show word
    textSize(48 * cardScale);
    textStyle(BOLD);
    text(currentItem.word, 0, -40 * cardScale);
    
    if (currentItem.example) {
      textSize(14 * cardScale);
      textStyle(NORMAL);
      fill(COLORS.mauve);
      text(`"${currentItem.example}"`, 0, 20 * cardScale, 450 * cardScale);
    }
    
    if (isRevealed) {
      textSize(18 * cardScale);
      textStyle(NORMAL);
      fill(COLORS.sage);
      text(currentItem.definition, 0, 70 * cardScale, 450 * cardScale);
    }
  } else if (currentMode === 'quiz') {
    // Show definition
    textSize(16 * cardScale);
    textStyle(NORMAL);
    text("Wat is dit woord?", 0, -70 * cardScale);
    
    textSize(22 * cardScale);
    textStyle(BOLD);
    fill(COLORS.sage);
    text(currentItem.definition, 0, -10 * cardScale, 450 * cardScale);
    
    if (currentItem.example) {
      textSize(14 * cardScale);
      textStyle(ITALIC);
      fill(COLORS.mauve);
      text(`"${currentItem.example}"`, 0, 60 * cardScale, 450 * cardScale);
    }
  } else if (currentMode === 'multiple-choice') {
    // Show stylistic figure question
    textSize(16 * cardScale);
    textStyle(NORMAL);
    text("Welk stijlfiguur zie je hier?", 0, -70 * cardScale);
    
    textSize(24 * cardScale);
    textStyle(BOLD);
    fill(COLORS.sage);
    text(`"${currentItem.example}"`, 0, 0, 450 * cardScale);
    
    textSize(14 * cardScale);
    textStyle(NORMAL);
    fill(COLORS.mauve);
    text(currentItem.definition, 0, 70 * cardScale, 450 * cardScale);
  }
  
  pop();
}

function prepareItems() {
  let tempItems = [];
  
  // Mix words and figures
  vocabularyData.words.forEach(word => {
    // Randomly assign flashcard or quiz mode
    const mode = random() > 0.5 ? 'flashcard' : 'quiz';
    tempItems.push({
      type: 'word',
      mode: mode,
      ...word
    });
  });
  
  vocabularyData.figures.forEach(figure => {
    tempItems.push({
      type: 'figure',
      mode: 'multiple-choice',
      ...figure
    });
  });
  
  // Shuffle all items
  tempItems = shuffle(tempItems);
  
  // Add review items first (prioritize learning)
  allItems = [];
  reviewItems.forEach(reviewKey => {
    const item = [...vocabularyData.words, ...vocabularyData.figures].find(i => 
      (i.word === reviewKey || i.name === reviewKey)
    );
    if (item) {
      const mode = item.word ? (random() > 0.5 ? 'flashcard' : 'quiz') : 'multiple-choice';
      allItems.push({
        type: item.word ? 'word' : 'figure',
        mode: mode,
        ...item
      });
    }
  });
  
  // Add new items (not yet learned)
  tempItems.forEach(item => {
    const key = item.type === 'word' ? item.word : item.name;
    if (!learnedItems.includes(key) && !reviewItems.includes(key)) {
      allItems.push(item);
    }
  });
  
  // Limit to 20 items per session
  allItems = allItems.slice(0, 20);
}

function startGame() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('card-screen').classList.remove('hidden');
  
  if (allItems.length === 0) {
    showCompleteScreen();
    return;
  }
  
  loadCard(0);
}

function loadCard(index) {
  if (index >= allItems.length) {
    showCompleteScreen();
    return;
  }
  
  currentIndex = index;
  currentItem = allItems[index];
  currentMode = currentItem.mode;
  isRevealed = false;
  
  // Reset UI
  hideAllModes();
  document.getElementById('action-buttons').classList.add('hidden');
  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('answer-input').value = '';
  
  // Show appropriate mode
  if (currentMode === 'flashcard') {
    document.getElementById('flashcard-mode').classList.remove('hidden');
  } else if (currentMode === 'quiz') {
    document.getElementById('quiz-mode').classList.remove('hidden');
    document.getElementById('answer-input').focus();
  } else if (currentMode === 'multiple-choice') {
    document.getElementById('choice-mode').classList.remove('hidden');
    setupChoices();
  }
  
  // Animate card entrance
  cardY = -100;
  cardScale = 0.8;
}

function hideAllModes() {
  document.getElementById('flashcard-mode').classList.add('hidden');
  document.getElementById('quiz-mode').classList.add('hidden');
  document.getElementById('choice-mode').classList.add('hidden');
}

function revealAnswer() {
  isRevealed = true;
  document.getElementById('reveal-btn').style.display = 'none';
  
  // Show educational feedback
  const feedback = document.getElementById('feedback');
  feedback.classList.remove('hidden');
  feedback.className = 'feedback correct';
  
  // Create full explanation
  let explanation = `<strong>📖 ${currentItem.word}</strong><br><br>`;
  explanation += `<strong>Betekenis:</strong><br>${currentItem.definition}<br><br>`;
  explanation += `<strong>Voorbeeld in context:</strong><br><em>"${currentItem.example}"</em><br><br>`;
  explanation += `<strong>💡 Wanneer gebruiken?</strong><br>`;
  explanation += `Dit woord komt vaak voor in formele teksten en professionele communicatie. `;
  explanation += `Het wordt gebruikt om ideeën genuanceerd en precies uit te drukken. `;
  explanation += `Probeer het deze week eens te gebruiken in een e-mail of gesprek!`;
  
  feedback.innerHTML = explanation;
  document.getElementById('action-buttons').classList.remove('hidden');
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
  const correctAnswer = currentItem.word.toLowerCase();
  
  const feedback = document.getElementById('feedback');
  feedback.classList.remove('hidden');
  
  // Check with some tolerance for accents and spelling
  const isClose = userAnswer === correctAnswer || 
                  userAnswer.replace(/[éèê]/g, 'e') === correctAnswer.replace(/[éèê]/g, 'e');
  
  let explanation = '';
  
  if (isClose) {
    explanation += `<strong>✓ Uitstekend!</strong><br><br>`;
    explanation += `<strong>📖 ${currentItem.word}</strong><br><br>`;
    explanation += `<strong>Betekenis:</strong><br>${currentItem.definition}<br><br>`;
    explanation += `<strong>Voorbeeld in context:</strong><br><em>"${currentItem.example}"</em><br><br>`;
    explanation += `<strong>💡 Waarom goed?</strong><br>`;
    explanation += `Je herkende de definitie correct! Dit woord wordt vaak gebruikt in formele situaties en academische teksten. `;
    explanation += `Het helpt om ideeën precies en genuanceerd uit te drukken.`;
    feedback.className = 'feedback correct';
  } else {
    explanation += `<strong>📖 Het juiste woord is: ${currentItem.word}</strong><br><br>`;
    explanation += `<strong>Betekenis:</strong><br>${currentItem.definition}<br><br>`;
    explanation += `<strong>Voorbeeld in context:</strong><br><em>"${currentItem.example}"</em><br><br>`;
    
    if (userAnswer) {
      explanation += `<strong>💡 Let op:</strong><br>`;
      explanation += `Je antwoordde "${userAnswer}". `;
      explanation += `Onthoud: "${currentItem.word}" verwijst specifiek naar ${currentItem.definition.toLowerCase()}. `;
      explanation += `Probeer het woord te koppelen aan het voorbeeld - lees de voorbeeldzin een paar keer hardop voor.`;
    } else {
      explanation += `<strong>💡 Onthoudtip:</strong><br>`;
      explanation += `Lees de definitie en voorbeeldzin nog eens goed door. `;
      explanation += `Probeer een eigen zinnetje te bedenken met "${currentItem.word}" om het beter te onthouden.`;
    }
    
    explanation += `<br><br><strong>Wanneer gebruiken?</strong><br>`;
    explanation += `Dit woord past goed in formele schrijfsituaties zoals rapportages, essays of zakelijke e-mails.`;
    
    feedback.className = 'feedback incorrect';
  }
  
  feedback.innerHTML = explanation;
  document.getElementById('check-btn').style.display = 'none';
  document.getElementById('action-buttons').classList.remove('hidden');
}

function setupChoices() {
  const container = document.getElementById('choices-container');
  container.innerHTML = '';
  
  currentItem.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectChoice(index, btn));
    container.appendChild(btn);
  });
}

function selectChoice(selectedIndex, btnElement) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(btn => btn.style.pointerEvents = 'none');
  
  const correctAnswer = currentItem.choices[currentItem.correct];
  
  if (selectedIndex === currentItem.correct) {
    btnElement.classList.add('correct');
    setTimeout(() => {
      const feedback = document.getElementById('feedback');
      let explanation = `<strong>✓ Prima gedaan!</strong><br><br>`;
      explanation += `<strong>📖 ${currentItem.name}</strong><br><br>`;
      explanation += `<strong>Definitie:</strong><br>${currentItem.definition}<br><br>`;
      explanation += `<strong>Het voorbeeld:</strong><br><em>"${currentItem.example}"</em><br><br>`;
      explanation += `<strong>💡 Waarom is dit ${correctAnswer}?</strong><br>`;
      explanation += getStyleExplanation(currentItem.name, currentItem.example);
      explanation += `<br><br><strong>Toepassing:</strong><br>`;
      explanation += `Je kunt deze stijlfiguur gebruiken om je teksten expressiever, levendiger of overtuigender te maken.`;
      feedback.innerHTML = explanation;
      feedback.className = 'feedback correct';
      feedback.classList.remove('hidden');
      document.getElementById('action-buttons').classList.remove('hidden');
    }, 500);
  } else {
    btnElement.classList.add('incorrect');
    buttons[currentItem.correct].classList.add('correct');
    setTimeout(() => {
      const feedback = document.getElementById('feedback');
      const wrongAnswer = currentItem.choices[selectedIndex];
      let explanation = `<strong>📖 Het juiste antwoord is: ${correctAnswer}</strong><br><br>`;
      explanation += `<strong>Wat is ${currentItem.name}?</strong><br>${currentItem.definition}<br><br>`;
      explanation += `<strong>Het voorbeeld:</strong><br><em>"${currentItem.example}"</em><br><br>`;
      explanation += `<strong>💡 Waarom ${correctAnswer} en niet ${wrongAnswer}?</strong><br>`;
      explanation += getComparisonExplanation(correctAnswer, wrongAnswer, currentItem.name, currentItem.example);
      explanation += `<br><br><strong>Onthoudtip:</strong><br>`;
      explanation += `${getMemoryTip(currentItem.name)}`;
      feedback.innerHTML = explanation;
      feedback.className = 'feedback incorrect';
      feedback.classList.remove('hidden');
      document.getElementById('action-buttons').classList.remove('hidden');
    }, 500);
  }
}

function getMemoryTip(styleName) {
  const tips = {
    'Metafoor': 'Metafoor = verborgen vergelijking. Als je "als" of "zoals" ziet, is het GEEN metafoor.',
    'Personificatie': 'Personificatie = persoon maken. Denk: kan een ding dit eigenlijk doen? Nee? Dan is het personificatie.',
    'Hyperbool': 'Hyperbool = overdrijving. Letterlijk onmogelijk maar wel duidelijk bedoeld.',
    'Ironie': 'Ironie = tegenovergestelde bedoelen. Let op de context en toon.',
    'Alliteratie': 'Alliteratie = beginletters hetzelfde. Luister naar de eerste klanken.',
    'Eufemisme': 'Eufemisme = verzachten. Een vriendelijkere manier om iets naars te zeggen.',
    'Anafoor': 'Anafoor = herhaling aan het BEGIN. Epistrofe is aan het einde.',
    'Allegorie': 'Allegorie = doorlopend verhaal met verborgen betekenis. Hele verhaal is symbolisch.',
    'Paradox': 'Paradox = lijkt tegenstrijdig maar klopt toch. "Minder is meer".',
    'Litotes': 'Litotes = ontkenning van het tegenovergestelde. "Niet onverstandig" = verstandig.',
    'Symboliek': 'Symboliek = staat voor iets anders. Object heeft diepere betekenis.',
    'Assonantie': 'Assonantie = klinkers herhalen (a, e, i, o, u). Alliteratie = medeklinkers.',
    'Antithese': 'Antithese = tegenstelling. Twee dingen staan tegenover elkaar.',
    'Retorische vraag': 'Retorische vraag = geen antwoord nodig. Het antwoord is voor iedereen duidelijk.',
    'Oxymoron': 'Oxymoron = twee woorden die elkaar tegenspreken. "Oorverdovende stilte".',
    'Metonymie': 'Metonymie = vervangen door gerelateerd begrip. "Het Witte Huis" = de president.',
    'Synecdoche': 'Synecdoche = deel voor geheel. "Alle handen" = alle mensen.',
    'Chiasme': 'Chiasme = kruislings herhalen. AB-BA patroon.',
    'Climax': 'Climax = opbouwen naar hoogtepunt. Steeds belangrijker/sterker.',
    'Apostrofe': 'Apostrofe = iets afwezigs aanspreken. Alsof het er is.',
    'Parallelisme': 'Parallelisme = zelfde zinsbouw herhalen. Ritme door herhaling.',
    'Enjambement': 'Enjambement = doorlopen over versregel. Zin stopt niet bij regeleinde.',
    'Onomatopee': 'Onomatopee = geluid nabootsen. "Boem", "zoem", "krak".',
    'Ellips': 'Ellips = woorden weglaten. Context maakt het duidelijk.',
    'Vergelijking': 'Vergelijking = expliciet met "als" of "zoals". Metafoor is verborgen.',
    'Epistrofe': 'Epistrofe = herhaling aan het EINDE. Anafoor is aan het begin.',
    'Archaïsme': 'Archaïsme = verouderde woorden. "Alzo", "wederom", etc.',
    'Zeugma': 'Zeugma = één werkwoord, twee betekenissen. Letterlijk én figuurlijk.',
    'Anticlimax': 'Anticlimax = teleurstelling na opbouw. Van belangrijk naar onbelangrijk.',
    'Pleonasme': 'Pleonasme = overbodige herhaling. Versterkt maar is niet nodig.'
  };
  
  return tips[styleName] || 'Let goed op de definitie en het voorbeeld om dit stijlfiguur te herkennen.';
}

function getStyleExplanation(styleName, example) {
  const explanations = {
    'Metafoor': 'In dit voorbeeld wordt een verborgen vergelijking gemaakt zonder "als" of "zoals". Het ene begrip wordt voorgesteld als het andere.',
    'Personificatie': 'Hier krijgt iets levenloos of abstract menselijke eigenschappen, zoals kunnen praten, denken of voelen.',
    'Hyperbool': 'Deze overdrijving wordt gebruikt om extra nadruk te leggen. Het is duidelijk niet letterlijk bedoeld.',
    'Ironie': 'Hier wordt het tegenovergestelde bedoeld van wat er gezegd wordt, vaak met een sarcastische ondertoon.',
    'Alliteratie': 'De beginmedeklinkers van meerdere woorden vlak na elkaar zijn hetzelfde, wat een speels of memorabel effect creëert.',
    'Eufemisme': 'Een zachtere, minder directe manier om iets onaangenaams te zeggen.',
    'Anafoor': 'Hetzelfde woord of dezelfde woordgroep wordt herhaald aan het begin van opeenvolgende zinnen voor nadruk.',
    'Allegorie': 'Het hele verhaal heeft een diepere, symbolische betekenis naast de letterlijke betekenis.',
    'Paradox': 'Lijkt tegenstrijdig maar bevat bij nader inzien een diepere waarheid.',
    'Litotes': 'Door het tegenovergestelde te ontkennen wordt iets juist bevestigd, vaak voor bescheidenheid of understatement.',
    'Symboliek': 'Een concreet object vertegenwoordigt een abstract idee of concept.',
    'Assonantie': 'Klinkers worden herhaald voor een muzikaal of ritmisch effect.',
    'Antithese': 'Twee tegengestelde begrippen worden naast elkaar gezet om het contrast te benadrukken.',
    'Retorische vraag': 'Een vraag die geen antwoord verwacht omdat het antwoord voor de hand ligt.',
    'Oxymoron': 'Twee woorden die elkaar tegenspreken worden gecombineerd voor een verrassend effect.',
    'Metonymie': 'Iets wordt benoemd naar iets dat er nauw mee verbonden is.',
    'Synecdoche': 'Een deel staat voor het geheel, of omgekeerd.',
    'Chiasme': 'De volgorde van woorden wordt omgekeerd herhaald in een kruisvorm.',
    'Climax': 'Woorden of zinnen worden opgebouwd van minder naar meer belangrijk/intens.',
    'Apostrofe': 'Iemand of iets afwezig wordt direct aangesproken alsof het aanwezig is.',
    'Parallelisme': 'Dezelfde zinsstructuur wordt herhaald voor ritme en nadruk.',
    'Enjambement': 'Een zin loopt door over het einde van een versregel heen.',
    'Onomatopee': 'Het woord bootst een geluid na dat het beschrijft.',
    'Ellips': 'Woorden worden weggelaten omdat ze uit de context blijken.',
    'Vergelijking': 'Twee dingen worden met "als" of "zoals" expliciet met elkaar vergeleken.',
    'Epistrofe': 'Hetzelfde woord komt aan het einde van opeenvolgende zinnen voor extra nadruk.',
    'Archaïsme': 'Verouderde woorden worden gebruikt voor een klassiek of plechtig effect.',
    'Zeugma': 'Één werkwoord slaat op twee dingen maar met verschillende betekenissen.',
    'Anticlimax': 'Na opbouw volgt iets onbelangrijks of teleurstellends voor een komisch of ironisch effect.',
    'Pleonasme': 'Woorden worden herhaald die eigenlijk overbodig zijn, maar versterken de boodschap.'
  };
  
  return explanations[styleName] || 'Dit stijlfiguur wordt vaak gebruikt om teksten levendiger en expressiever te maken.';
}

function getComparisonExplanation(correct, wrong, styleName, example) {
  // First provide what the correct answer IS
  let explanation = getStyleExplanation(styleName, example);
  explanation += `<br><br>`;
  
  // Then explain the difference
  const comparisons = {
    'Metafoor_Personificatie': `<strong>Verschil:</strong> Metafoor vergelijkt twee verschillende dingen verborgen ("Tijd is geld"), terwijl personificatie menselijke eigenschappen geeft aan niet-mensen ("De wind fluistert").`,
    'Metafoor_Vergelijking': `<strong>Verschil:</strong> Metafoor is een verborgen vergelijking zonder "als/zoals", terwijl een vergelijking expliciet "als" of "zoals" gebruikt.`,
    'Hyperbool_Litotes': `<strong>Verschil:</strong> Hyperbool overdrijft enorm ("duizend keer gezegd"), litotes onderdrijft door het tegenovergestelde te ontkennen ("niet onverstandig").`,
    'Ironie_Sarcasme': `<strong>Verschil:</strong> Beide bedoelen het tegenovergestelde, maar sarcasme is scherper, bijtender en vaak gemeen bedoeld.`,
    'Paradox_Oxymoron': `<strong>Verschil:</strong> Paradox is een hele schijnbaar tegenstrijdige gedachte, oxymoron combineert slechts twee tegenstrijdige woorden direct.`,
    'Alliteratie_Assonantie': `<strong>Verschil:</strong> Alliteratie herhaalt beginmedeklinkers (k-k-k), assonantie herhaalt klinkers (a-a-a, e-e-e).`,
    'Anafoor_Epistrofe': `<strong>Verschil:</strong> Anafoor herhaalt woorden aan het BEGIN van zinnen, epistrofe aan het EINDE.`,
    'Metonymie_Synecdoche': `<strong>Verschil:</strong> Metonymie vervangt iets door gerelateerd begrip (Witte Huis=president), synecdoche gebruikt deel-voor-geheel (handen=mensen).`,
    'Climax_Anticlimax': `<strong>Verschil:</strong> Climax bouwt op naar iets groots, anticlimax eindigt teleurstellend of onbelangrijk na opbouw.`,
    'Metafoor_Symboliek': `<strong>Verschil:</strong> Metafoor maakt een directe vergelijking in taal, symboliek gebruikt een object dat voor iets anders staat.`,
    'Vergelijking_Metafoor': `<strong>Verschil:</strong> Vergelijking gebruikt expliciet "als" of "zoals", metafoor vergelijkt verborgen zonder die woorden.`
  };
  
  const key = `${correct}_${wrong}`;
  const reverseKey = `${wrong}_${correct}`;
  
  if (comparisons[key]) {
    explanation += comparisons[key];
  } else if (comparisons[reverseKey]) {
    explanation += comparisons[reverseKey];
  } else {
    explanation += `<strong>Let op:</strong> ${wrong} is iets anders. In dit voorbeeld zie je duidelijk de kenmerken van ${correct}.`;
  }
  
  return explanation;
}

function markAsLearned() {
  const key = currentItem.type === 'word' ? currentItem.word : currentItem.name;
  
  if (!learnedItems.includes(key)) {
    learnedItems.push(key);
  }
  
  // Remove from review if it was there
  reviewItems = reviewItems.filter(item => item !== key);
  
  saveProgress();
  updateProgress();
  nextCard();
}

function markForReview() {
  const key = currentItem.type === 'word' ? currentItem.word : currentItem.name;
  
  if (!reviewItems.includes(key)) {
    reviewItems.push(key);
  }
  
  saveProgress();
  nextCard();
}

function nextCard() {
  // Animate card exit
  cardY = 500;
  cardScale = 0.8;
  
  setTimeout(() => {
    loadCard(currentIndex + 1);
  }, 300);
}

function showCompleteScreen() {
  document.getElementById('card-screen').classList.add('hidden');
  document.getElementById('complete-screen').classList.remove('hidden');
}

function restartGame() {
  prepareItems();
  document.getElementById('complete-screen').classList.add('hidden');
  
  if (allItems.length === 0) {
    document.getElementById('welcome-screen').classList.remove('hidden');
  } else {
    document.getElementById('card-screen').classList.remove('hidden');
    loadCard(0);
  }
}

function updateProgress() {
  const total = vocabularyData.words.length + vocabularyData.figures.length;
  const learned = learnedItems.length;
  const percentage = (learned / total) * 100;
  
  document.getElementById('progress-text').textContent = `${learned} van ${total} onderdelen geleerd`;
  document.getElementById('progress-fill').style.width = `${percentage}%`;
}

function saveProgress() {
  localStorage.setItem('woordenschat-learned', JSON.stringify(learnedItems));
  localStorage.setItem('woordenschat-review', JSON.stringify(reviewItems));
}

function loadProgress() {
  const learned = localStorage.getItem('woordenschat-learned');
  const review = localStorage.getItem('woordenschat-review');
  
  if (learned) {
    learnedItems = JSON.parse(learned);
  }
  
  if (review) {
    reviewItems = JSON.parse(review);
  }
}

function resetProgress() {
  if (confirm('Weet je zeker dat je je voortgang wilt resetten?')) {
    learnedItems = [];
    reviewItems = [];
    saveProgress();
    updateProgress();
    prepareItems();
    alert('Voortgang gereset! Je kunt opnieuw beginnen.');
  }
}

function windowResized() {
  resizeCanvas(min(windowWidth - 40, 700), 300);
}

// Smooth animations
function updateAnimation() {
  // Smooth card position
  if (cardY < 200) {
    cardY = lerp(cardY, 200, 0.1);
  }
  if (cardScale < 1) {
    cardScale = lerp(cardScale, 1, 0.1);
  }
}

setInterval(updateAnimation, 16);
