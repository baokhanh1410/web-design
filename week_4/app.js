// ====================LAB 1====================
const arr = [
  { id: 1, name: "Sample A", score: 85, result: "pass" },
  { id: 2, name: "Sample B", score: 42, result: "fail" },
  { id: 3, name: "Sample C", score: 91, result: "pass" },
  { id: 4, name: "Sample D", score: 58, result: "fail" },
  { id: 5, name: "Sample E", score: 77, result: "pass" }
];

// Write a for loop that filters the array by a condition.
for (let i in arr) {
    if (arr[i]["score"] >= 80) {
        console.log(arr[i])
    }
}


// Write a function that sums a numeric field across all objects.
function sumNumeric(arr, fieldName) {
    let total = 0;
    for (let i in arr) {
        total += arr[i][fieldName]
    }
    return total
}

console.log(sumNumeric(arr,"score"))


// Write a function that finds the object with the largest value of a field, using a for loop.
function maxValue(arr, fieldName) {
    let max = arr[0][fieldName]
    for (let i = 0; i < arr.length; i++){
        if (arr[i][fieldName] >= max) {
            max = arr[i][fieldName]
        }
    }
    return max
}

console.log(maxValue(arr, "score"))


// Finished early? Convert one function to an arrow function.
const sumFieldArrow = (list, fieldName) => {
  let total = 0;
  for (const item of list) {
    total += item[fieldName] || 0;
  }
  return total;
};

console.log(sumFieldArrow(arr, "score"))

