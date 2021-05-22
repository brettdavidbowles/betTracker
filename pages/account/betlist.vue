<template>
<div v-if="this.user">
  <div class='flex underline text-blue-700 text-center'>
    <NuxtLink to="./homepage" class='w-1/5'>Home Page</NuxtLink><br>
    <NuxtLink to="./stats" class='w-1/5'>Your Stats</NuxtLink><br>
    <button @click.prevent="logout" class='w-1/5'>Log Out</button>
  </div>

  <div class='flex items-center'>
    <AddBet></AddBet>
    <p class='align-middle text-center'>To see how this works, use some old games and fill the rest of the form with arbitrary inputs.
      Here are some past games:<br><br>
        Date: 10/29/2003, Lebron James<br>
        Date: 02/02/1997, Kobe Bryant<br>
        Date: 03/25/1986, Michael Jordan<br>
        Date: 11/06/2000, Scottie Pippen<br>
        Date: 03/25/2009, Shaquille O'Neal
    </p>
  </div>
  <div v-if="statTypes.length">
      <!-- removed v-if="randos.length" in table, wouldn't let me comment it out for some reason -->
    <!-- use lifecycle hook (maybe) for actual stats so they update when pending games are put in -->
    <Table
      :urls="randos"
      :names="players"
      :dates="dates"
      :over-unders="overUnders"
      :stat-numbers="statNumbers"
      :stat-types="statTypes"
      :actual-stats="stats.statsNeeded"
    />
    <p>
      The "Actual Stat" is retrieved from the API.<br>
      If you won your bet, the row will be green.<br>
      If you lost your bet, the row will be red.<br>
      Go to "Your Stats" to see your win percentage!
    </p>
  </div>

  <p>You are logged in as {{ user.email }}</p>

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
