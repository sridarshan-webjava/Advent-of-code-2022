const fs = require("fs");

// Generate priority mapping for lowercase and uppercase items
const generatePriorityMapping = () => {
  const mapping = new Map();
  const startPointLowerCase = "a".charCodeAt(0);
  const startPointUpperCase = "A".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    const character = String.fromCharCode(startPointLowerCase + i);
    mapping.set(character, i + 1);
  }
  for (let i = 0; i < 26; i++) {
    const character = String.fromCharCode(startPointUpperCase + i);
    mapping.set(character, i + 27);
  }
  return mapping;
};

// Filter string to remove repeated items
const getFilteredItems = itemsList => {
  const filteredType = new Set();
  for (const itemType of itemsList) {
    filteredType.add(itemType);
  }
  return Array.from(filteredType).join("");
};

/*
    Takes a list of string and map (priority map) as inputs.
    1. Filters the input array by removing repeated occurences in each of the input
    and gets the final added string for the input array
    2. Iterates through the filtered string and obtains item (the mismatched item
    occurs twice in the filtered string)
    3. Gets the priority for the item and returns the count
*/
const getTypeAndPriorityForRucksack = (inputs, priorityMap) => {
  const rucksackItems = new Map();

  let priorityItem = "";
  let maxCountOfItem = 0;
  let filteredItemsList = "";

  for (let i = 0; i < inputs.length; i++) {
    const filteredItems = getFilteredItems(inputs[i]);
    filteredItemsList += filteredItems;
  }

  for (let i = 0; i < filteredItemsList.length; i++) {
    const item = filteredItemsList[i];
    if (rucksackItems.has(item)) {
      const count = rucksackItems.get(item);
      rucksackItems.set(item, count + 1);
    } else {
      rucksackItems.set(item, 1);
    }
  }

  for (const mapEntry of rucksackItems.entries()) {
    if (mapEntry[1] > maxCountOfItem) {
      priorityItem = mapEntry[0];
      maxCountOfItem = mapEntry[1];
    }
  }

  return priorityMap.get(priorityItem);
};

fs.readFile("../inputs.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const inputs = data.split("\n");
  const priorityMap = generatePriorityMapping();

  //   Get priority sum for individual items in the array
  const priorityItemsSum = inputs.reduce((currentSum, input) => {
    let compartmentLength = Math.floor(input.length / 2);
    const itemsArray = [].concat([
      input.slice(0, compartmentLength),
      input.slice(compartmentLength, input.length),
    ]);
    return currentSum + getTypeAndPriorityForRucksack(itemsArray, priorityMap);
  }, 0);
  console.log("Sum of priority items: ", priorityItemsSum);

  //   Get priority sum for a group of items in the array
  let priorityItemsSumForGroup = 0;
  for (let i = 0; i < inputs.length; i += 3) {
    const itemsArray = [].concat([inputs[i], inputs[i + 1], inputs[i + 2]]);
    priorityItemsSumForGroup += getTypeAndPriorityForRucksack(
      itemsArray,
      priorityMap
    );
  }
  console.log("Sum of priority items (groups): ", priorityItemsSumForGroup);
});
