// Posso creare funzioni d'appoggio qui. Possono essere utlizzate solamente nel file js.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      round: 0,
      winner: null,
      logs: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    actionCheck() {
      // Se il resto di round è diverso da 3 sono passati 3 round
      return this.round % 3 !== 0;
    },
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (this.monsterHealth <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (this.playerHealth <= 0) {
        this.winner = "monster";
      }
    },
  },
  methods: {
    startGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.round = 0;
      this.winner = null;
      this.logs = [];
    },
    attackMonster() {
      this.round++;
      const attackValue = getRandomNumber(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.setLogs("player", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 15);
      this.playerHealth -= attackValue;
      this.setLogs("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomNumber(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.setLogs("player", "attack", attackValue);
    },
    getHealth() {
      this.round++;
      const healthValue = getRandomNumber(8, 20);
      if (this.playerHealth + healthValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healthValue;
      }
      this.setLogs("player", "health", healthValue);
    },
    surrender() {
      this.winner = "monster";
    },
    setLogs(who, what, value) {
      const data = {
        who: who,
        what: what,
        value: value,
      };
      return this.logs.unshift(data);
    },
  },
});
app.mount("#game");
