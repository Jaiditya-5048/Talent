// 1. Object.assign()
// Question: How do you merge the objects {a: 1} and {b: 2} into a single object using Object.assign()?

const tobj1 = {a: 1};
const tobj2 = {b: 2};

const assign = Object.assign(tobj1, tobj2);

console.log(assign);

// 2. Object.create()
// Question: How can you create an object student that inherits from the object person using Object.create()?
// [The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.]

const person = {
    name : null,
    age : null,
    class : null,
}

const student = Object.create(person);

student.name = "Jai";
student.age = "23";
// student.class = null;

console.log(student);

// 3. Object.defineProperty()
// Question: How do you define a non-writable property "name" with the value "John" in an object user?
// [The Object.defineProperty() static method defines a new property directly on an object, 
// or modifies an existing property on an object, and returns the object.]



