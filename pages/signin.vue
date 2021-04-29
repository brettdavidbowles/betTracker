<template>
  <div class="container">
    <form @submit.prevent="submit">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button type="submit" NuxtLink="./homePage">Submit</button>
    </form>
    <NuxtLink to="./signup">Need an account? Sign up here!</NuxtLink>
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
            this.$router.push('./homePage')
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
