// const lane = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM"];
// const role = ["SOLO", "DUO_SUPPORT", "DUO_CARRY", "NONE"];
//const summoners = ["11", "7", "21"]; // [Smite, Heal, Barrier]

const sortByLane = (arr) => {
  arr.forEach((player) => {
    const lane = player.timeline.lane;
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
          if (role === "DUO_CARRY") playerArr[3] = player;
          if (role === "DUO_SUPPORT") playerArr[4] = player;
          break;
        default:
          return;
      }
      return playerArr;
    }
  });
};
