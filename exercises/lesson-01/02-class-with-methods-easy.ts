/**
 * Exercise 2: Class with Methods (Easy)
 *
 * Create a Counter class with:
 * - count property (starts at 0)
 * - increment(), decrement(), getValue(), reset() methods
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Counter {
  count: number;

  constructor() {
    this.count = 0;
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  getValue(): number {
    return this.count;
  }

  reset(): void {
    this.count = 0;
  }
}

const counter = new Counter();
console.log(counter.getValue()); // 0

counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3

counter.decrement();
console.log(counter.getValue()); // 2

counter.reset();
console.log(counter.getValue()); // 0
