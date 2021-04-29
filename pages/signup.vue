<template>
  <div class="container">
    <form @submit.prevent="createUser">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <input type="password" placeholder="Confirm Password" v-model="confirmPassword">
    <button type="submit">Submit</button>
    {{ passwordAlert }}
    </form>
    <NuxtLink to="./signin">Already have an account? Click here!</NuxtLink>
  </div>

</template>

<script>

export default {

  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      user: '',
      passwordAlert: ''
    }
  },
  methods: {
    handleError (message) {
      alert(message)
    },
    async createUser () {
      if (this.password === this.confirmPassword) {
        try {
          await
          this.$fire
            .auth
            .createUserWithEmailAndPassword(this.email, this.password).then((userCredential) => {
              this.user = userCredential.user
              this.$router.push('./homePage')
            })
        } catch (e) {
          this.handleError(e)
        }
        this.clearData()
      } else {
        this.passwordAlert = 'Passwords do not match'
      }
    },
    clearData () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.passwordAlert = ''
    }
  }
}

</script>

<style>

</style>
