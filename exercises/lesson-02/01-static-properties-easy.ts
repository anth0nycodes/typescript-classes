/**
 * Exercise 1: Static Properties (Easy)
 *
 * Create a Car class that uses static properties to track
 * the total number of cars created.
 *
 * See README.md for full requirements and example usage.
 */

class Car {
  brand: string;
  model: string;
  carId: number;
  static totalCars: number = 0;

  constructor(brand: string, model: string) {
    Car.totalCars++;
    this.brand = brand;
    this.model = model;
    this.carId = Car.totalCars;
  }

  static getTotalCars() {
    return Car.totalCars;
  }

  getInfo() {
    return `Car #${this.carId}: ${this.brand} ${this.model}`;
  }
}

const car1 = new Car("Toyota", "Camry");
const car2 = new Car("Honda", "Civic");
const car3 = new Car("Ford", "Mustang");

console.log(Car.getTotalCars()); // 3

console.log(car1.getInfo()); // "Car #1: Toyota Camry"
console.log(car2.getInfo()); // "Car #2: Honda Civic"
console.log(car3.getInfo()); // "Car #3: Ford Mustang"

// Static property accessed via class name
console.log(Car.totalCars); // 3
