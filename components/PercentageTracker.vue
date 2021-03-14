<template>
  <div>
    <h2>Win Percentage:</h2>
    {{ winPercentage }}
  </div>
</template>

<script>
export default {
  name: 'PercentageTracker',
  computed: {
    winPercentage () {
      const winsLosses = this.$store.state.winsLosses
      const arrayOfGamesWithResults = winsLosses.filter(value => value === '0' || value === '1')
      const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue)
      if (
        winsLosses.every(value => value === '')) {
        return 'No data yet'
      } else {
        return (winsLosses.reduce(reducer) / arrayOfGamesWithResults.length) * 100 + '%'
      }
    }
  }
}
</script>
