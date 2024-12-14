<template>
  <div>
    <h1>Настройки игры</h1>

    <div>
      <h2>Выберите алфавит</h2>
      <button @click="selectAlphabet('ru')">Русский</button>
      <button @click="selectAlphabet('en')">Английский</button>
      <div v-if="alphabet.length">
        <p>Хотите использовать все буквы?</p>
        <button @click="useAllLetters">Да</button>
        <button @click="excludeLetters">Нет</button>
      </div>
      <div v-if="excludingLetters">
        <h3>Исключите буквы:</h3>
        <div>
          <button v-for="letter in alphabet" :key="letter" @click="toggleLetter(letter)">
            {{ letter }}
          </button>
        </div>
      </div>
    </div>

    <div>
      <h2>Время раунда</h2>
      <input type="number" v-model="roundTime" /> секунд
    </div>

    <div>
      <h2>Игроки</h2>
      <div>
        <input v-model="newPlayer" placeholder="Введите имя игрока" />
        <button @click="addPlayer">Добавить</button>
      </div>
      <ul>
        <li v-for="player in players" :key="player.name">
          {{ player.name }}
        </li>
      </ul>
    </div>

    <button @click="startGame">Начать игру</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alphabet: [],
      excludingLetters: false,
      roundTime: 60,
      newPlayer: '',
    };
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
  },
  methods: {
    selectAlphabet(lang) {
      this.alphabet = lang === 'ru' ? [...'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'] : [...'abcdefghijklmnopqrstuvwxyz'];
      this.$store.commit('setAlphabet', this.alphabet);
    },
    useAllLetters() {
      this.excludingLetters = false;
    },
    excludeLetters() {
      this.excludingLetters = true;
    },
    toggleLetter(letter) {
      this.$store.commit('setAlphabet', this.alphabet.filter(l => l !== letter));
    },
    addPlayer() {
      if (this.newPlayer.trim()) {
        this.$store.commit('addPlayer', { name: this.newPlayer.trim(), score: 0 });
        this.newPlayer = '';
      }
    },
    startGame() {
      this.$store.commit('setRoundTime', this.roundTime);
      this.$router.push('/game');
    },
  },
};
</script>
