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
  allItems = [];
  
  // Mix words and figures
  vocabularyData.words.forEach(word => {
    // Randomly assign flashcard or quiz mode
    const mode = random() > 0.5 ? 'flashcard' : 'quiz';
    allItems.push({
      type: 'word',
      mode: mode,
      ...word
    });
  });
  
  vocabularyData.figures.forEach(figure => {
    allItems.push({
      type: 'figure',
      mode: 'multiple-choice',
      ...figure
    });
  });
  
  // Shuffle
  allItems = shuffle(allItems);
  
  // Filter out already learned items
  allItems = allItems.filter(item => {
    const key = item.type === 'word' ? item.word : item.name;
    return !learnedItems.includes(key);
  });
  
  // Add review items to the end
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
  
  if (isClose) {
    feedback.textContent = `✓ Correct! "${currentItem.word}" betekent: ${currentItem.definition}`;
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = `Het juiste woord is "${currentItem.word}". ${currentItem.definition}`;
    feedback.className = 'feedback incorrect';
  }
  
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
  
  if (selectedIndex === currentItem.correct) {
    btnElement.classList.add('correct');
    setTimeout(() => {
      const feedback = document.getElementById('feedback');
      feedback.textContent = `✓ Juist! ${currentItem.name}: ${currentItem.definition}`;
      feedback.className = 'feedback correct';
      feedback.classList.remove('hidden');
      document.getElementById('action-buttons').classList.remove('hidden');
    }, 500);
  } else {
    btnElement.classList.add('incorrect');
    buttons[currentItem.correct].classList.add('correct');
    setTimeout(() => {
      const feedback = document.getElementById('feedback');
      feedback.textContent = `Het juiste antwoord is "${currentItem.choices[currentItem.correct]}". ${currentItem.definition}`;
      feedback.className = 'feedback incorrect';
      feedback.classList.remove('hidden');
      document.getElementById('action-buttons').classList.remove('hidden');
    }, 500);
  }
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
