export default {
  async addRando ({ commit }) {
    const rando = await this.$axios.$get('https://randomuser.me/api/')
    commit('addRando', rando)
  },
  async getStat ({ commit }) {
    const retrievedStat = await this.$axios.$get('https://www.balldontlie.io/api/v1/stats')
    commit('getStat', retrievedStat)
  },
  async getPlayer ({ commit }, { lastName }) {
    const retrievedPlayer = await this.$axios.$get(`https://www.balldontlie.io/api/v1/players?search=${lastName}`)
    commit('getPlayer', retrievedPlayer)
  }
}
