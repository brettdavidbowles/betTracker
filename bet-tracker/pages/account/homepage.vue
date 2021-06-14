<template>
  <div>
    <div v-if="this.user">
      <p> Welcome to the NBA proposition bet tracker! 
      <button @click.prevent="betlistRoute">Add Bets</button><br>
      <NuxtLink to="./stats">Your Stats</NuxtLink><br>
      <p>You are logged in as {{ user.email }}</p>
      <button @click.prevent="logout">Log Out</button><br>
    </div>
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
