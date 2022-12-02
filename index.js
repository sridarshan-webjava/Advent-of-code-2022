const fs = require("fs");

// Function to compute score for the assumed outcomes
const scoreForAssumedOutcomes = roundInputs => {
  switch (roundInputs) {
    case "A X":
      return 4;
    case "A Y":
      return 8;
    case "A Z":
      return 3;
    case "B X":
      return 1;
    case "B Y":
      return 5;
    case "B Z":
      return 9;
    case "C X":
      return 7;
    case "C Y":
      return 2;
    case "C Z":
      return 6;
    default:
      return 0;
  }
};

// Function to compute score for the actual outcomes
const scoreForActualOutcomes = roundInputs => {
  switch (roundInputs) {
    case "A X":
      return 3;
    case "A Y":
      return 4;
    case "A Z":
      return 8;
    case "B X":
      return 1;
    case "B Y":
      return 5;
    case "B Z":
      return 9;
    case "C X":
      return 2;
    case "C Y":
      return 6;
    case "C Z":
      return 7;
    default:
      return 0;
  }
};

fs.readFile("./inputs.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const inputs = data.split("\n");
  const totalScoreForAssumedGame = inputs.reduce(
    (gameScore, roundInputs) =>
      gameScore + scoreForAssumedOutcomes(roundInputs),
    0
  );
  console.log(
    `Total score after the assumed game completion: ${totalScoreForAssumedGame}`
  );
  const totalScoreForActualGame = inputs.reduce(
    (gameScore, roundInputs) => gameScore + scoreForActualOutcomes(roundInputs),
    0
  );
  console.log(
    `Total score after the actual game completion: ${totalScoreForActualGame}`
  );
});
