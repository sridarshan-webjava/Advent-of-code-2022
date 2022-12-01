const fs = require("fs");

// Function to get the calorie counts for each Elf
function getCalorieCounts(inputsArray) {
  let calorieCount = [];
  let trackedCount = 0;
  for (let i = 0; i < inputsArray.length; i++) {
    if (inputsArray[i] == "") {
      calorieCount.push(trackedCount);
      trackedCount = 0;
    } else {
      trackedCount += Number(inputsArray[i]);
    }
  }
  if (trackedCount > 0) {
    calorieCount.push(trackedCount);
  }
  return calorieCount;
}

// Function to sort the calorie counts in decreasing order
function sortCalorieCounts(calorieCount) {
  return calorieCount.sort((a, b) => b - a);
}

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    return;
  }
  const inputsArray = data.split("\n");
  const calorieCounts = getCalorieCounts(inputsArray);
  const maxCalorieCountsInOrder = sortCalorieCounts(calorieCounts);
  console.log(`Maximum calorie count: ${maxCalorieCountsInOrder[0]}`);
  console.log(
    `Total of top 3 calorie counts: ${
      maxCalorieCountsInOrder[0] +
      maxCalorieCountsInOrder[1] +
      maxCalorieCountsInOrder[2]
    }`
  );
});
