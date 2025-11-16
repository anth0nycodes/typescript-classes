/**
 * Exercise 1: Simple Class (Easy)
 *
 * Create a Person class with basic properties:
 * - name (string)
 * - age (number)
 * - city (string)
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Person {
  name: string;
  age: number;
  city: string;

  constructor(name: string, age: number, city: string) {
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

const person1 = new Person("Alice", 30, "New York");
const person2 = new Person("Bob", 25, "Los Angeles");

console.log(person1.name); // "Alice"
console.log(person2.age); // 25
