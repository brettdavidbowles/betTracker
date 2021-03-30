export default {
  async addRando ({ commit }) {
    const rando = await this.$axios.$get('https://randomuser.me/api/')
    commit('addRando', rando)
  },
  async getPlayerData ({ commit, state }, [name, date, statType]) {
    let counter = 2
    const retrievedPlayer = await this.$axios.$get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
    // change get to set
    commit('getPlayer', retrievedPlayer)
    // this next bit is only necessary if the data array.length > 1, if the first and last name are accurate this will be extremely rare, so can worry about this later hopefully
    while (counter <= retrievedPlayer.meta.total_pages) {
      const nextRetrievedPlayer = await this.$axios.$get(`https://www.balldontlie.io/api/v1/players?search=${name}&page=${counter}`)
      commit('addPlayersNextPages', nextRetrievedPlayer)
      counter++
    }
    const retrievedPlayerId = state.retrievedPlayers[state.retrievedPlayers.length - 1].data[0].id
    const retrievedStat = await this.$axios.$get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${retrievedPlayerId}&start_date=${date}&end_date=${date}`)
    // change get to set everywhere
    commit('getStat', retrievedStat)
    // this is getting wet... make a generic function but not now it's midnight
    const retrievedAssists = state.stats.allRetrievedStats[state.stats.allRetrievedStats.length - 1].data[0].ast
    commit('setAssists', retrievedAssists)
    const retrievedPoints = state.stats.allRetrievedStats[state.stats.allRetrievedStats.length - 1].data[0].pts
    commit('setPoints', retrievedPoints)
    const retrievedTotalRebounds = state.stats.allRetrievedStats[state.stats.allRetrievedStats.length - 1].data[0].reb
    commit('setTotalRebounds', retrievedTotalRebounds)
    const neededStatArray = state.stats.specificRetrievedStats[Object.keys(state.stats.specificRetrievedStats).filter(x => x.includes(statType.replace(' ', '')))]
    const neededStat = neededStatArray[neededStatArray.length - 1]
    commit('setNeededStat', neededStat)
  },
  chooseStatType ({ commit, state }, statType) {
    const neededStatArray = state.stats.specificRetrievedStats[Object.keys(state.stats.specificRetrievedStats).filter(x => x.includes(statType.replace(' ', '')))]
    const neededStat = neededStatArray[0][neededStatArray.length - 1]
    commit('setNeededStat', neededStat)
  }
}
