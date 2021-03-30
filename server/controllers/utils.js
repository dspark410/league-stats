const { getMasteries2 } = require("./summoner");

exports.getSummonerMasteries = async (id, region, champInfo) =>
  getMasteries2(id, region).then((masteryRes) => {
    const champObject = [];

    let champMastery = 5;

    masteryRes.length < 5 && champMastery === masteryRes.length;

    for (let i = 0; i < champMastery; i++) {
      champInfo.forEach((champ) => {
        if (+champ.key === masteryRes[i].championId) {
          const name = champ.name;
          const key = masteryRes[i].championId;
          const image = champ.image.full;
          const level = masteryRes[i].championLevel;
          const points = masteryRes[i].championPoints;
          const id = champ.id;

          const object = {
            name,
            id,
            key,
            image,
            level,
            points,
          };
          champObject.push(object);
        }
      });
    }
    return champObject;
  });
