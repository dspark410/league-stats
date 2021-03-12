// const lane = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM"];
// const role = ["SOLO", "DUO_SUPPORT", "DUO_CARRY", "NONE"];
//const summoners = ["11", "7", "21"]; // [Smite, Heal, Barrier]

const sortByLane = (arr, gameType) => {
  if (
    gameType === '5v5 Ranked Solo games' ||
    gameType === '5v5 Draft Pick games' ||
    gameType === '5v5 Ranked Flex games' ||
    gameType === '5v5 Blind Pick games'
  ) {
    const playerArr = []

    arr.forEach((player) => {
      const lane = player.timeline.lane
      const role = player.timeline.role

      if (lane !== 'NONE') {
        switch (lane) {
          case 'TOP':
            if (role === 'DUO_CARRY') playerArr[3] = player
            if (role === 'DUO_SUPPORT') playerArr[4] = player
            if (role === 'SOLO') playerArr[0] = player
            break
          case 'JUNGLE':
            playerArr[1] = player
            break
          case 'MIDDLE':
            if (role === 'DUO_CARRY') playerArr[2] = player
            if (role === 'DUO_SUPPORT') playerArr[4] = player
            break
          case 'BOTTOM':
            if (role === 'DUO_CARRY') playerArr[3] = player
            if (role === 'DUO_SUPPORT') playerArr[4] = player
            if (role === 'SOLO') playerArr[0] = player
            break
          default:
            return
        }
      }
    })

    return playerArr
  }
  return arr
}
