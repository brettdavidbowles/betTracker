<template>
<table class="table text-center">
  <thead>
    <tr>
      <th>Picture</th>
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
        <td> <Picture
             v-if="urls.length > index"
             :url=urls[index].results[0].picture.thumbnail
             ></Picture></td>
        <td> {{ name }} </td>
        <td> {{ dates[index] }} </td>
        <td> {{ overUnders[index] }} </td>
        <td> {{ statNumbers[index] }}</td>
        <td> {{ statTypes[index] }} </td>
        <td><TableSelect :tableSelectIndex=index></TableSelect></td>
      </tr>
    </tbody>
</table>

</template>

<script>
import TableSelect from '../components/TableSelect'
import Picture from '../components/Picture'

export default {
  name: 'Table',
  props: {
    names: Array,
    dates: Array,
    statNumbers: Array,
    statTypes: Array,
    overUnders: Array,
    urls: Array
  },
  components: {
    TableSelect,
    Picture
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
