export default {
  async addRando ({ commit }) {
    const rando = await this.$axios.$get('https://randomuser.me/api/')
    commit('addRando', rando)
  },
  async getPlayerData ({ commit, state }, [name, date, statType, index]) {
    let counter = 2
    const retrievedPlayer = await this.$axios.$get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
    commit('setPlayer', retrievedPlayer)
    // this next bit is only necessary if the data array.length > 1, if the first and last name are accurate this will be extremely rare, so can worry about this later hopefully
    while (counter <= retrievedPlayer.meta.total_pages) {
      const nextRetrievedPlayer = await this.$axios.$get(`https://www.balldontlie.io/api/v1/players?search=${name}&page=${counter}`)
      commit('addPlayersNextPages', nextRetrievedPlayer)
      counter++
    }
    if (state.retrievedPlayers[index].data[0]) {
      const retrievedPlayerId = state.retrievedPlayers[index].data[0].id
      const retrievedStat = await this.$axios.$get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${retrievedPlayerId}&start_date=${date}&end_date=${date}`)
      if (retrievedStat.meta.total_pages === 1) {
        commit('setStat', retrievedStat)
        // this is getting wet... make a generic function but not now it's midnight
        const retrievedAssists = state.stats.allRetrievedStats[index].data[0].ast
        commit('setAssists', retrievedAssists)
        const retrievedPoints = state.stats.allRetrievedStats[index].data[0].pts
        commit('setPoints', retrievedPoints)
        const retrievedTotalRebounds = state.stats.allRetrievedStats[index].data[0].reb
        commit('setTotalRebounds', retrievedTotalRebounds)
        const neededStatArray = state.stats.specificRetrievedStats[Object.keys(state.stats.specificRetrievedStats).filter(x => x.includes(statType.replace(' ', '')))]
        const neededStat = neededStatArray[index]
        commit('setNeededStat', neededStat)
        if (state.overUnders[index] === 'Over') {
          state.stats.statsNeeded[index] > state.statNumbers[index] ? commit('chooseWinLoss', ['1', index]) : commit('chooseWinLoss', ['0', index])
        } else if (state.overUnders[index] === 'Under') {
          state.stats.statsNeeded[index] < state.statNumbers[index] ? commit('chooseWinLoss', ['1', index]) : commit('chooseWinLoss', ['0', index])
        }
      } else {
        const noData = 'NO DATA'
        commit('setStat', noData)
        commit('setAssists', noData)
        commit('setPoints', noData)
        commit('setTotalRebounds', noData)
        commit('setNeededStat', noData)
      }
    } else {
      const noData = 'NO DATA'
      commit('setStat', noData)
      commit('setAssists', noData)
      commit('setPoints', noData)
      commit('setTotalRebounds', noData)
      commit('setNeededStat', noData)
    }
  },
  chooseStatType ({ commit, state }, statType) {
    const neededStatArray = state.stats.specificRetrievedStats[Object.keys(state.stats.specificRetrievedStats).filter(x => x.includes(statType.replace(' ', '')))]
    const neededStat = neededStatArray[0][neededStatArray.length - 1]
    commit('setNeededStat', neededStat)
  }
}
