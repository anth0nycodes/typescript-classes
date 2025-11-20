/**
 * Exercise 2: Static Constants (Easy)
 *
 * Create a Temperature class with static constants and
 * static utility methods for temperature conversion.
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class Temperature {
  celsius: number;
  static readonly FREEZING_POINT_C: number = 0;
  static readonly BOILING_POINT_C: number = 100;
  static readonly ABSOLUTE_ZERO_C: number = -273.15;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  toFahrenheit() {
    return Temperature.celsiusToFahrenheit(this.celsius);
  }

  toKelvin() {
    return Temperature.celsiusToKelvin(this.celsius);
  }

  static celsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  static fahrenheitToCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  static celsiusToKelvin(celsius: number) {
    return celsius + 273.15;
  }

  static kelvinToCelsius(kelvin: number) {
    return kelvin - 273.15;
  }
}

// Using static methods (utility functions)
console.log(Temperature.celsiusToFahrenheit(0)); // 32
console.log(Temperature.celsiusToFahrenheit(100)); // 212
console.log(Temperature.fahrenheitToCelsius(32)); // 0

// Using static constants
console.log(Temperature.FREEZING_POINT_C); // 0
console.log(Temperature.BOILING_POINT_C); // 100

// Using instances
const temp = new Temperature(25);
console.log(temp.toFahrenheit()); // 77
console.log(temp.toKelvin()); // 298.15
