<template>
    <div>
        <h2>{{ statType }}</h2>
        <input type="text" placeholder= {{ statType }} v-model="player">
        <!-- why doesn't the prop work for the placeholder? -->
        <button type="submit">Add Player</button>
        <!-- move this button to index.vue to submit all input components-->
    </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['statType'],
  data () {
    return {
      player: ''
    }
  },

  computed: {
    players () {
      return this.$store.state.players
    }
  }
}
</script>
