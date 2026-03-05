console.log("Hello, World!");

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Alice",
  age: 30,
}; 