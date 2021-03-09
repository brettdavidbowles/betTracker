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
      <tr v-for="(name, index) in names" :key="name" class="bg-emerald-200">
          <td> {{ name }} </td>
          <td> {{ dates[index] }} </td>
          <td> {{ statNumbers[index] }}</td>
          <td> {{ statTypes[index] }} </td>
          <td> {{ overUnders[index] }} </td>
          <td> <select v-model="winLoss">
               <option disabled value="">Win or Loss?</option>
               <option>Win</option>
               <option>Loss</option>
               </select>
          </td>
          <!-- send wins/losses to state with mutation -->
      </tr>
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
