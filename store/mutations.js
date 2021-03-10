export default {
  addPlayer (state, payload) {
    state.players.push(payload)
  },
  addDate (state, payload) {
    state.dates.push(payload)
  },
  addStatNumber (state, payload) {
    state.statNumbers.push(payload)
  },
  addStatType (state, payload) {
    state.statTypes.push(payload)
  },
  addOverUnder (state, payload) {
    state.overUnders.push(payload)
  },
  addWinLoss (state, payload) {
    state.winsLosses.push(payload)
  }
}
