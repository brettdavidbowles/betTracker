<template>
  <div v-if="this.user" class='relative h-48'>
    <div class='flex underline text-blue-700 text-center'>
      <button class='w-1/5' @click.prevent="betlistRoute">Add Bets</button>
      <NuxtLink to="./stats" class='w-1/5'>Your Stats</NuxtLink>
      <button @click.prevent="logout" class='w-1/5'>Log Out</button>
    </div>
    <h2 class='text-lg'><b>Welcome to the NBA Proposition Bet Tracker!</b></h2>
    <p>
        This app keeps track of <a href='https://en.wikipedia.org/wiki/Proposition_bet' class='text-blue-700 underline'>prop bets</a> made on NBA player points, assists, and total rebounds.<br>
        The "Add Bets" page will allow you to add bets and track whether you won or lost the bet.<br>
        The "Stats" page keeps track of your win percentage.<br>
        All actual data is pulled from the <a href='https://balldontlie.io' class='text-blue-700 underline'>balldontlie API</a>.
    </p>
    <p>You are logged in as {{ user.email }}</p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'homePage',
  data () {
    return {
      loggedIn: false,
      user: '',
      email: '',
      userDocData: ''
    }
  },
  created () {
    this.$fire.firestore.collection('users').doc('brett.bowles')
      .onSnapshot((doc) => {
        this.userDocData = doc.data()
      })
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.email = user.email
      }
    })
  },
  methods: {
    setupFirebase () {
      this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('logged in')
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      }
      )
    },
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('../')
      })
    },
    betlistRoute () {
      this.$router.push({
        name: 'account-betlist',
        params: {
          betlist: 'betlist'
        }
      })
    }
  }
}
</script>
