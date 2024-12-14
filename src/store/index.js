import { createStore } from 'vuex';

export default createStore({
  state: {
    alphabet: [], // Текущий алфавит для игры
    roundTime: 60, // Время на раунд (секунды)
    players: [], // Список игроков [{ name: 'Player 1', score: 0 }]
    usedLetters: [], // Использованные буквы
    currentPlayerIndex: 0, // Индекс текущего игрока
    currentLetter: '', // Текущая буква
    timer: 0, // Оставшееся время
  },
mutations: {
  // Уже существующие
  setAlphabet(state, alphabet) {
    state.alphabet = alphabet;
  },
  setRoundTime(state, time) {
    state.roundTime = time;
  },
  addPlayer(state, player) {
    state.players.push({ ...player, scores: {}, total: 0 });
  },
  nextPlayer(state) {
    state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  },
  markLetterUsed(state, letter) {
    state.usedLetters.push(letter);
    state.alphabet = state.alphabet.filter(l => l !== letter);
  },
  updateScore(state, { playerIndex, delta }) {
    const player = state.players[playerIndex];
    const letter = state.currentLetter;

    if (!player.scores[letter]) {
      player.scores[letter] = 0;
    }

    player.scores[letter] += delta;
    player.total = Object.values(player.scores).reduce((sum, score) => sum + score, 0);
  },
  setCurrentLetter(state, letter) {
    state.currentLetter = letter;
  },
  setTimer(state, time) {
    state.timer = time;
  },
  resetGame(state) {
    state.players.forEach(player => {
      player.scores = {};
      player.total = 0;
    });
    state.usedLetters = [];
    state.currentPlayerIndex = 0;
    state.currentLetter = '';
  },
  resetScores(state) {
    state.players.forEach(player => {
      player.scores = {};
      player.total = 0;
    });
    state.usedLetters = [];
    state.currentLetter = '';
  },
},
});
