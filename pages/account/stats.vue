<template>
  <div v-if='this.user'>
    <PercentageTracker></PercentageTracker>
    <NuxtLink to="./homepage">Home Page</NuxtLink><br>
    <NuxtLink to="./betlist">Add Bets</NuxtLink><br>
    <p>You are logged in as {{ user.email }}</p>
    <button @click.prevent="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'stats',
  data () {
    return {
      loggedIn: false,
      user: ''
    }
  },
  methods: {
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('../')
      })
    }
  },
  created () {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      }
    })
  }
}
</script>
