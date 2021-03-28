export default {
  async addRando ({ commit }) {
    const rando = await this.$axios.$get('https://randomuser.me/api/')
    commit('addRando', rando)
  },
  async getPlayerData ({ commit, state }, [name, date]) {
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
    const retrievedStat = await this.$axios.$get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${retrievedPlayerId}&start_date[]=${date}`)
    debugger
    // change get to set everywhere
    commit('getStat', retrievedStat)
  },
  async getStat ({ commit }, [playerID, date]) {
    const retrievedStat = await this.$axios.$get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerID}&start_date[]=${date}`)
    commit('getStat', retrievedStat)
  }
}
