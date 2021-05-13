<template>

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
        <button @click.prevent="changeBetFormTrigger">Cancel</button>
      </div>
    </form>

</template>

<script>
import { mapState } from 'vuex'

export default {
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
        this.$store.commit('addDate', this.date)
        this.$store.commit('addStatNumber', this.statNumber)
        this.$store.commit('addStatType', this.statType)
        this.$store.commit('addOverUnder', this.overUnder)
        this.$store.commit('addWinLoss', '')
        this.addPlayerData()
        this.$store.commit('changeBetFormTrigger')
        this.setFirebaseBet()
        this.clearLocalData()
        console.log(this.stats.statsNeeded)
        // this.$store.commit('setNeededStat', window['retrieved' + this.statTypes[this.statTypes.length - 1].replace(' ', '')])
      } else {
        alert('Incomplete Form')
      }
    },
    clearLocalData () {
      this.playerFirstName = ''
      this.playerLastName = ''
      this.date = ''
      this.statNumber = ''
      this.statType = ''
      this.overUnder = ''
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
    },
    changeBetFormTrigger () {
      this.$store.commit('changeBetFormTrigger')
    },
    setFirebaseBet () {
      this.$fire.firestore
        .collection('users')
        .doc('brett.bowles')
        .collection('bets')
        .add({
          firstName: this.playerFirstName,
          lastName: this.playerLastName,
          gameDate: this.date,
          statNumber: this.statNumber,
          statType: this.statType,
          overUnder: this.overUnder
        })
        .then(() => {
          console.log('Document successfully written!')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    }
  }
}

</script>
