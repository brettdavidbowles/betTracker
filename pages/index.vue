<template>
  <div class="bg-court-background h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center">
    <div class="text-center">
      <p class="text-white block text-6xl">NBA Bet Book</p>
      <form @submit.prevent="submit">
      <input type="text" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit" class="text-white underline">Log In</button>
      </form>
      <NuxtLink to="./signup" class="text-white text-center underline">Need an account? Sign up here!</NuxtLink>
    </div>
    {{ user }}
  </div>

</template>

<script>

export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: '',
      user: ''
    }
  },

  methods: {
    handleError (message) {
      alert(message)
    },

    async submit () {
      try {
        await
        this.$fire
          .auth
          .signInWithEmailAndPassword(this.email, this.password).then((userCredential) => {
            this.user = userCredential.user
            this.$router.push({
              name: 'account-homepage',
              params: {
                homepage: 'homepage'
              }
            })
          })
      } catch (e) {
        this.handleError(e)
      }
      this.clearData()
    },
    clearData () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}

</script>

<style>

</style>
