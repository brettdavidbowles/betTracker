<template>
<div>
  <table class="table">
      <thead>
        <tr>
            <th>Player Name</th>
            <th>Game Date</th>
            <th>Stat</th>
            <th>Stat Type</th>
            <th>Over/Under</th>
            <th>Win/Loss</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(name, index) in names" :key="name">
          <td> {{ name }} </td>
          <td> {{ dates[index] }} </td>
          <td> {{ statNumbers[index] }}</td>
          <td> {{ statTypes[index] }} </td>
          <td> {{ overUnders[index] }} </td>
          <td> <select v-model="winLoss" @change="addWOrL">
               <option disabled value="">Win or Loss?</option>
               <option value="1"> Win </option>
               <option value="0"> Loss </option>
               </select>
          </td>
          <!-- send wins/losses to state with mutation -->
      </tr>
      </tbody>
  </table>
</div>

</template>

<script>
export default {
  name: 'Table',
  props: {
    names: Array,
    dates: Array,
    statNumbers: Array,
    statTypes: Array,
    overUnders: Array
  },
  data () {
    return {
      winLoss: ''
    }
  },
  methods: {
    addWOrL () {
      if (this.winLoss) {
        this.$store.commit('addWinLoss', this.winLoss)
        console.log(this.$store.state.winsLosses)
      }
    }
  }
}
</script>

<style scoped>
.table {
    table-layout:fixed;
    width: 100%;
    border: 3px solid black
}
</style>
