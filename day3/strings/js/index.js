// // 1. Convert Values to Strings
// // Write a function convertToString(value) that takes any input and returns its string representation using the String constructor.

// // function convertToString(value) {
// //     return String(value);
// // }

// // console.log(convertToString(123));       // "123"
// // console.log(convertToString(true));      // "true"
// // console.log(convertToString(null));      // "null"
// // console.log(convertToString(undefined)); // "undefined"
// // console.log(convertToString([1, 2, 3])); // "1,2,3"


// // 2. Check if a Variable is a String Object

// // Write a function isStringObject(value) that checks if the given value is a 
// // String object (created using new String()) instead of a primitive string.

// // function isStringObject(value) {
// //     return value instanceof String;
// // }

// // console.log(isStringObject("hello"));              // false (primitive string)
// // console.log(isStringObject(new String("hello")));  // true (String object)
// // console.log(isStringObject(123));                  // false
// // console.log(isStringObject(new String(123)));      // true

// // 3. Avoid String Object Comparison Issues

// // Write a function safeStringCompare(str1, str2) that safely compares two string values and returns true if they are equal, 
// // ensuring that String objects and primitive strings are treated the same.

// // function safeStringCompare(str1, str2) {
// //     return str1 === str2;
// // }

// // console.log(safeStringCompare("hello", "hello"));                   
// // console.log(safeStringCompare(new String("hello"), "hello"));       
// // console.log(safeStringCompare(new String("hello"), new String("hello"))); 
// // console.log(safeStringCompare("hello", "world"));                   

// // Question 4
// // Write a function getCharAt(str, index) that returns the character at the given index in the string using the String.at() method. 
// // The function should also support negative indices (where -1 refers to the last character, -2 to the second-last, and so on).

// // function getCharAt(str,index){
// //     return str.at(index);
// // }

// // console.log(getCharAt("hello", 1));   // "e"
// // console.log(getCharAt("hello", -1));  // "o"
// // console.log(getCharAt("JavaScript", -3)); // "i"
// // console.log(getCharAt("world", 10));  // undefined (out of bounds)
// // console.log(getCharAt("code", -5));   // undefined (out of bounds)

// // Question 5
// // Write a function getCharacter(str, index) that returns the character at the given index in 
// // the string using the String.charAt() method. If the index is out of bounds, return "Invalid index".

// // function getCharacter(str, index) {
// //     if (0> index || index >= str.length)
// //         { return "Invalid index";}
// //     else 
// //         {return str.charAt(index);}
// // }

// // console.log(getCharacter("hello", 1));   // "e"
// // console.log(getCharacter("hello", 4));   // "o"
// // console.log(getCharacter("JavaScript", 0)); // "J"
// // console.log(getCharacter("world", 10));  // "Invalid index"
// // console.log(getCharacter("code", -1));   // "Invalid index"

// // Question 6
// // Write a function mergeStrings(str1, str2, str3) that takes three strings as input and returns a single concatenated string using
// // the String.concat() method. If any of the strings are empty, they should be ignored in the final output.

// // function mergeStrings(str1, str2, str3) {
// //     return  str1.concat(str2,str3)
// // }

// // console.log(mergeStrings("Hello", " ", "World"));  // "Hello World"
// // console.log(mergeStrings("JavaScript", " is", " awesome"));  // "JavaScript is awesome"
// // console.log(mergeStrings("", "OpenAI", " GPT"));  // "OpenAI GPT"
// // console.log(mergeStrings("Concat", "", "enation"));  // "Concatenation"
// // console.log(mergeStrings("", "", ""));  // ""

// // Question: 7
// // Check if a String Ends with a Given Suffix
// // Write a function hasSuffix(str, suffix) that checks if the string str ends with 
// // the given suffix using the String.endsWith() method.

// // function hasSuffix(str, suffix) {
// //     return str.endsWith(suffix);
// // }

// // console.log(hasSuffix("hello world", "world"));  // true
// // console.log(hasSuffix("JavaScript", "Script"));  // true
// // console.log(hasSuffix("coding", "ing"));         // true
// // console.log(hasSuffix("developer", "Dev"));      // false
// // console.log(hasSuffix("OpenAI", "AI "));         // false (extra space)

// // Question: 8
// // Filter Words that End with a Specific Letter
// // Write a function filterWords(words, letter) that takes an array of words and a letter, 
// // then returns only the words that end with the given letter, using String.endsWith().

// function filterWords(words, letter) {
//     return words.filter(function(word){
//         return word.endsWith(letter);
//     });
// }


// // Test cases
// console.log(filterWords(["apple", "banana", "grape", "pear"], "e"));  
// // ["apple", "grape"]

// console.log(filterWords(["coding", "playing", "reading", "sleep"], "g"));  
// // ["coding", "playing", "reading"]

// console.log(filterWords(["cat", "dog", "bat"], "t"));  
// // ["cat", "bat"]

// console.log(filterWords(["hello", "world", "AI"], "x"));  
// // []


// at() Questions:
// Question 1: Given the string "Programming", use the at() method to find the character at the 7th position.
// Question 2: From the string "Code with Fun", use at() to get the last character using a negative index.
// Question 3: Use at() to retrieve the 1st character of the string "Learn" using both a positive and negative index. Are the results the same?
// Question 4: Given the string "Technology", what will str.at(15) return? Why?
// Question 5: Use the at() method to extract the 3rd character from the string "Innovation" and check whether it is a vowel.

//1
{let charAt7 = "programming"
    console.log(charAt7.at(7));
    }

//2
{let lastChar = "Code with Fun";
    console.log(lastChar.at(-1));
}

//3
{let testAt = "learn"
    console.log(testAt.at(0));
    console.log(testAt.at(-1));
}

//4
// It will show undefiend as there are only 10 character in the String

//5
{let charAt3 = "Innovation".at(3)
    const vowel = "aeiouAEIOU"
    if (vowel.includes(charAt3)) {
        return console.log("is a vowel");
    } else {
        return console.log("is not a vowel");
    }
}