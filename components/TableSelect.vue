<template>
  <select v-model="winLoss" @change="addWOrL">
      <option disabled value="">Win or Loss?</option>
      <option value="1"> Win </option>
      <option value="0"> Loss </option>
  </select>
</template>

<script>
export default {
  name: 'TableSelect',
  methods: {
    addWOrL () {
      if (this.winLoss) {
        this.$store.commit('chooseWinLoss', [this.winLoss, this.tableSelectIndex])
        this.$emit('change-row-color')
      }
    }
  },
  props: {
    tableSelectIndex: Number
  },
  data () {
    return {
      winLoss: ''
    }
  },
  computed: {
    winsLosses () {
      return this.$store.state.winsLosses
    }
  }
}
</script>
