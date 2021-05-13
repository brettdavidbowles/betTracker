<template>
  <div>
    <p>You are logged in as {{ user.email }}</p>
    <button @click.prevent="logout">Log Out</button><br>
    <NuxtLink to="./">Add Bets</NuxtLink>
    {{ user }}
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'homePage',
  data () {
    return {
      loggedIn: false,
      user: ''
    }
  },

  created () {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
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
        this.$router.push('./signin')
      })
    }
  }
}
</script>
