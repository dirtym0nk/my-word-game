<template>
  <div>
    <h1>Игра</h1>

    <div v-for="(player, index) in players" :key="player.name" :class="{'current-player': index === currentPlayerIndex}">
      <h2>{{ player.name }}</h2>
      <p>Общее количество очков: {{ player.total }}</p>
      <ul>
        <li v-for="(score, letter) in player.scores" :key="letter">
          {{ letter }}: {{ score }}
        </li>
      </ul>
      <div v-if="index === currentPlayerIndex">
        <p>Буква: {{ currentLetter }}</p>
        <button @click="updateScore(1)">+</button>
        <button @click="updateScore(-1)">-</button>
        <button @click="endRound">Завершить раунд</button>
      </div>
    </div>

    <div>
      <p>Таймер: {{ timer }}</p>
      <button @click="startRound">Начать раунд</button>
    </div>

    <button @click="endGame">Закончить игру</button>
  </div>
</template>

<script>
export default {
  computed: {
    players() {
      return this.$store.state.players;
    },
    currentPlayerIndex() {
      return this.$store.state.currentPlayerIndex;
    },
    currentLetter() {
      return this.$store.state.currentLetter;
    },
    timer() {
      return this.$store.state.timer;
    },
  },
  methods: {
    startRound() {
      if (!this.$store.state.alphabet.length) {
        alert('Буквы закончились!');
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.$store.state.alphabet.length);
      const letter = this.$store.state.alphabet[randomIndex];
      this.$store.commit('setCurrentLetter', letter);
      this.$store.commit('markLetterUsed', letter);
      this.$store.commit('setTimer', this.$store.state.roundTime);

      const interval = setInterval(() => {
        if (this.$store.state.timer > 0) {
          this.$store.commit('setTimer', this.$store.state.timer - 1);
        } else {
          clearInterval(interval);
          alert('Время вышло!');
        }
      }, 1000);
    },
    updateScore(delta) {
      this.$store.commit('updateScore', { playerIndex: this.currentPlayerIndex, delta });
    },
    endRound() {
      this.$store.commit('nextPlayer');
      this.$store.commit('setCurrentLetter', '');
    },
    endGame() {
      this.$store.commit('resetScores');
      this.$router.push('/');
    },
  },
};
</script>
