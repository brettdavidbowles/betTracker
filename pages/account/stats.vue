<template>
  <div v-if='this.user'>
    <div class='flex underline text-blue-700 text-center'>
      <NuxtLink to="./homepage" class='w-1/5'>Home Page</NuxtLink><br>
      <NuxtLink to="./betlist" class='w-1/5'>Add Bets</NuxtLink><br>
      <button @click.prevent="logout" class='w-1/5'>Log Out</button>
    </div>
    <PercentageTracker></PercentageTracker>
    <p>You are logged in as {{ user.email }}</p>
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
