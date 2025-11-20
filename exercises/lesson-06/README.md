# Lesson 06 Exercises: Abstract Classes

Complete these exercises to practice using abstract classes, abstract methods, and the template method pattern.

---

## Exercise 1: Basic Abstract Class (Easy)

**File:** `01-basic-abstract-class-easy.ts`

Create an abstract `Shape` class with concrete implementations:

**Requirements:**

**Abstract Shape class:**
- Property: `color` (string)
- Constructor accepts color
- Abstract method `getArea()`: returns number
- Abstract method `getPerimeter()`: returns number
- Concrete method `describe()`: returns formatted description using getArea()

**Circle class (extends Shape):**
- Additional property: `radius` (number)
- Constructor accepts color and radius
- Implement `getArea()`: π * r²
- Implement `getPerimeter()`: 2 * π * r

**Rectangle class (extends Shape):**
- Additional properties: `width` (number), `height` (number)
- Constructor accepts color, width, height
- Implement `getArea()`: width * height
- Implement `getPerimeter()`: 2 * (width + height)

**Validation Requirements:**
- Abstract Shape class:
  - Cannot be instantiated directly (abstract class)
  - Constructor: color must be non-empty string
  - `getArea()` and `getPerimeter()` must be abstract (no implementation)
  - `describe()` must be concrete and use `getArea()` method
- Circle class:
  - Constructor: must call `super(color)`, radius must be positive (> 0)
  - `getArea()`: use Math.PI, return accurate calculation
  - `getPerimeter()`: use Math.PI, return accurate calculation
- Rectangle class:
  - Constructor: must call `super(color)`, width and height must be positive (> 0)
  - `getArea()`: return width * height
  - `getPerimeter()`: return 2 * (width + height)
- All subclasses must implement all abstract methods

**Example usage:**
```typescript
// Test that abstract class cannot be instantiated
// const shape = new Shape("red"); // ❌ Error - cannot instantiate abstract class

// Test Circle
const circle = new Circle("red", 5);
console.log(circle.color);          // "red"
console.log(circle.radius);         // 5
console.log(circle.getArea());      // 78.54 (approx, Math.PI * 5 * 5)
console.log(circle.getPerimeter()); // 31.42 (approx, 2 * Math.PI * 5)
console.log(circle.describe());     // "A red shape with area 78.54"

// Test Circle with different values
const circle2 = new Circle("green", 10);
console.log(circle2.getArea());      // 314.16 (approx)
console.log(circle2.getPerimeter()); // 62.83 (approx)
console.log(circle2.describe());     // "A green shape with area 314.16"

// Test Rectangle
const rectangle = new Rectangle("blue", 4, 6);
console.log(rectangle.color);         // "blue"
console.log(rectangle.width);         // 4
console.log(rectangle.height);        // 6
console.log(rectangle.getArea());     // 24
console.log(rectangle.getPerimeter()); // 20
console.log(rectangle.describe());     // "A blue shape with area 24"

// Test Rectangle with different values
const rectangle2 = new Rectangle("yellow", 10, 5);
console.log(rectangle2.getArea());      // 50
console.log(rectangle2.getPerimeter()); // 30
console.log(rectangle2.describe());     // "A yellow shape with area 50"

// Test that describe() uses getArea() (inherited concrete method)
const square = new Rectangle("purple", 7, 7);
console.log(square.getArea());      // 49
console.log(square.getPerimeter()); // 28
console.log(square.describe());     // "A purple shape with area 49"

// Test multiple independent shapes
const shapes = [circle, rectangle, circle2, rectangle2];
shapes.forEach(shape => {
  console.log(`${shape.color}: Area = ${shape.getArea()}, Perimeter = ${shape.getPerimeter()}`);
});
```

**Learning goals:** Abstract classes and methods, implementing abstract methods, concrete methods in abstract classes

---

## Exercise 2: Abstract Methods and Template Pattern (Easy)

**File:** `02-template-pattern-easy.ts`

Create an abstract `Beverage` class with a template method pattern:

**Requirements:**

**Abstract Beverage class:**
- Abstract method `brew()`: returns string
- Abstract method `addCondiments()`: returns string
- Concrete method `boilWater()`: returns "Boiling water"
- Concrete method `pourInCup()`: returns "Pouring into cup"
- Concrete method `prepare()`: template method that calls all steps in order

**Coffee class (extends Beverage):**
- Implement `brew()`: returns "Brewing coffee grounds"
- Implement `addCondiments()`: returns "Adding sugar and milk"

**Tea class (extends Beverage):**
- Implement `brew()`: returns "Steeping tea leaves"
- Implement `addCondiments()`: returns "Adding lemon"

**Validation Requirements:**
- Abstract Beverage class:
  - Cannot be instantiated directly
  - `brew()` and `addCondiments()` must be abstract
  - `boilWater()`, `pourInCup()`, and `prepare()` must be concrete
  - `prepare()` must call methods in correct order: boilWater, brew, pourInCup, addCondiments
- Coffee class:
  - Must implement `brew()` and `addCondiments()`
  - Must extend Beverage (call super in constructor if needed)
- Tea class:
  - Must implement `brew()` and `addCondiments()`
  - Must extend Beverage (call super in constructor if needed)
- Template method pattern:
  - `prepare()` defines the algorithm structure
  - Subclasses customize specific steps via abstract methods

**Example usage:**
```typescript
// Test that abstract class cannot be instantiated
// const beverage = new Beverage(); // ❌ Error - cannot instantiate abstract class

// Test Coffee
const coffee = new Coffee();

// Test individual methods
console.log(coffee.boilWater());      // "Boiling water"
console.log(coffee.brew());           // "Brewing coffee grounds"
console.log(coffee.pourInCup());      // "Pouring into cup"
console.log(coffee.addCondiments());  // "Adding sugar and milk"

// Test template method (prepare calls all steps in order)
console.log(coffee.prepare());
// Output (multi-line string):
// "Boiling water"
// "Brewing coffee grounds"
// "Pouring into cup"
// "Adding sugar and milk"

// Test Tea
const tea = new Tea();

// Test individual methods
console.log(tea.boilWater());      // "Boiling water"
console.log(tea.brew());           // "Steeping tea leaves"
console.log(tea.pourInCup());      // "Pouring into cup"
console.log(tea.addCondiments());  // "Adding lemon"

// Test template method
console.log(tea.prepare());
// Output (multi-line string):
// "Boiling water"
// "Steeping tea leaves"
// "Pouring into cup"
// "Adding lemon"

// Test that concrete methods are shared (inherited from Beverage)
const coffee2 = new Coffee();
const tea2 = new Tea();
console.log(coffee2.boilWater()); // "Boiling water" (same implementation)
console.log(tea2.boilWater());    // "Boiling water" (same implementation)
console.log(coffee2.pourInCup()); // "Pouring into cup" (same implementation)
console.log(tea2.pourInCup());    // "Pouring into cup" (same implementation)

// Test that abstract methods have different implementations
console.log(coffee.brew());       // "Brewing coffee grounds"
console.log(tea.brew());          // "Steeping tea leaves" (different)
console.log(coffee.addCondiments()); // "Adding sugar and milk"
console.log(tea.addCondiments());    // "Adding lemon" (different)

// Test multiple beverages
const beverages = [coffee, tea, coffee2, tea2];
beverages.forEach((bev, index) => {
  console.log(`Beverage ${index + 1}:`);
  console.log(bev.prepare());
  console.log('---');
});
```

**Learning goals:** Template method pattern, abstract methods enforcing structure, algorithm skeleton in base class

---

## Exercise 3: Abstract Class with State (Medium)

**File:** `03-abstract-with-state-medium.ts`

Create an abstract `Employee` class with shared state and behavior:

**Requirements:**

**Abstract Employee class:**
- Static property: `nextId` (tracks next employee ID)
- Readonly property: `id` (assigned from nextId)
- Protected property: `baseSalary` (number)
- Public property: `name` (string)
- Constructor accepts name and baseSalary
- Abstract method `calculatePay()`: returns number
- Abstract method `getEmployeeType()`: returns string
- Concrete method `getDetails()`: returns formatted employee details
- Concrete method `promote(increase: number)`: increases baseSalary

**FullTimeEmployee (extends Employee):**
- Private property: `benefits` (number)
- Constructor accepts name, baseSalary, benefits
- Implement `calculatePay()`: baseSalary + benefits
- Implement `getEmployeeType()`: returns "Full-Time"

**ContractEmployee (extends Employee):**
- Private property: `hourlyRate` (number)
- Private property: `hoursWorked` (number)
- Constructor accepts name, hourlyRate, hoursWorked
- Implement `calculatePay()`: hourlyRate * hoursWorked
- Implement `getEmployeeType()`: returns "Contract"
- Method `logHours(hours: number)`: adds to hoursWorked

**Validation Requirements:**
- Abstract Employee class:
  - Cannot be instantiated directly
  - Constructor: name non-empty, baseSalary >= 0
  - `nextId` is static, increments for each new employee
  - `id` is readonly, assigned from `nextId`
  - `baseSalary` is protected (accessible in subclasses)
  - `calculatePay()` and `getEmployeeType()` must be abstract
  - `getDetails()` and `promote()` must be concrete
- FullTimeEmployee:
  - Constructor: must call `super(name, baseSalary)`, benefits >= 0
  - `calculatePay()`: return baseSalary + benefits
  - `getEmployeeType()`: return "Full-Time"
- ContractEmployee:
  - Constructor: must call `super(name, 0)` (baseSalary not used for contract), hourlyRate > 0, hoursWorked >= 0
  - `calculatePay()`: return hourlyRate * hoursWorked
  - `getEmployeeType()`: return "Contract"
  - `logHours(hours)`: hours must be positive, adds to hoursWorked
- Static `nextId` increments for every employee regardless of type

**Example usage:**
```typescript
// Test that abstract class cannot be instantiated
// const employee = new Employee("Test", 50000); // ❌ Error - cannot instantiate abstract class

// Test FullTimeEmployee
const fullTime = new FullTimeEmployee("Alice", 60000, 10000);

console.log(fullTime.name);     // "Alice"
console.log(fullTime.id);       // 1 (readonly, from nextId)
console.log(fullTime.getDetails());
// "Full-Time Employee #1: Alice"

console.log(fullTime.getEmployeeType()); // "Full-Time"
console.log(fullTime.calculatePay());    // 70000 (60000 + 10000)

// Test ContractEmployee
const contract = new ContractEmployee("Bob", 50, 160);

console.log(contract.name);     // "Bob"
console.log(contract.id);       // 2 (incremented from static nextId)
console.log(contract.getDetails());
// "Contract Employee #2: Bob"

console.log(contract.getEmployeeType()); // "Contract"
console.log(contract.calculatePay());    // 8000 (50 * 160)

// Test promote method (inherited concrete method)
fullTime.promote(5000);
console.log(fullTime.calculatePay()); // 75000 (65000 + 10000)

fullTime.promote(10000);
console.log(fullTime.calculatePay()); // 85000 (75000 + 10000)

// Test logHours method (Contract-specific)
contract.logHours(20);
console.log(contract.calculatePay()); // 9000 (50 * 180)

contract.logHours(40);
console.log(contract.calculatePay()); // 11000 (50 * 220)

// Test static nextId increments for all employees
const fullTime2 = new FullTimeEmployee("Charlie", 70000, 15000);
const contract2 = new ContractEmployee("Diana", 60, 120);

console.log(fullTime.id);    // 1
console.log(contract.id);    // 2
console.log(fullTime2.id);   // 3
console.log(contract2.id);   // 4

// Test that different employee types calculate pay differently
console.log(fullTime.calculatePay());   // 85000
console.log(contract.calculatePay());   // 11000
console.log(fullTime2.calculatePay());  // 85000 (70000 + 15000)
console.log(contract2.calculatePay());  // 7200 (60 * 120)

// Test getDetails for all employees
console.log(fullTime2.getDetails());  // "Full-Time Employee #3: Charlie"
console.log(contract2.getDetails());  // "Contract Employee #4: Diana"

// Test that id is readonly
// fullTime.id = 999; // ❌ Error - readonly property

// Test multiple employees independently
const employees = [fullTime, contract, fullTime2, contract2];
employees.forEach(emp => {
  console.log(`${emp.getDetails()}: Pay = $${emp.calculatePay()}`);
});
```

**Learning goals:** Abstract classes with state, static properties in abstract classes, protected members

---

## Exercise 4: Multiple Abstract Methods (Medium)

**File:** `04-multiple-abstract-methods-medium.ts`

Create an abstract `Vehicle` class with multiple abstract methods:

**Requirements:**

**Abstract Vehicle class:**
- Protected property: `fuel` (number, current fuel level)
- Public readonly properties: `brand` (string), `model` (string)
- Constructor accepts brand, model, initial fuel
- Abstract method `startEngine()`: returns string
- Abstract method `getFuelEfficiency()`: returns number (miles per gallon)
- Abstract method `getVehicleType()`: returns string
- Concrete method `drive(distance: number)`: calculates fuel consumption, updates fuel
- Concrete method `refuel(amount: number)`: adds to fuel (max 100)
- Concrete method `getFuelLevel()`: returns current fuel

**Car (extends Vehicle):**
- Additional property: `numDoors` (number)
- Implement `startEngine()`: "Car engine started with a quiet hum"
- Implement `getFuelEfficiency()`: 30 mpg
- Implement `getVehicleType()`: "Car"

**Truck (extends Vehicle):**
- Additional property: `cargoCapacity` (number)
- Implement `startEngine()`: "Truck engine roared to life"
- Implement `getFuelEfficiency()`: 15 mpg
- Implement `getVehicleType()`: "Truck"

**Motorcycle (extends Vehicle):**
- Additional property: `hasSidecar` (boolean)
- Implement `startEngine()`: "Motorcycle engine revved loudly"
- Implement `getFuelEfficiency()`: 50 mpg
- Implement `getVehicleType()`: "Motorcycle"

**Validation Requirements:**
- Abstract Vehicle class:
  - Cannot be instantiated directly
  - Constructor: brand and model non-empty, initialFuel between 0-100
  - `fuel` is protected (accessible in subclasses)
  - `brand` and `model` are readonly
  - `startEngine()`, `getFuelEfficiency()`, `getVehicleType()` must be abstract
  - `drive()`, `refuel()`, `getFuelLevel()` must be concrete
- `drive(distance)`:
  - distance must be positive (> 0)
  - Calculate fuel consumed: distance / getFuelEfficiency()
  - Only allow drive if sufficient fuel
  - Update fuel after driving
- `refuel(amount)`:
  - amount must be positive (> 0)
  - Cannot exceed 100 total fuel
  - Add amount to current fuel (capped at 100)
- All vehicle subclasses (Car, Truck, Motorcycle):
  - Must implement all three abstract methods
  - Must call super in constructor
  - Each has different fuel efficiency

**Example usage:**
```typescript
// Test that abstract class cannot be instantiated
// const vehicle = new Vehicle("Generic", "Model", 50); // ❌ Error

// Test Car
const car = new Car("Toyota", "Camry", 50, 4);

console.log(car.brand);            // "Toyota" (readonly)
console.log(car.model);            // "Camry" (readonly)
console.log(car.numDoors);         // 4
console.log(car.getFuelLevel());   // 50
console.log(car.getVehicleType()); // "Car"
console.log(car.startEngine());    // "Car engine started with a quiet hum"
console.log(car.getFuelEfficiency()); // 30

// Test drive (inherited concrete method)
car.drive(60); // Consumes 2 gallons (60 miles / 30 mpg)
console.log(car.getFuelLevel()); // 48

car.drive(90); // Consumes 3 gallons (90 miles / 30 mpg)
console.log(car.getFuelLevel()); // 45

// Test refuel (inherited concrete method)
car.refuel(20);
console.log(car.getFuelLevel()); // 65

car.refuel(50); // Should cap at 100
console.log(car.getFuelLevel()); // 100 (capped)

// Test Truck
const truck = new Truck("Ford", "F-150", 80, 1000);

console.log(truck.brand);            // "Ford"
console.log(truck.model);            // "F-150"
console.log(truck.cargoCapacity);    // 1000
console.log(truck.getFuelLevel());   // 80
console.log(truck.getVehicleType()); // "Truck"
console.log(truck.startEngine());    // "Truck engine roared to life"
console.log(truck.getFuelEfficiency()); // 15

truck.drive(30); // Consumes 2 gallons (30 miles / 15 mpg)
console.log(truck.getFuelLevel()); // 78

truck.drive(45); // Consumes 3 gallons (45 miles / 15 mpg)
console.log(truck.getFuelLevel()); // 75

// Test Motorcycle
const motorcycle = new Motorcycle("Harley", "Sportster", 20, false);

console.log(motorcycle.brand);            // "Harley"
console.log(motorcycle.model);            // "Sportster"
console.log(motorcycle.hasSidecar);       // false
console.log(motorcycle.getFuelLevel());   // 20
console.log(motorcycle.getVehicleType()); // "Motorcycle"
console.log(motorcycle.startEngine());    // "Motorcycle engine revved loudly"
console.log(motorcycle.getFuelEfficiency()); // 50

motorcycle.drive(100); // Consumes 2 gallons (100 miles / 50 mpg)
console.log(motorcycle.getFuelLevel()); // 18

motorcycle.drive(250); // Consumes 5 gallons (250 miles / 50 mpg)
console.log(motorcycle.getFuelLevel()); // 13

// Test edge case: drive with insufficient fuel
motorcycle.drive(700); // Would need 14 gallons but only has 13
console.log(motorcycle.getFuelLevel()); // 13 (unchanged, drive failed)

// Test edge case: refuel beyond max
motorcycle.refuel(90);
console.log(motorcycle.getFuelLevel()); // 100 (capped at max)

// Test that readonly properties cannot be changed
// car.brand = "Honda"; // ❌ Error - readonly property
// car.model = "Accord"; // ❌ Error - readonly property

// Test multiple vehicles with different efficiencies
const vehicles = [car, truck, motorcycle];
vehicles.forEach(v => {
  console.log(`${v.brand} ${v.model}: ${v.getVehicleType()}, ${v.getFuelEfficiency()} mpg, Fuel: ${v.getFuelLevel()}`);
  console.log(v.startEngine());
});
```

**Learning goals:** Multiple abstract methods, different implementations, shared concrete methods

---

## Exercise 5: Payment Processing System (Hard)

**File:** `05-payment-system-hard.ts`

Create an abstract payment processing system with validation:

**Requirements:**

**Abstract Payment class:**
- Static property: `transactionCount` (tracks all transactions)
- Readonly property: `transactionId` (string)
- Protected property: `amount` (number)
- Protected property: `status` (string: "pending", "completed", "failed")
- Public property: `timestamp` (Date)
- Constructor accepts amount
- Abstract method `processPayment()`: returns boolean (success/failure)
- Abstract method `getPaymentMethod()`: returns string
- Abstract method `validatePayment()`: returns boolean
- Concrete method `execute()`: validates, processes, updates status
- Concrete method `getReceipt()`: returns formatted receipt
- Static method `getTransactionCount()`: returns total transactions

**CreditCardPayment (extends Payment):**
- Private properties: `cardNumber` (string), `cvv` (string), `expiryDate` (string)
- Constructor accepts amount, cardNumber, cvv, expiryDate
- Implement `validatePayment()`: checks card number length (16 digits), cvv (3 digits)
- Implement `processPayment()`: simulates processing, returns true if amount < 10000
- Implement `getPaymentMethod()`: "Credit Card"

**PayPalPayment (extends Payment):**
- Private properties: `email` (string), `password` (string)
- Constructor accepts amount, email, password
- Implement `validatePayment()`: checks email contains "@"
- Implement `processPayment()`: simulates processing, returns true if amount < 5000
- Implement `getPaymentMethod()`: "PayPal"

**BankTransferPayment (extends Payment):**
- Private properties: `accountNumber` (string), `routingNumber` (string)
- Constructor accepts amount, accountNumber, routingNumber
- Implement `validatePayment()`: checks account and routing numbers not empty
- Implement `processPayment()`: simulates processing, returns true (always successful)
- Implement `getPaymentMethod()`: "Bank Transfer"

**PaymentProcessor class:**
- Method `processPayments(payments: Payment[])`: executes all payments
- Method `getSuccessfulPayments(payments: Payment[])`: returns completed payments
- Method `getTotalProcessed(payments: Payment[])`: returns total amount of successful payments

**Validation Requirements:**
- Abstract Payment class:
  - Cannot be instantiated directly
  - Constructor: amount must be positive (> 0)
  - `transactionCount` is static, increments for each payment created
  - `transactionId` is readonly, assigned from transactionCount
  - `amount` and `status` are protected
  - `processPayment()`, `getPaymentMethod()`, `validatePayment()` must be abstract
  - `execute()` and `getReceipt()` must be concrete
- `execute()` method:
  - First call `validatePayment()`
  - If valid, call `processPayment()`
  - Update `status` based on result: "completed" or "failed"
  - Set initial status to "pending"
- CreditCardPayment:
  - `validatePayment()`: cardNumber must be exactly 16 digits, cvv exactly 3 digits
  - `processPayment()`: return true if amount < 10000, false otherwise
  - `getPaymentMethod()`: return "Credit Card"
- PayPalPayment:
  - `validatePayment()`: email must contain "@"
  - `processPayment()`: return true if amount < 5000, false otherwise
  - `getPaymentMethod()`: return "PayPal"
- BankTransferPayment:
  - `validatePayment()`: accountNumber and routingNumber must be non-empty
  - `processPayment()`: always return true
  - `getPaymentMethod()`: return "Bank Transfer"
- PaymentProcessor:
  - `processPayments()`: call execute() on each payment
  - `getSuccessfulPayments()`: filter by status === "completed"
  - `getTotalProcessed()`: sum amounts of successful payments only

**Example usage:**
```typescript
// Test that abstract class cannot be instantiated
// const payment = new Payment(100); // ❌ Error - cannot instantiate abstract class

// Test CreditCardPayment
const cc = new CreditCardPayment(299.99, "1234567890123456", "123", "12/25");

console.log(cc.transactionId);      // "1" (readonly, from transactionCount)
console.log(cc.timestamp);          // Date object
console.log(cc.getPaymentMethod()); // "Credit Card"

cc.execute();
console.log(cc.getReceipt());
// "Transaction #1: Credit Card - $299.99 - Status: completed"

// Test PayPalPayment
const paypal = new PayPalPayment(150.00, "user@example.com", "secret");

console.log(paypal.transactionId);      // "2"
console.log(paypal.getPaymentMethod()); // "PayPal"

paypal.execute();
console.log(paypal.getReceipt());
// "Transaction #2: PayPal - $150.00 - Status: completed"

// Test BankTransferPayment
const bank = new BankTransferPayment(5000.00, "123456789", "987654321");

console.log(bank.transactionId);      // "3"
console.log(bank.getPaymentMethod()); // "Bank Transfer"

bank.execute();
console.log(bank.getReceipt());
// "Transaction #3: Bank Transfer - $5000.00 - Status: completed"

// Test static transactionCount
console.log(Payment.getTransactionCount()); // 3

// Test edge case: CreditCard payment that fails (amount >= 10000)
const ccFail = new CreditCardPayment(10000, "1234567890123456", "123", "12/25");
ccFail.execute();
console.log(ccFail.getReceipt());
// "Transaction #4: Credit Card - $10000.00 - Status: failed"

// Test edge case: PayPal payment that fails (amount >= 5000)
const paypalFail = new PayPalPayment(5000, "user@example.com", "secret");
paypalFail.execute();
console.log(paypalFail.getReceipt());
// "Transaction #5: PayPal - $5000.00 - Status: failed"

// Test edge case: invalid credit card validation
const ccInvalid = new CreditCardPayment(100, "12345", "12", "12/25"); // Invalid card
ccInvalid.execute();
console.log(ccInvalid.getReceipt());
// "Transaction #6: Credit Card - $100.00 - Status: failed" (validation failed)

// Test edge case: invalid email validation
const paypalInvalid = new PayPalPayment(100, "notanemail", "secret");
paypalInvalid.execute();
console.log(paypalInvalid.getReceipt());
// "Transaction #7: PayPal - $100.00 - Status: failed" (validation failed)

// Test PaymentProcessor
const processor = new PaymentProcessor();
const payments = [cc, paypal, bank, ccFail, paypalFail, ccInvalid, paypalInvalid];

// Test processPayments (already executed above, but can be called again)
processor.processPayments(payments);

// Test getSuccessfulPayments
const successful = processor.getSuccessfulPayments(payments);
console.log(successful.length); // 3 (cc, paypal, bank)

successful.forEach(p => {
  console.log(p.getReceipt());
});

// Test getTotalProcessed
const total = processor.getTotalProcessed(payments);
console.log(total); // 5449.99 (299.99 + 150.00 + 5000.00)

// Test transactionCount incremented for all payments
console.log(Payment.getTransactionCount()); // 7

// Test that BankTransfer always succeeds
const bank2 = new BankTransferPayment(99999, "999999999", "111111111");
bank2.execute();
console.log(bank2.getReceipt());
// "Transaction #8: Bank Transfer - $99999.00 - Status: completed"

// Test multiple independent payments
const allPayments = [cc, paypal, bank, ccFail, paypalFail, bank2];
allPayments.forEach(p => {
  console.log(`${p.getPaymentMethod()}: ${p.getReceipt()}`);
});
```

**Learning goals:** Complex abstract class design, validation before processing, polymorphism with payment methods, real-world payment system design

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-06/01-basic-abstract-class-easy.ts`
3. Remember: you cannot instantiate abstract classes directly
4. All abstract methods MUST be implemented in concrete subclasses
5. Abstract classes can have concrete methods that all subclasses inherit

## Tips

- Read the lesson content in `docs/06-abstract-classes.md` if you get stuck
- Use `abstract class` keyword to define abstract classes
- Use `abstract` keyword before method signature (no implementation)
- Abstract classes are great for defining templates and enforcing structure
- Template method pattern: concrete method in base class calls abstract methods
- Abstract classes can have constructors, properties, and concrete methods
