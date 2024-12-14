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
    setAlphabet(state, alphabet) {
      state.alphabet = alphabet;
    },
    setRoundTime(state, time) {
      state.roundTime = time;
    },
    addPlayer(state, player) {
      state.players.push(player);
    },
    nextPlayer(state) {
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    },
    markLetterUsed(state, letter) {
      state.usedLetters.push(letter);
      state.alphabet = state.alphabet.filter(l => l !== letter);
    },
    updateScore(state, { playerIndex, delta }) {
      state.players[playerIndex].score += delta;
    },
    setCurrentLetter(state, letter) {
      state.currentLetter = letter;
    },
    setTimer(state, time) {
      state.timer = time;
    },
  },
  actions: {},
  getters: {
    currentPlayer(state) {
      return state.players[state.currentPlayerIndex];
    },
  },
});
