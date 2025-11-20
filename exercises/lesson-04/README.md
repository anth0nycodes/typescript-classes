# Lesson 04 Exercises: Getters and Setters

Complete these exercises to practice using getters and setters for computed properties, validation, and controlled access to object state.

---

## Exercise 1: Basic Getters and Setters (Easy)

**File:** `01-basic-getters-setters-easy.ts`

Create a `Person` class with getters and setters for validation:

**Requirements:**
- Private properties: `_firstName` (string), `_lastName` (string), `_age` (number)
- Getter/Setter for `firstName`: validate not empty
- Getter/Setter for `lastName`: validate not empty
- Getter/Setter for `age`: validate between 0 and 150
- Getter only for `fullName`: returns "firstName lastName"
- Method `introduce()`: uses getters to return introduction

**Validation Requirements:**
- Constructor:
  - firstName and lastName must be non-empty strings
  - age must be between 0 and 150 (inclusive)
- Setter `firstName`:
  - Must reject empty strings or strings with only whitespace
  - Throw error or ignore invalid values
- Setter `lastName`:
  - Must reject empty strings or strings with only whitespace
  - Throw error or ignore invalid values
- Setter `age`:
  - Must be between 0 and 150 (inclusive)
  - Reject negative values or values > 150
  - Must be a valid number
- Getter `fullName`:
  - Read-only computed property
  - Returns formatted string "firstName lastName"
  - No setter for fullName (computed value only)

**Example usage:**
```typescript
const person = new Person("John", "Doe", 30);

// Test initial state
console.log(person.firstName); // "John"
console.log(person.lastName);  // "Doe"
console.log(person.age);       // 30
console.log(person.fullName);  // "John Doe"

// Test getters
console.log(person.introduce()); // "Hi, I'm John Doe and I'm 30 years old"

// Test setters - firstName
person.firstName = "Jane";
console.log(person.firstName); // "Jane"
console.log(person.fullName);  // "Jane Doe"

// Test setters - lastName
person.lastName = "Smith";
console.log(person.lastName); // "Smith"
console.log(person.fullName); // "Jane Smith"

// Test setters - age
person.age = 35;
console.log(person.age); // 35
console.log(person.introduce()); // "Hi, I'm Jane Smith and I'm 35 years old"

// Test edge case: valid boundary values for age
person.age = 0;
console.log(person.age); // 0

person.age = 150;
console.log(person.age); // 150

person.age = 25;
console.log(person.age); // 25

// Test edge case: invalid age values (should throw or be rejected)
// person.age = -5;    // Should throw error - negative age
// person.age = 200;   // Should throw error - age > 150
// person.age = -1;    // Should throw error - negative age

// Test edge case: invalid firstName (should throw or be rejected)
// person.firstName = "";    // Should throw error - empty string
// person.firstName = "  ";  // Should throw error - whitespace only

// Test edge case: invalid lastName (should throw or be rejected)
// person.lastName = "";     // Should throw error - empty string
// person.lastName = "   ";  // Should throw error - whitespace only

// Test that fullName is read-only
// person.fullName = "New Name"; // ❌ Error - no setter for fullName

// Test multiple independent persons
const person2 = new Person("Alice", "Johnson", 28);
person.firstName = "Bob";
console.log(person.fullName);  // "Bob Smith"
console.log(person2.fullName); // "Alice Johnson" (independent)
```

**Learning goals:** Basic getter/setter syntax, validation in setters, computed read-only properties

---

## Exercise 2: Computed Properties (Easy)

**File:** `02-computed-properties-easy.ts`

Create a `Rectangle` class with computed area and perimeter:

**Requirements:**
- Private properties: `_width` (number), `_height` (number)
- Getter/Setter for `width`: validate positive number
- Getter/Setter for `height`: validate positive number
- Getter only for `area`: computed as width * height
- Getter only for `perimeter`: computed as 2 * (width + height)
- Getter only for `isSquare`: returns true if width === height
- Setter for `square`: when set to true, makes it a square (height = width)

**Validation Requirements:**
- Constructor:
  - width must be positive (> 0)
  - height must be positive (> 0)
- Setter `width`:
  - Must be positive (> 0)
  - Reject zero or negative values
- Setter `height`:
  - Must be positive (> 0)
  - Reject zero or negative values
- Getter `area`:
  - Read-only computed property
  - Returns width * height
- Getter `perimeter`:
  - Read-only computed property
  - Returns 2 * (width + height)
- Getter `isSquare`:
  - Read-only computed property
  - Returns true if width === height, false otherwise
- Setter `square`:
  - When set to true, sets height = width (makes it a square)
  - When set to false, can be ignored or do nothing

**Example usage:**
```typescript
const rect = new Rectangle(5, 10);

// Test initial state
console.log(rect.width);     // 5
console.log(rect.height);    // 10
console.log(rect.area);      // 50
console.log(rect.perimeter); // 30
console.log(rect.isSquare);  // false

// Test setters - width
rect.width = 8;
console.log(rect.width);     // 8
console.log(rect.area);      // 80
console.log(rect.perimeter); // 36

// Test setters - height
rect.height = 6;
console.log(rect.height);    // 6
console.log(rect.area);      // 48
console.log(rect.perimeter); // 28

// Test computed properties update automatically
rect.width = 10;
rect.height = 10;
console.log(rect.area);      // 100
console.log(rect.perimeter); // 40
console.log(rect.isSquare);  // true (width === height)

// Test square setter
rect.square = true;
console.log(rect.width);     // 10
console.log(rect.height);    // 10
console.log(rect.isSquare);  // true

rect.width = 12;
rect.square = true;
console.log(rect.width);     // 12
console.log(rect.height);    // 12 (set to match width)
console.log(rect.isSquare);  // true

// Test edge case: changing width after making it square
rect.width = 15;
console.log(rect.width);     // 15
console.log(rect.height);    // 12 (unchanged, no longer square)
console.log(rect.isSquare);  // false

// Test edge case: invalid width (should throw or be rejected)
// rect.width = 0;     // Should throw error - must be positive
// rect.width = -5;    // Should throw error - must be positive

// Test edge case: invalid height (should throw or be rejected)
// rect.height = 0;    // Should throw error - must be positive
// rect.height = -10;  // Should throw error - must be positive

// Test that computed properties are read-only
// rect.area = 100;      // ❌ Error - no setter for area
// rect.perimeter = 50;  // ❌ Error - no setter for perimeter
// rect.isSquare = true; // ❌ Error - use square setter instead

// Test multiple independent rectangles
const rect2 = new Rectangle(3, 4);
rect.width = 20;
console.log(rect.area);  // 300 (20 * 15)
console.log(rect2.area); // 12 (3 * 4, independent)
```

**Learning goals:** Computed properties, read-only getters, setters that affect multiple properties

---

## Exercise 3: Data Transformation (Medium)

**File:** `03-data-transformation-medium.ts`

Create a `Temperature` class that handles conversion transparently:

**Requirements:**
- Private property: `_celsius` (number, stores in Celsius)
- Getter/Setter for `celsius`: direct access
- Getter/Setter for `fahrenheit`: converts to/from Celsius
- Getter/Setter for `kelvin`: converts to/from Celsius
- Getter only for `isFreezing`: returns true if <= 0°C
- Getter only for `isBoiling`: returns true if >= 100°C
- Method `compare(other: Temperature)`: returns which is hotter

**Validation Requirements:**
- Constructor:
  - Optional initial temperature in Celsius (default to 0)
  - Accept any valid number (including negative for Celsius)
- Setter `celsius`:
  - Accept any valid number
  - Must be >= -273.15 (absolute zero in Celsius)
- Setter `fahrenheit`:
  - Convert to Celsius: (F - 32) * 5/9
  - Store result in `_celsius`
  - Validate against absolute zero
- Setter `kelvin`:
  - Convert to Celsius: K - 273.15
  - Store result in `_celsius`
  - Must be >= 0 (Kelvin cannot be negative)
- Getter conversions:
  - Fahrenheit: C * 9/5 + 32
  - Kelvin: C + 273.15
- `compare(other)`:
  - Must accept another Temperature object
  - Return descriptive string

**Example usage:**
```typescript
const temp = new Temperature();

// Test initial state
console.log(temp.celsius); // 0

// Test celsius getter/setter
temp.celsius = 25;
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77
console.log(temp.kelvin);     // 298.15

// Test fahrenheit setter
temp.fahrenheit = 32;
console.log(temp.celsius);    // 0
console.log(temp.fahrenheit); // 32
console.log(temp.kelvin);     // 273.15

temp.fahrenheit = 212;
console.log(temp.celsius);    // 100
console.log(temp.fahrenheit); // 212
console.log(temp.kelvin);     // 373.15

// Test kelvin setter
temp.kelvin = 273.15;
console.log(temp.celsius);    // 0
console.log(temp.fahrenheit); // 32
console.log(temp.kelvin);     // 273.15

temp.kelvin = 373.15;
console.log(temp.celsius);    // 100

// Test computed properties - isFreezing
temp.celsius = 0;
console.log(temp.isFreezing); // true

temp.celsius = -5;
console.log(temp.isFreezing); // true

temp.celsius = 5;
console.log(temp.isFreezing); // false

// Test computed properties - isBoiling
temp.celsius = 100;
console.log(temp.isBoiling);  // true

temp.celsius = 105;
console.log(temp.isBoiling);  // true

temp.celsius = 95;
console.log(temp.isBoiling);  // false

// Test compare method
const temp2 = new Temperature();
temp.celsius = 30;
temp2.celsius = 20;
console.log(temp.compare(temp2)); // "This temperature is hotter"

temp2.celsius = 40;
console.log(temp.compare(temp2)); // "This temperature is colder"

temp2.celsius = 30;
console.log(temp.compare(temp2)); // "Temperatures are equal"

// Test edge case: absolute zero in Celsius
temp.celsius = -273.15;
console.log(temp.celsius);    // -273.15
console.log(temp.fahrenheit); // -459.67
console.log(temp.kelvin);     // 0

// Test edge case: setting temperature via different units
temp.fahrenheit = 98.6; // Body temperature
console.log(temp.celsius); // 37

temp.kelvin = 300;
console.log(temp.celsius); // 26.85

// Test that computed properties are read-only
// temp.isFreezing = false; // ❌ Error - no setter
// temp.isBoiling = true;   // ❌ Error - no setter

// Test multiple independent temperatures
const temp3 = new Temperature();
temp.celsius = 50;
temp3.celsius = 10;
console.log(temp.celsius);  // 50
console.log(temp3.celsius); // 10 (independent)
```

**Learning goals:** Data transformation in getters/setters, multiple representations of the same data

---

## Exercise 4: Validation and Side Effects (Medium)

**File:** `04-validation-side-effects-medium.ts`

Create a `UserAccount` class with password hashing and email validation:

**Requirements:**
- Private properties: `_username` (string), `_email` (string), `_passwordHash` (string), `_lastModified` (Date)
- Getter/Setter for `username`: validate min 3 chars, max 20 chars, alphanumeric only
- Getter/Setter for `email`: validate contains "@" and "."
- Setter only for `password`: hashes password (use simple hash for exercise), updates lastModified
- Method `verifyPassword(password: string)`: checks if password matches hash
- Getter only for `accountInfo`: returns formatted account information
- Getter only for `passwordAge`: returns days since password was last changed

**Validation Requirements:**
- Constructor:
  - username: 3-20 characters, alphanumeric only
  - email: must contain "@" and "."
  - No password in constructor (set via setter)
- Setter `username`:
  - Length: 3-20 characters
  - Must be alphanumeric (letters and numbers only, no special characters)
  - Reject if validation fails
- Setter `email`:
  - Must contain "@" symbol
  - Must contain "." after "@"
  - Basic email format validation
- Setter `password` (write-only):
  - Hash the password (simple hash like reversing or adding salt for exercise)
  - Store in `_passwordHash`
  - Update `_lastModified` to current date
  - No getter for password (write-only for security)
- `verifyPassword(password)`:
  - Hash the provided password
  - Compare with stored `_passwordHash`
  - Return boolean
- All side effects:
  - Updating password must update `_lastModified`

**Example usage:**
```typescript
const user = new UserAccount("john_doe", "john@example.com");

// Test initial state
console.log(user.username); // "john_doe"
console.log(user.email);    // "john@example.com"

// Test password setter (write-only)
user.password = "mysecretpass";
// console.log(user.password); // ❌ Error - no getter for password

// Test verifyPassword
console.log(user.verifyPassword("mysecretpass")); // true
console.log(user.verifyPassword("wrongpass"));    // false
console.log(user.verifyPassword(""));             // false

// Test username setter
user.username = "jane_doe";
console.log(user.username); // "jane_doe"

user.username = "alice123";
console.log(user.username); // "alice123"

// Test edge case: invalid username (should throw or be rejected)
// user.username = "ab";        // Too short (< 3 chars)
// user.username = "a".repeat(21); // Too long (> 20 chars)
// user.username = "user@123";  // Contains special character
// user.username = "user name"; // Contains space

// Test email setter
user.email = "newemail@example.com";
console.log(user.email); // "newemail@example.com"

user.email = "alice@test.org";
console.log(user.email); // "alice@test.org"

// Test edge case: invalid email (should throw or be rejected)
// user.email = "invalid";        // No @ or .
// user.email = "invalid@";       // No . after @
// user.email = "invalid.com";    // No @
// user.email = "@example.com";   // No username part

// Test accountInfo getter
console.log(user.accountInfo);
// "Username: alice123, Email: alice@test.org"

// Test passwordAge
console.log(user.passwordAge); // 0 (just set)

// Simulate waiting (in real scenario, time would pass)
// After some time passes, passwordAge should increase

// Test password change updates lastModified
user.password = "newsecretpass";
console.log(user.verifyPassword("newsecretpass")); // true
console.log(user.verifyPassword("mysecretpass"));  // false (old password)
console.log(user.passwordAge); // 0 (just reset)

// Test that password is write-only
// const pwd = user.password; // ❌ Error - no getter

// Test multiple independent accounts
const user2 = new UserAccount("bob_user", "bob@example.com");
user2.password = "bobpass";
console.log(user.verifyPassword("newsecretpass")); // true
console.log(user2.verifyPassword("bobpass"));      // true
console.log(user2.verifyPassword("newsecretpass")); // false (different accounts)
```

**Learning goals:** Complex validation, side effects in setters (updating lastModified), write-only setters

---

## Exercise 5: Shopping Cart with Smart Getters (Hard)

**File:** `05-shopping-cart-smart-getters-hard.ts`

Create a comprehensive shopping cart with intelligent getters and setters:

**Requirements:**

**CartItem class:**
- Private properties: `_name` (string), `_price` (number), `_quantity` (number)
- Getter/Setter for `name`, `price` (validate > 0), `quantity` (validate >= 0)
- Getter only for `subtotal`: price * quantity

**ShoppingCart class:**
- Private property: `_items` (array of CartItem)
- Private property: `_discountCode` (string | null)
- Private property: `_taxRate` (number, default 0.08 for 8%)
- Method `addItem(name: string, price: number, quantity: number)`: adds or updates item
- Method `removeItem(name: string)`: removes item
- Method `updateQuantity(name: string, quantity: number)`: updates item quantity
- Getter only for `items`: returns copy of items array
- Getter only for `subtotal`: sum of all item subtotals
- Getter/Setter for `discountCode`: validates discount codes
- Getter only for `discount`: calculates discount based on code ("SAVE10" = 10%, "SAVE20" = 20%)
- Getter only for `subtotalAfterDiscount`: subtotal minus discount
- Getter only for `tax`: calculated on subtotal after discount
- Getter only for `total`: final total with tax
- Getter only for `isEmpty`: returns true if no items
- Getter only for `itemCount`: total number of items
- Method `clear()`: empties cart

**Validation Requirements:**
- CartItem class:
  - Setter `name`: non-empty string
  - Setter `price`: must be positive (> 0)
  - Setter `quantity`: must be >= 0 (0 to remove)
  - Getter `subtotal`: computed, read-only
- ShoppingCart class:
  - `addItem`: validate name (non-empty), price (> 0), quantity (> 0)
  - `removeItem`: only remove if exists
  - `updateQuantity`: validate quantity >= 0
  - Setter `discountCode`: validate against known codes ("SAVE10", "SAVE20", or null)
  - All computed getters must be read-only
  - `items` getter must return a copy (deep copy including CartItem objects)

**Example usage:**
```typescript
const cart = new ShoppingCart();

// Test initial state
console.log(cart.isEmpty);      // true
console.log(cart.itemCount);    // 0
console.log(cart.subtotal);     // 0
console.log(cart.total);        // 0

// Test addItem
cart.addItem("Laptop", 1000, 1);
console.log(cart.itemCount);    // 1
console.log(cart.subtotal);     // 1000

cart.addItem("Mouse", 25, 2);
console.log(cart.itemCount);    // 2
console.log(cart.subtotal);     // 1050

cart.addItem("Keyboard", 75, 1);
console.log(cart.itemCount);    // 3
console.log(cart.subtotal);     // 1125

// Test tax calculation (no discount)
console.log(cart.tax);          // 90 (8% of 1125)
console.log(cart.total);        // 1215

// Test discountCode setter
cart.discountCode = "SAVE10";
console.log(cart.discount);     // 112.5 (10% of 1125)
console.log(cart.subtotalAfterDiscount); // 1012.5
console.log(cart.tax);          // 81 (8% of 1012.5)
console.log(cart.total);        // 1093.5

cart.discountCode = "SAVE20";
console.log(cart.discount);     // 225 (20% of 1125)
console.log(cart.subtotalAfterDiscount); // 900
console.log(cart.tax);          // 72 (8% of 900)
console.log(cart.total);        // 972

// Test removing discount
cart.discountCode = null;
console.log(cart.discount);     // 0
console.log(cart.total);        // 1215

// Test edge case: invalid discount code
// cart.discountCode = "INVALID"; // Should throw or be rejected

// Test updateQuantity
cart.updateQuantity("Mouse", 1);
console.log(cart.subtotal);     // 1100
console.log(cart.total);        // 1188

cart.updateQuantity("Laptop", 2);
console.log(cart.subtotal);     // 2100

// Test removeItem
cart.removeItem("Keyboard");
console.log(cart.itemCount);    // 2
console.log(cart.subtotal);     // 2025

// Test edge case: remove non-existent item
cart.removeItem("NonExistent"); // Should fail gracefully

// Test items getter returns a copy
const items = cart.items;
console.log(items.length);      // 2

// Modify the returned copy
items[0].price = 99999;
console.log(cart.subtotal);     // 2025 (unchanged - items is a copy)

items.push(new CartItem("Hacked", 0, 100));
console.log(cart.itemCount);    // 2 (unchanged)

// Test CartItem getters/setters
const item = items[0];
console.log(item.name);         // "Laptop"
console.log(item.price);        // 99999 (modified copy)
console.log(item.quantity);     // 2
console.log(item.subtotal);     // 199998 (computed)

// Test clear
console.log(cart.isEmpty);      // false
cart.clear();
console.log(cart.isEmpty);      // true
console.log(cart.itemCount);    // 0
console.log(cart.subtotal);     // 0
console.log(cart.total);        // 0

// Test multiple independent carts
const cart2 = new ShoppingCart();
cart.addItem("Item1", 100, 1);
cart2.addItem("Item2", 200, 1);
cart2.discountCode = "SAVE10";
console.log(cart.total);        // 108 (100 * 1.08)
console.log(cart2.total);       // 194.4 (200 * 0.9 * 1.08, independent)
```

**Learning goals:** Complex computed properties, chained calculations, smart getters that depend on other getters, real-world application

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-04/01-basic-getters-setters-easy.ts`
3. Remember: getters have no parameters, setters have exactly one parameter
4. Always validate in setters before modifying internal state
5. Use getters for computed properties that don't need to be stored

## Tips

- Read the lesson content in `docs/04-getters-setters.md` if you get stuck
- Getters are called without parentheses: `obj.property` not `obj.property()`
- Setters are assigned to like regular properties: `obj.property = value`
- Use private `_property` and public `property` getter/setter pattern
- Computed properties (getters without setters) are useful for derived data
- Setters can have side effects (like updating lastModified timestamp)
