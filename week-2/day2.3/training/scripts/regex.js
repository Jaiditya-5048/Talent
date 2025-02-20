
// Common Regex Patterns

// Pattern	    Description	                                Example
//   .	        Matches any character except newline	    /h.llo/ → "hello", "hallo"
//   ^	        Matches start of string	                    /^hello/ → "hello world" (✅) "world hello" (❌)
//   $	        Matches end of string	                    /world$/ → "hello world" (✅) "world hello" (❌)
//   \d	        Matches a digit (0-9)	                    /\d+/ → "123"
//   \w	        Matches a word character                    (a-z, A-Z, 0-9, _)	/\w+/ → "hello123"
//   \s	        Matches whitespace                          (space, tab, newline)	/\s+/ → " "
//   \b	        Matches word boundary	                    /\bword\b/ → "word" but not "sword"
//   \S	        Matches non-whitespace characters	        /\S+/ → "hello"
//   \D	        Matches non-digit characters	            /\D+/ → "abc"
//   \W	        Matches non-word characters	                /\W+/ → "@#$%"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Quantifiers

// Quantifier	Description	                Example
//  *	        0 or more times	            /go*d/ → "gd", "god", "good"
//  +	        1 or more times	            /go+d/ → "god", "good" but not "gd"
//  ?	        0 or 1 time	                /colou?r/ → "color", "colour"
//  {n}	        Exactly n times	            /\d{3}/ → "123"
//  {n,}	    At least n times	        /\d{2,}/ → "1234"
//  {n,m}	    Between n and m times	    /\d{2,4}/ → "12", "123", "1234"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Flags

// Flag	    Description	                        Example
//  g	    Global match (find all matches)	    "hello hello".match(/hello/g) → ["hello", "hello"]
//  i	    Case-insensitive	                "Hello".match(/hello/i) → ["Hello"]
//  m	    Multi-line match	                /^hello/m

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Challenge 1: Match a Phone Number
// Write a regex to match a phone number in the format "123-456-7890".

// const num = "123-456-7890";
// const regex = /^\d{3}-\d{3}-\d{4}$/;
// console.log(regex.test(num));

//////////////////////////////////////

// Challenge 2: Match an Email Address
// Write a regex that matches a valid email address.

// 👉 Requirements:

// The email should start with letters, numbers, dots (.), underscores (_), or hyphens (-).
// Then, it must have an "@" symbol.
// After "@", there should be letters, numbers, or hyphens (-).
// Then, a dot (.) followed by 2 to 4 letters (like .com, .org, .net).

const email = "test@example.com";
const regex = /[\w.-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4} /;
console.log(regex.test(email));

