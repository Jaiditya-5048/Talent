// 1) push
// Question: How do you add multiple elements ("apple", "banana", "cherry") to the end of an array fruits using the push method?

const fruits = ["mangno" , "grapes"];

fruits.push = ("apple", "banana", "cherry");
console.log(fruits);

// 2) unshift
// Question: What will be the output of the following code?

let numbers = [2, 3, 4];  
numbers.unshift(1);  
console.log(numbers);

// 3) splice
// Question: Given an array let colors = ["red", "blue", "green", "yellow"];,
//  how do you remove "blue" and "green" from the array using splice?

const colors = ["red", "blue", "green", "yellow"];
colors.splice(1,2);
console.log(colors);

// 4) filter
// Question: How can you use the filter method to get all even numbers from the array [1, 2, 3, 4, 5, 6]?

const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter((even) => even % 2 === 0);
console.log(evens);

// 5) findIndex
// Question: What does the following code return?   
// [returns the index of the first to satisfy the conditiols, else returns -1]

let tnums = [10, 20, 30, 40];  
let index = tnums.findIndex(num => num > 25);  
console.log(index);

// 6) indexOf
// Question: what will arr.indexOf("dog") return?

let arr = ["cat", "dog", "rabbit", "dog"];
console.log(arr.indexOf("dog"));

// 7) forEach
// Question: How can you use forEach to print each element of the array ["apple", "banana", "cherry"] to the console?

const fals = ["apple", "banana", "cherry"];
fals.forEach((fal) => console.log(fal));

// 8) pop
// Question: What will be the final state of numbers after executing the following code?

let n = [1, 2, 3, 4];  
n.pop();  
console.log(n);

// 9) shift
// Question: What does shift do to the array let items = ["first", "second", "third"]; when called?
// [he shift() method of Array instances removes the first element from an array and returns that removed element.
// This method changes the length of the array.]


items = ["first", "second", "third"];
console.log(items.shift());