const prevSummoner = [
  ["mistahpig", "EUW1", 7],
  ["Chiew510", "NA1", 4834],
  ["DambitWes", "NA1", 3466],
  ["mistahpig", "NA1", 7],
];

const action = ["mistahpig", "NA1"];

const resultNAME = prevSummoner.filter((summoner) => {
  const result = summoner[0] !== action[0];
  console.log(result);
  return result;
});

console.log(resultNAME);

const resultREGION = prevSummoner.filter((summoner) => {
  const result = summoner[1] !== action[1];
  console.log(result);
  return result;
});

console.log(resultREGION);

const resultOR = prevSummoner.filter((summoner) => {
  const name = summoner[0] !== action[0];
  const region = summoner[1] !== action[1];
  const result = name || region;
  console.log(name, region);
  console.log(result);
  return result;
});

console.log(resultOR);

const resultAND = prevSummoner.filter((summoner) => {
  const name = summoner[0] !== action[0];
  const region = summoner[1] !== action[1];
  const result = name && region;
  console.log(name, region);
  console.log(result);
  return result;
});

console.log(resultAND);
