export default {
  async addRando ({ commit }) {
    const rando = await this.$axios.$get('https://randomuser.me/api/')
    commit('addRando', rando)
  }
}
