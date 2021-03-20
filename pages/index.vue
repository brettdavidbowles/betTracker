<template>
  <div class="p-8">
    <img src="~/assets/nbalogo.jpg" class="h-24"/>
    <form @submit.prevent="subAll">
      <div>
        <input class="form-input border-2 rounded" type="text" placeholder= "Player Name" v-model="player"><br>
        <input type="date" placeholder= "Game Date" v-model="date"><br>
        <input class="form-input border-2 rounded" type="number" placeholder= "Stat" v-model="statNumber" step="0.5"><br>
        <select v-model="statType">
          <option disabled value="">Pick one</option>
          <option value= "trb">Total Rebounds</option>
          <option value= "pts">Points</option>
          <option value= "ass">Assists</option>
        </select><br>
        <input type="radio" id="over" value="Over" v-model="overUnder">
        <label for="over">Over</label>
        <input type="radio" id="under" value="Under" v-model="overUnder">
        <label for="under">Under</label><br>
        <button type="submit">Submit</button>
      </div>
    </form>
    <div>
      <button @click="getThumbnail">add rando</button>
      <ul>
        <li v-for="rando in randos" :key="rando.index">{{ rando.results[0].picture.thumbnail }}</li>
      </ul>
    </div>
    <div v-for="rando in randos" :key="rando.index">
      <img :src="rando.results[0].picture.thumbnail">
    </div>
    <div>
    <Table
      :names="players"
      :dates="dates"
      :overUnders="overUnders"
      :statNumbers="statNumbers"
      :statTypes="statTypes"
      ></Table>
    </div>
    <PercentageTracker></PercentageTracker>
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
      } else {
        alert('Incomplete Form')
      }
    },
    removePlayer (index) {
      this.$store.commit('removePlayer', index)
    },
    getThumbnail () {
      this.$store.dispatch('addRando')
    }
    /* async getThumbnail () {
      const rando = await this.$axios.get('https://randomuser.me/api/')
      this.rando = rando
      console.log(rando.gender)
    } */
  }
  /* async fetch () {
    this.pictures = await fetch(
      'https://randomuser.me/api/?inc=picture.thumbnail'
    ).then(res => res.json())
  } */

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
