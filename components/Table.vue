<template>
<div>
  <table class="table">
      <thead>
        <tr>
            <th>Player Name</th>
            <th>Game Date</th>
            <th>Over/Under</th>
            <th>Stat</th>
            <th>Stat Type</th>
            <th>Win/Loss</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(name, index) in names" :key="name">
          <td> {{ name }} </td>
          <td> {{ dates[index] }} </td>
          <td> {{ overUnders[index] }} </td>
          <td> {{ statNumbers[index] }}</td>
          <td> {{ statTypes[index] }} </td>
          <td><TableSelect :tableSelectIndex=index></TableSelect></td>
      </tr>
      </tbody>
  </table>
</div>

</template>

<script>
import TableSelect from '../components/TableSelect'

export default {
  name: 'Table',
  props: {
    names: Array,
    dates: Array,
    statNumbers: Array,
    statTypes: Array,
    overUnders: Array
  },
  components: {
    TableSelect
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
