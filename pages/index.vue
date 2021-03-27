<template>
  <div class="p-8 flex flex-wrap">
    <div class="w-1/4 relative">
      <img src="~/assets/nbalogo.jpg" class="absolute">
      <p class="w-full absolute bottom-0 mr-1 mb-10 text-center">
        <b>BETS</b>
      </p>
    </div>
    <form class="w-1/2 flex flex-wrap justify-center" @submit.prevent="subAll">
      <p class="w-full text-center">
        <b>Add Bet:</b>
      </p>
      <div>
        <input v-model="player" class="form-input border-2 rounded" type="text" placeholder="Player Name"><br>
        <input v-model="date" type="date" placeholder="Game Date"><br>
        <input v-model="statNumber" class="form-input border-2 rounded" type="number" placeholder="Stat" step="0.5"><br>
        <select v-model="statType">
          <option disabled value="">
            Pick one
          </option>
          <option value="trb">
            Total Rebounds
          </option>
          <option value="pts">
            Points
          </option>
          <option value="ass">
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
      <Table
        v-if="randos.length"
        :urls="randos"
        :names="players"
        :dates="dates"
        :over-unders="overUnders"
        :stat-numbers="statNumbers"
        :stat-types="statTypes"
      />
    </div>
    <div class="h-32 flex items-center">
      <a href="./cards" class="text-blue-800">Cards Page</a>
    </div>
    <div v-if="retrievedPlayers.length">
      {{ retrievedPlayers }}
    </div>
  </div>
</template>

<script>
import Table from '../components/Table'
import PercentageTracker from '../components/PercentageTracker'

export default {
  name: 'App',
  components: {
    Table,
    PercentageTracker
  },
  data () {
    return {
      player: '',
      date: '',
      statNumber: '',
      statType: '',
      overUnder: '',
      rando: ''
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    },
    dates () {
      return this.$store.state.dates
    },
    statNumbers () {
      return this.$store.state.statNumbers
    },
    statTypes () {
      return this.$store.state.statTypes
    },
    overUnders () {
      return this.$store.state.overUnders
    },
    randos () {
      return this.$store.state.randos
    },
    retrievedPlayers () {
      return this.$store.state.retrievedPlayers
    }
  },

  methods: {
    subAll () {
      if (
        this.player &&
        this.date &&
        this.statNumber &&
        this.statType &&
        this.overUnder
      ) {
        this.$store.commit('addPlayer', this.player)
        this.player = ''
        this.$store.commit('addDate', this.date)
        this.date = ''
        this.$store.commit('addStatNumber', this.statNumber)
        this.statNumber = ''
        this.$store.commit('addStatType', this.statType)
        this.statType = ''
        this.$store.commit('addOverUnder', this.overUnder)
        this.overUnder = ''
        this.$store.commit('addWinLoss', '')
        this.addRando()
        this.addPlayer()
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
    addPlayer () {
      this.$store.dispatch('getPlayer', this.players[this.players.length - 1])
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
