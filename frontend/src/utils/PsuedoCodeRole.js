// const lane = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM"];
// const role = ["SOLO", "DUO_SUPPORT", "DUO_CARRY", "NONE"];
//const summoners = ["11", "7", "21"]; // [Smite, Heal, Barrier]

const sortByLane = (arr) => {
  arr.forEach((player) => {
    const lane = player.timeline.lane;
    const role = player.timeline.role;
    const spell1 = player.spell1Id;
    const spell2 = player.spell2Id;

    const playerArr = [];

    if (lane !== "NONE") {
      switch (lane) {
        case "TOP":
          playerArr[0] = player;
          break;
        case "JUNGLE":
          playerArr[1] = player;
          break;
        case "MIDDLE":
          playerArr[2] = player;
          break;
        case "BOTTOM":
          if (role === "DUO_CARRY") {
            if (
              spell1 === 7 ||
              spell1 === 21 ||
              spell2 === 7 ||
              spell2 === 21
            ) {
              playerArr[3] = player;
            } else {
              playerArr[3] = player;
            }
          }
          if (role === "DUO_SUPPORT") {
            if (
              spell1 === 7 ||
              spell1 === 21 ||
              spell2 === 7 ||
              spell2 === 21
            ) {
              playerArr[3] = player;
            }
            playerArr[4] = player;
          }
          break;
        default:
          return;
      }
      return playerArr;
    }
  });
};
