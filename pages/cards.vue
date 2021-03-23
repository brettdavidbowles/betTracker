<template>
  <div>
    <p>This is the cards page</p>
    <div class="flex flex-wrap">
      <Card v-for="player in players" :key="player.index" :title="players" />
    </div>
    <a href="./">Back to Main Page</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '../components/Card'

export default {
  name: 'Pages',
  components: {
    Card
  },
  computed: {
    ...mapState([
      'players',
      'dates',
      'statNumbers',
      'statTypes',
      'overUnders',
      'winsLosses',
      'randos'
    ])
  },
  created () {
    console.log(this.players.length)
  }
}
</script>
