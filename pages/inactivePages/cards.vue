<template>
  <div>
    <p>This is the cards page</p>
    <div class="flex flex-wrap">
      <Card v-for="player in players" :key="player.index" :title="player.title" />
    </div>
    {{ players }}
    <NuxtLink to="./">Back to Main Page</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pages',
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
