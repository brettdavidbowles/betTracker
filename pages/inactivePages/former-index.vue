<template>
  <div class="p-8 flex flex-wrap">
    <div class="w-1/4 relative">
      <img src="~/assets/nbalogo.jpg" class="h-4/5">
      <p class="w-full text-center">
        <b>PROP BETS</b>
      </p>
    </div>
    <form class="w-1/2 flex flex-wrap justify-center" @submit.prevent="subAll">
      <p class="w-full text-center">
        <b>Add Bet:</b>
      </p>
      <div>
        <input v-model="playerFirstName" class="form-input border-2 rounded" type="text" placeholder="First Name"><br>
        <input v-model="playerLastName" class="form-input border-2 rounded" type="text" placeholder="Last Name"><br>
        <input v-model="date" type="date" placeholder="Game Date"><br>
        <input v-model="statNumber" class="form-input border-2 rounded" type="number" placeholder="Stat" step="0.5"><br>
        <select v-model="statType">
          <option disabled value="">
            Pick one
          </option>
          <option value="Total Rebounds">
            Total Rebounds
          </option>
          <option value="Points">
            Points
          </option>
          <option value="Assists">
            Assists
          </option>
        </select><br>
        <input id="over" v-model="overUnder" type="radio" value="Over">
        <label for="over">Over</label>
        <input id="under" v-model="overUnder" type="radio" value="Under">
        <label for="under">Under</label><br>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
    <PercentageTracker class="w-1/4" />
    <!-- <div>
      <button @click="addRando">add rando</button>
      <ul>
        <li v-for="rando in randos" :key="rando.index">{{ rando.results[0].picture.thumbnail }}</li>
      </ul>
    </div>
    <div v-for="rando in randos" :key="rando.index">
      <img :src="rando.results[0].picture.thumbnail">
    </div> -->
    <div>
      <!-- removed v-if="randos.length" in table, wouldn't let me comment it out for some reason -->
      <Table
        v-if="statTypes.length"
        :urls="randos"
        :names="players"
        :dates="dates"
        :over-unders="overUnders"
        :stat-numbers="statNumbers"
        :stat-types="statTypes"
        :actual-stats="stats.statsNeeded"
      />
    </div>
    <div class="h-32 flex items-center">
      <NuxtLink to="./cards" class="text-blue-800">Cards Page</NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      playerFirstName: '',
      playerLastName: '',
      date: '',
      statNumber: '',
      statType: '',
      overUnder: '',
      rando: ''
    }
  },
  computed: {
    ...mapState([
      'betNumbers',
      'players',
      'dates',
      'statNumbers',
      'statTypes',
      'overUnders',
      'winsLosses',
      'randos',
      'retrievedPlayers',
      'stats'
    ])
  },

  methods: {
    subAll () {
      if (
        this.playerFirstName &&
        this.playerLastName &&
        this.date &&
        this.statNumber &&
        this.statType &&
        this.overUnder
      ) {
        this.$store.commit('addPlayer', [this.playerFirstName, this.playerLastName])
        this.playerFirstName = ''
        this.playerLastName = ''
        this.$store.commit('addDate', this.date)
        this.date = ''
        this.$store.commit('addStatNumber', this.statNumber)
        this.statNumber = ''
        this.$store.commit('addStatType', this.statType)
        this.statType = ''
        this.$store.commit('addOverUnder', this.overUnder)
        this.overUnder = ''
        this.$store.commit('addWinLoss', '')
        this.addPlayerData()
        console.log(this.stats.statsNeeded)
        // this.$store.commit('setNeededStat', window['retrieved' + this.statTypes[this.statTypes.length - 1].replace(' ', '')])
      } else {
        alert('Incomplete Form')
      }
    },
    removePlayer (index) {
      this.$store.commit('removePlayer', index)
    },
    addRando () {
      this.$store.dispatch('addRando')
    },
    addPlayerData () {
      const currentIndex = this.players.length - 1
      this.$store.dispatch('getPlayerData', [this.players[currentIndex], this.dates[currentIndex], this.statTypes[currentIndex], currentIndex])
    }
  }
}

</script>

<style>
/* .container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
} */
/*
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
 */
</style>
