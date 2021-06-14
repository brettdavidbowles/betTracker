export default {
  addBetNumber (state, payload) {
    state.betNumbers.push(payload)
  },
  addPlayer (state, [firstName, lastName]) {
    state.players.push(firstName + ' ' + lastName)
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
  },
  chooseWinLoss (state, [payload, index]) {
    state.winsLosses.splice(index, 1, payload)
  },
  //   get dan to show you this refactor again, so the payload is an object instead of array
  addRando (state, payload) {
    state.randos.push(payload)
  },
  setStat (state, payload) {
    state.stats.allRetrievedStats.push(payload)
  },
  setPlayer (state, payload) {
    state.retrievedPlayers.push(payload)
  },
  addPlayersNextPages (state, payload) {
    const mergedPages = {
      data: [...state.retrievedPlayers[state.retrievedPlayers.length - 1].data, ...payload.data]
    }
    state.retrievedPlayers.splice(state.retrievedPlayers.length - 1, 1, mergedPages)
  },
  setAssists (state, payload) {
    state.stats.specificRetrievedStats.retrievedAssists.push(payload)
  },
  setPoints (state, payload) {
    state.stats.specificRetrievedStats.retrievedPoints.push(payload)
  },
  setTotalRebounds (state, payload) {
    state.stats.specificRetrievedStats.retrievedTotalRebounds.push(payload)
  },
  setNeededStat (state, payload) {
    // const neededStat = window['retrieved' + this.statTypes[this.statTypes.length - 1].replace(' ', '')]
    state.stats.statsNeeded.push(payload)
  },
  changeBetFormTrigger (state) {
    state.betFormTrigger === 0 ? state.betFormTrigger = 1 : state.betFormTrigger = 0
  }
}
