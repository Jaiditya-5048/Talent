function bmiCalculator(weight, height) {
    var bmi = Math.round(weight / Math.pow(height, 2) * 10) / 10;
 
    if (bmi < 18.5) {
        return "Your BMI is " + bmi + ", so you are underweight.";
    }
    if (bmi >= 18.5 && bmi <= 24.9) { 
        return "Your BMI is " + bmi + ", so you have a normal weight.";
    }
    else {
        return "Your BMI is " + bmi + ", so you are overweight.";
    }
 }
 
 console.log(bmiCalculator(100, 1.8));

 



 const a = "a";
const b = "b";
if (a < b) {
  // true
  console.log(`${a} is less than ${b}`);
} else if (a > b) {
  console.log(`${a} is greater than ${b}`);
} else {
  console.log(`${a} and ${b} are equal.`);
}
