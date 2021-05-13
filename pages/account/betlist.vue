<template>
<div v-if="this.user">
  <button v-if="betFormTrigger === 0" @click.prevent="changeBetFormTrigger">Add Bet</button>
  <AddBet v-if="betFormTrigger === 1"></AddBet>
  <div>
      <!-- removed v-if="randos.length" in table, wouldn't let me comment it out for some reason -->
    <!-- use lifecycle hook (maybe) for actual stats so they update when pending games are put in -->
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
  <NuxtLink to="./homepage">Home Page</NuxtLink><br>
  <NuxtLink to="./stats">Your Stats</NuxtLink><br>
  <p>You are logged in as {{ user.email }}</p>
  <button @click.prevent="logout">Log Out</button>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'betlist',
  // i don't really know why i don't need this:
  // components: {
  // Table,
  // AddBet
  // },
  data () {
    return {
      loggedIn: false,
      user: ''
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
      'stats',
      'betFormTrigger'
    ])
  },

  created () {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      }
    })
  },

  methods: {
    changeBetFormTrigger () {
      this.$store.commit('changeBetFormTrigger')
    },
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('../')
      })
    }
  }
}
</script>
