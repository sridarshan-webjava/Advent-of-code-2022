const fs = require("fs");

// Get range for given sections
const getRangeForGivenAssignment = assignment => {
  return assignment.split("-").map(value => Number(value));
};

// Get overlapping pairs for given inputs - fully contains another range
const getOverLappingPairs = (assignment1, assignment2) => {
  const [startSectionAssign1, endSectionAssign1] =
    getRangeForGivenAssignment(assignment1);
  const [startSectionAssign2, endSectionAssign2] =
    getRangeForGivenAssignment(assignment2);
  if (
    (startSectionAssign1 <= startSectionAssign2 &&
      startSectionAssign2 <= endSectionAssign1 &&
      startSectionAssign1 <= endSectionAssign2 &&
      endSectionAssign2 <= endSectionAssign1) ||
    (startSectionAssign2 <= startSectionAssign1 &&
      startSectionAssign1 <= endSectionAssign2 &&
      startSectionAssign2 <= endSectionAssign1 &&
      endSectionAssign1 <= endSectionAssign2)
  ) {
    return 1;
  }
  return 0;
};

// Get overlapping pairs for ranges - contains atleast 1 overlap
const getOverLappingPairsForRange = (assignment1, assignment2) => {
  const [startSectionAssign1, endSectionAssign1] =
    getRangeForGivenAssignment(assignment1);
  const [startSectionAssign2, endSectionAssign2] =
    getRangeForGivenAssignment(assignment2);
  if (
    (startSectionAssign1 <= startSectionAssign2 &&
      startSectionAssign2 <= endSectionAssign1) ||
    (startSectionAssign1 <= endSectionAssign2 &&
      endSectionAssign2 <= endSectionAssign1) ||
    (startSectionAssign2 <= startSectionAssign1 &&
      startSectionAssign1 <= endSectionAssign2) ||
    (startSectionAssign2 <= endSectionAssign1 &&
      endSectionAssign1 <= endSectionAssign2)
  ) {
    return 1;
  }
  return 0;
};

fs.readFile("../inputs.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const inputs = data.split("\n");

  const noOfOverlapsInPairs = inputs.reduce((count, pair) => {
    return count + getOverLappingPairs(...pair.split(","));
  }, 0);
  console.log(noOfOverlapsInPairs);

  const noOfOverlapsInRange = inputs.reduce((count, pair) => {
    return count + getOverLappingPairsForRange(...pair.split(","));
  }, 0);
  console.log(noOfOverlapsInRange);
});
