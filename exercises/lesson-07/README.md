# Lesson 07 Exercises: Interfaces and Polymorphism

Complete these exercises to practice defining interfaces, implementing them in classes, and using polymorphism.

---

## Exercise 1: Basic Interface (Easy)

**File:** `01-basic-interface-easy.ts`

Create an interface and implement it in classes:

**Requirements:**

**Printable interface:**
- Method: `print()`: void

**Document class (implements Printable):**
- Properties: `title` (string), `content` (string)
- Constructor accepts title and content
- Implement `print()`: logs document title and content

**Image class (implements Printable):**
- Properties: `filename` (string), `width` (number), `height` (number)
- Constructor accepts filename, width, height
- Implement `print()`: logs image details

**Function:** `printAll(items: Printable[])`: calls print() on each item

**Validation Requirements:**
- Printable interface:
  - Defines contract: any class implementing must have `print()` method
  - `print()` returns void (no return value)
- Document class:
  - Constructor: title and content must be non-empty strings
  - `print()`: must log formatted output with both title and content
  - Must implement Printable interface
- Image class:
  - Constructor: filename non-empty, width and height must be positive (> 0)
  - `print()`: must log formatted output with filename and dimensions
  - Must implement Printable interface
- `printAll()` function:
  - Must accept array of Printable objects (polymorphism)
  - Must call `print()` on each item
  - Works with any class implementing Printable

**Example usage:**
```typescript
// Test Document class
const doc = new Document("Report", "This is the report content");

console.log(doc.title);   // "Report"
console.log(doc.content); // "This is the report content"
doc.print();
// Output:
// "Document: Report"
// "This is the report content"

// Test Image class
const img = new Image("photo.jpg", 1920, 1080);

console.log(img.filename); // "photo.jpg"
console.log(img.width);    // 1920
console.log(img.height);   // 1080
img.print();
// Output: "Image: photo.jpg (1920x1080)"

// Test with different values
const doc2 = new Document("Invoice", "Total amount: $500");
const img2 = new Image("screenshot.png", 800, 600);

doc2.print();
// "Document: Invoice"
// "Total amount: $500"

img2.print();
// "Image: screenshot.png (800x600)"

// Test printAll function (polymorphism)
function printAll(items: Printable[]): void {
  items.forEach(item => item.print());
}

printAll([doc, img]); // Prints both
// Output:
// "Document: Report"
// "This is the report content"
// "Image: photo.jpg (1920x1080)"

printAll([doc2, img2, doc, img]); // Prints all four
// Demonstrates polymorphism - different types treated uniformly

// Test that both classes implement the same interface
const printables: Printable[] = [doc, img, doc2, img2];
printables.forEach(p => {
  p.print(); // All have print() method
});

// Test multiple documents and images
const documents = [
  new Document("Report 1", "Content 1"),
  new Document("Report 2", "Content 2"),
  new Document("Report 3", "Content 3")
];

const images = [
  new Image("img1.jpg", 1920, 1080),
  new Image("img2.png", 800, 600),
  new Image("img3.gif", 400, 300)
];

printAll([...documents, ...images]); // Mix of both types
```

**Learning goals:** Basic interface syntax, implementing interfaces, polymorphism

---

## Exercise 2: Multiple Interfaces (Easy)

**File:** `02-multiple-interfaces-easy.ts`

Create classes that implement multiple interfaces:

**Requirements:**

**Flyable interface:**
- Method: `fly()`: void
- Method: `land()`: void

**Swimmable interface:**
- Method: `swim()`: void

**Duck class (implements Flyable, Swimmable):**
- Property: `name` (string)
- Constructor accepts name
- Implement all methods from both interfaces

**Airplane class (implements Flyable):**
- Property: `model` (string)
- Constructor accepts model
- Implement methods from Flyable

**Fish class (implements Swimmable):**
- Property: `species` (string)
- Constructor accepts species
- Implement methods from Swimmable

**Validation Requirements:**
- Flyable interface:
  - Defines two methods: `fly()` and `land()`
  - Both return void
- Swimmable interface:
  - Defines one method: `swim()`
  - Returns void
- Duck class:
  - Must implement both Flyable and Swimmable
  - Constructor: name must be non-empty string
  - Must implement all three methods: `fly()`, `land()`, `swim()`
- Airplane class:
  - Must implement only Flyable
  - Constructor: model must be non-empty string
  - Must implement both `fly()` and `land()`
- Fish class:
  - Must implement only Swimmable
  - Constructor: species must be non-empty string
  - Must implement `swim()`
- Multiple interface implementation demonstrates interface segregation principle

**Example usage:**
```typescript
// Test Duck (implements both interfaces)
const duck = new Duck("Donald");

console.log(duck.name); // "Donald"
duck.fly();   // "Donald is flying"
duck.swim();  // "Donald is swimming"
duck.land();  // "Donald is landing"

// Test another duck
const duck2 = new Duck("Daisy");
duck2.fly();  // "Daisy is flying"
duck2.swim(); // "Daisy is swimming"
duck2.land(); // "Daisy is landing"

// Test Airplane (implements only Flyable)
const plane = new Airplane("Boeing 747");

console.log(plane.model); // "Boeing 747"
plane.fly();   // "Boeing 747 is flying"
plane.land();  // "Boeing 747 is landing"
// plane.swim(); // ❌ Error - Airplane doesn't implement Swimmable

const plane2 = new Airplane("Airbus A380");
plane2.fly();  // "Airbus A380 is flying"
plane2.land(); // "Airbus A380 is landing"

// Test Fish (implements only Swimmable)
const fish = new Fish("Goldfish");

console.log(fish.species); // "Goldfish"
fish.swim(); // "Goldfish is swimming"
// fish.fly();  // ❌ Error - Fish doesn't implement Flyable
// fish.land(); // ❌ Error - Fish doesn't implement Flyable

const fish2 = new Fish("Salmon");
fish2.swim(); // "Salmon is swimming"

// Test polymorphism with Flyable interface
const flyableThings: Flyable[] = [duck, duck2, plane, plane2];
flyableThings.forEach(thing => {
  thing.fly();
  thing.land();
});

// Test polymorphism with Swimmable interface
const swimmableThings: Swimmable[] = [duck, duck2, fish, fish2];
swimmableThings.forEach(thing => {
  thing.swim();
});

// Test type narrowing
const things: (Duck | Airplane | Fish)[] = [duck, plane, fish];
things.forEach(thing => {
  if ('fly' in thing) {
    thing.fly(); // Duck and Airplane
  }
  if ('swim' in thing) {
    thing.swim(); // Duck and Fish
  }
  if ('land' in thing) {
    thing.land(); // Duck and Airplane
  }
});

// Test that Duck can be used as both Flyable and Swimmable
const flyable: Flyable = duck;
const swimmable: Swimmable = duck;
flyable.fly();
swimmable.swim();
```

**Learning goals:** Multiple interface implementation, interface segregation

---

## Exercise 3: Optional Properties and Methods (Medium)

**File:** `03-optional-properties-medium.ts`

Create interfaces with optional members:

**Requirements:**

**UserProfile interface:**
- Required: `username` (string), `email` (string)
- Optional: `bio` (string), `website` (string), `avatarUrl` (string)
- Required method: `getDisplayName()`: string
- Optional method: `updateProfile?()`: void

**BasicUser class (implements UserProfile):**
- Implements only required properties and methods
- `getDisplayName()` returns username

**PremiumUser class (implements UserProfile):**
- Implements all properties including optional ones
- Implements both required and optional methods
- `getDisplayName()` returns formatted name with bio
- `updateProfile()` allows updating profile info

**Validation Requirements:**
- UserProfile interface:
  - Required properties: username and email (both strings)
  - Optional properties: bio, website, avatarUrl (all strings, can be undefined)
  - Required method: `getDisplayName()` returns string
  - Optional method: `updateProfile?()` returns void
- BasicUser class:
  - Constructor: username and email must be non-empty strings
  - Must implement `getDisplayName()`
  - Optional properties can be undefined
  - Does not need to implement `updateProfile()`
- PremiumUser class:
  - Constructor: all parameters including optional ones
  - Must implement `getDisplayName()` and `updateProfile()`
  - Optional properties should have values
  - `getDisplayName()` should include bio if available

**Example usage:**
```typescript
// Test BasicUser (required properties only)
const basicUser = new BasicUser("john_doe", "john@example.com");

console.log(basicUser.username);        // "john_doe"
console.log(basicUser.email);           // "john@example.com"
console.log(basicUser.bio);             // undefined (optional not provided)
console.log(basicUser.website);         // undefined
console.log(basicUser.avatarUrl);       // undefined
console.log(basicUser.getDisplayName()); // "john_doe"

// BasicUser doesn't have updateProfile method
if (basicUser.updateProfile) {
  basicUser.updateProfile(); // Will not execute
} else {
  console.log("No updateProfile method"); // This executes
}

// Test PremiumUser (all properties including optional)
const premiumUser = new PremiumUser(
  "jane_doe",
  "jane@example.com",
  "Software Developer",
  "https://jane.dev"
);

console.log(premiumUser.username);         // "jane_doe"
console.log(premiumUser.email);            // "jane@example.com"
console.log(premiumUser.bio);              // "Software Developer"
console.log(premiumUser.website);          // "https://jane.dev"
console.log(premiumUser.getDisplayName()); // "jane_doe - Software Developer"

// PremiumUser has updateProfile method
if (premiumUser.updateProfile) {
  premiumUser.updateProfile(); // Optional method exists
  console.log("Profile updated");
}

// Test with avatarUrl
const premiumUser2 = new PremiumUser(
  "alice",
  "alice@example.com",
  "Designer",
  "https://alice.design",
  "https://avatar.url/alice.jpg"
);

console.log(premiumUser2.avatarUrl); // "https://avatar.url/alice.jpg"

// Test polymorphism - both implement UserProfile
const users: UserProfile[] = [basicUser, premiumUser, premiumUser2];

users.forEach(user => {
  console.log(user.getDisplayName()); // All have getDisplayName()
  console.log(`Email: ${user.email}`);

  // Check for optional method
  if (user.updateProfile) {
    console.log("Has update capability");
  }
});

// Test multiple basic users
const basicUser2 = new BasicUser("bob_user", "bob@example.com");
const basicUser3 = new BasicUser("charlie", "charlie@example.com");

console.log(basicUser2.getDisplayName()); // "bob_user"
console.log(basicUser3.getDisplayName()); // "charlie"

// Test that optional properties can be undefined
console.log(basicUser.bio === undefined);     // true
console.log(premiumUser.bio === undefined);   // false
console.log(basicUser.website === undefined); // true
```

**Learning goals:** Optional properties and methods in interfaces, flexible implementations

---

## Exercise 4: Interface Extension and Polymorphism (Medium)

**File:** `04-interface-extension-medium.ts`

Create extended interfaces and demonstrate polymorphism:

**Requirements:**

**Entity interface:**
- Property: `id` (number)
- Method: `save()`: void
- Method: `delete()`: void

**Timestamped interface (extends Entity):**
- Additional property: `createdAt` (Date)
- Additional property: `updatedAt` (Date)
- Additional method: `touch()`: void (updates updatedAt)

**User class (implements Timestamped):**
- Properties: all from Timestamped interface + `username` (string), `email` (string)
- Constructor initializes all required properties
- Implement all required methods

**Post class (implements Timestamped):**
- Properties: all from Timestamped interface + `title` (string), `content` (string)
- Constructor initializes all required properties
- Implement all required methods

**Repository class:**
- Property: `entities` (array of Entity objects)
- Method `add(entity: Entity)`: adds to entities array
- Method `saveAll()`: calls save() on all entities
- Method `getTimestamped()`: returns only Timestamped entities

**Validation Requirements:**
- Entity interface:
  - Properties: id (number)
  - Methods: `save()` and `delete()` (both void)
- Timestamped interface:
  - Extends Entity (inherits id, save, delete)
  - Additional properties: createdAt and updatedAt (both Date)
  - Additional method: `touch()` updates updatedAt to current time
- User class:
  - Implements Timestamped (must implement all 5 members)
  - Constructor: id >= 0, username and email non-empty
  - Initialize createdAt and updatedAt to current date
  - Implement save(), delete(), and touch()
- Post class:
  - Implements Timestamped
  - Constructor: id >= 0, title and content non-empty
  - Initialize timestamps
  - Implement all required methods
- Repository:
  - `add()`: accept any Entity
  - `saveAll()`: call save() on all entities (polymorphism)
  - `getTimestamped()`: use type checking to filter Timestamped entities

**Example usage:**
```typescript
// Test User class (implements Timestamped which extends Entity)
const user = new User(1, "alice", "alice@example.com");

console.log(user.id);        // 1 (from Entity)
console.log(user.username);  // "alice"
console.log(user.email);     // "alice@example.com"
console.log(user.createdAt); // Date (from Timestamped)
console.log(user.updatedAt); // Date (from Timestamped)

user.save();   // Implements Entity method
user.delete(); // Implements Entity method
user.touch();  // Implements Timestamped method (updates updatedAt)

// Test Post class (implements Timestamped)
const post = new Post(2, "Hello World", "First post!");

console.log(post.id);        // 2
console.log(post.title);     // "Hello World"
console.log(post.content);   // "First post!"
console.log(post.createdAt); // Date
console.log(post.updatedAt); // Date

post.save();
post.delete();
post.touch();

// Test Repository
const repo = new Repository();

// Add entities (polymorphism - both are Entity types)
repo.add(user);
repo.add(post);

console.log(repo.entities.length); // 2

// Save all entities (polymorphism)
repo.saveAll(); // Calls save() on both user and post

// Test getTimestamped (type narrowing)
const timestamped = repo.getTimestamped();
console.log(timestamped.length); // 2 (both are Timestamped)

// Touch all timestamped entities
const beforeTouch = user.updatedAt;
timestamped.forEach(item => item.touch());
const afterTouch = user.updatedAt;
console.log(beforeTouch < afterTouch); // true (updatedAt changed)

// Test with more entities
const user2 = new User(3, "bob", "bob@example.com");
const post2 = new Post(4, "Second Post", "More content");
const user3 = new User(5, "charlie", "charlie@example.com");

repo.add(user2);
repo.add(post2);
repo.add(user3);

console.log(repo.entities.length); // 5

// Test that all implement Entity interface
repo.entities.forEach(entity => {
  console.log(`Entity ID: ${entity.id}`);
  entity.save(); // All have save() method
});

// Test that getTimestamped returns only Timestamped entities
const allTimestamped = repo.getTimestamped();
console.log(allTimestamped.length); // 5

allTimestamped.forEach(ts => {
  console.log(`Created: ${ts.createdAt}, Updated: ${ts.updatedAt}`);
  ts.touch(); // All have touch() method
});

// Test interface extension hierarchy
const entity: Entity = user; // User is an Entity
const timestampedEntity: Timestamped = user; // User is Timestamped

entity.save();
timestampedEntity.touch();
```

**Learning goals:** Interface extension, polymorphism with interfaces, type checking

---

## Exercise 5: Complete Application with Interfaces (Hard)

**File:** `05-complete-application-hard.ts`

Build a task management system using interfaces and polymorphism:

**Requirements:**

**Task interface:**
- Properties: `id` (number), `title` (string), `completed` (boolean)
- Methods: `complete()`: void, `uncomplete()`: void, `getDescription()`: string

**Schedulable interface:**
- Properties: `dueDate` (Date)
- Methods: `isOverdue()`: boolean, `getDaysUntilDue()`: number

**Assignable interface:**
- Properties: `assignedTo` (string | null)
- Methods: `assign(person: string)`: void, `unassign()`: void

**Prioritizable interface:**
- Properties: `priority` ("low" | "medium" | "high")
- Methods: `setPriority(level: string)`: void, `isHighPriority()`: boolean

**SimpleTask class (implements Task):**
- Implements basic task functionality
- Constructor accepts id and title

**ScheduledTask class (implements Task, Schedulable):**
- Implements both Task and Schedulable
- Constructor accepts id, title, dueDate

**AssignedTask class (implements Task, Assignable, Prioritizable):**
- Implements Task, Assignable, and Prioritizable
- Constructor accepts id, title, assignedTo, priority

**FullTask class (implements Task, Schedulable, Assignable, Prioritizable):**
- Implements all four interfaces
- Constructor accepts all necessary parameters

**TaskManager class:**
- Property: `tasks` (array of Task objects - can hold any task type)
- Method `addTask(task: Task)`: adds task to array
- Method `removeTask(id: number)`: removes task by id
- Method `completeTask(id: number)`: marks task as complete
- Method `getCompletedTasks()`: returns completed tasks
- Method `getIncompleteTasks()`: returns incomplete tasks
- Method `getOverdueTasks()`: returns only schedulable tasks that are overdue
- Method `getTasksByAssignee(person: string)`: returns tasks assigned to person
- Method `getHighPriorityTasks()`: returns high priority tasks

**Validation Requirements:**
- Task interface:
  - Properties: id (>= 0), title (non-empty), completed (boolean)
  - Methods: `complete()`, `uncomplete()`, `getDescription()` (all required)
- Schedulable interface:
  - Property: dueDate (Date)
  - Methods: `isOverdue()` checks if dueDate < current date, `getDaysUntilDue()` calculates difference
- Assignable interface:
  - Property: assignedTo (string | null)
  - Methods: `assign()` sets assignedTo, `unassign()` sets to null
- Prioritizable interface:
  - Property: priority ("low" | "medium" | "high")
  - Methods: `setPriority()` validates and sets, `isHighPriority()` returns priority === "high"
- SimpleTask:
  - Implements only Task interface
  - Initialize completed to false
- ScheduledTask:
  - Implements Task and Schedulable
  - Must implement all methods from both interfaces
- AssignedTask:
  - Implements Task, Assignable, Prioritizable
  - Must implement all methods from three interfaces
- FullTask:
  - Implements all four interfaces
  - Must implement all methods
- TaskManager:
  - `getOverdueTasks()`: use type narrowing to check for Schedulable
  - `getTasksByAssignee()`: use type narrowing to check for Assignable
  - `getHighPriorityTasks()`: use type narrowing to check for Prioritizable
  - All methods work with Task interface (polymorphism)

**Example usage:**
```typescript
const manager = new TaskManager();

// Test SimpleTask (implements only Task)
const simple = new SimpleTask(1, "Buy groceries");

console.log(simple.id);          // 1
console.log(simple.title);       // "Buy groceries"
console.log(simple.completed);   // false
console.log(simple.getDescription()); // "Task #1: Buy groceries"

simple.complete();
console.log(simple.completed);   // true

simple.uncomplete();
console.log(simple.completed);   // false

// Test ScheduledTask (implements Task + Schedulable)
const scheduled = new ScheduledTask(2, "Submit report", new Date("2025-01-15"));

console.log(scheduled.id);       // 2
console.log(scheduled.title);    // "Submit report"
console.log(scheduled.dueDate);  // Date object
console.log(scheduled.isOverdue()); // Boolean (depends on current date)
console.log(scheduled.getDaysUntilDue()); // Number

// Test AssignedTask (implements Task + Assignable + Prioritizable)
const assigned = new AssignedTask(3, "Review code", "Alice", "high");

console.log(assigned.id);        // 3
console.log(assigned.title);     // "Review code"
console.log(assigned.assignedTo); // "Alice"
console.log(assigned.priority);  // "high"
console.log(assigned.isHighPriority()); // true

assigned.setPriority("low");
console.log(assigned.priority);  // "low"
console.log(assigned.isHighPriority()); // false

assigned.unassign();
console.log(assigned.assignedTo); // null

assigned.assign("Bob");
console.log(assigned.assignedTo); // "Bob"

// Test FullTask (implements all four interfaces)
const full = new FullTask(
  4,
  "Complete project",
  new Date("2025-02-01"),
  "Bob",
  "high"
);

console.log(full.id);            // 4
console.log(full.title);         // "Complete project"
console.log(full.completed);     // false
console.log(full.dueDate);       // Date
console.log(full.assignedTo);    // "Bob"
console.log(full.priority);      // "high"

full.complete();
full.touch(); // If Timestamped is added
console.log(full.isOverdue());   // Boolean
console.log(full.isHighPriority()); // true

// Test TaskManager - add all tasks
manager.addTask(simple);
manager.addTask(scheduled);
manager.addTask(assigned);
manager.addTask(full);

console.log(manager.tasks.length); // 4

// Test completeTask
manager.completeTask(1);
console.log(simple.completed); // true

// Test getCompletedTasks
const completed = manager.getCompletedTasks();
console.log(completed.length); // 1 (simple)

// Test getIncompleteTasks
const incomplete = manager.getIncompleteTasks();
console.log(incomplete.length); // 3

// Test getOverdueTasks (type narrowing for Schedulable)
const overdue = manager.getOverdueTasks();
console.log(overdue.length); // Depends on current date
// Only scheduled and full have dueDate

// Test getTasksByAssignee (type narrowing for Assignable)
const aliceTasks = manager.getTasksByAssignee("Alice");
console.log(aliceTasks.length); // 0 (Alice was unassigned earlier)

const bobTasks = manager.getTasksByAssignee("Bob");
console.log(bobTasks.length); // 2 (assigned and full)

// Test getHighPriorityTasks (type narrowing for Prioritizable)
const highPriority = manager.getHighPriorityTasks();
console.log(highPriority.length); // 1 (full is high, assigned is now low)

// Test polymorphism - all tasks implement Task interface
manager.tasks.forEach(task => {
  console.log(task.getDescription()); // All have getDescription()
  console.log(`Completed: ${task.completed}`);

  // Type narrowing for optional interfaces
  if ('isOverdue' in task) {
    console.log(`  Overdue: ${task.isOverdue()}`);
    console.log(`  Days until due: ${task.getDaysUntilDue()}`);
  }
  if ('assignedTo' in task) {
    console.log(`  Assigned to: ${task.assignedTo || 'Unassigned'}`);
  }
  if ('priority' in task) {
    console.log(`  Priority: ${task.priority}`);
  }
});

// Test removeTask
manager.removeTask(1);
console.log(manager.tasks.length); // 3

// Test adding more tasks
const simple2 = new SimpleTask(5, "Clean house");
const scheduled2 = new ScheduledTask(6, "Doctor appointment", new Date("2025-01-20"));

manager.addTask(simple2);
manager.addTask(scheduled2);

console.log(manager.tasks.length); // 5

// Test that different task types work together polymorphically
const allTasks: Task[] = [simple, scheduled, assigned, full, simple2, scheduled2];
allTasks.forEach(t => {
  t.complete(); // All implement complete()
  console.log(`${t.getDescription()}: ${t.completed}`);
});
```

**Learning goals:** Complex interface usage, multiple interface implementation, polymorphism, type narrowing, real-world application design

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-07/01-basic-interface-easy.ts`
3. Remember: interfaces define contracts, classes implement them
4. Use `implements` keyword to implement interfaces
5. Classes can implement multiple interfaces separated by commas

## Tips

- Read the lesson content in `docs/07-interfaces-polymorphism.md` if you get stuck
- Interfaces only define structure, no implementation
- Use interfaces for: contracts, polymorphism, flexible design
- Multiple interfaces allow mixing different capabilities
- Use `extends` for interface inheritance, `implements` for class implementation
- Type narrowing with `in` operator checks if property/method exists
- Polymorphism: treat different objects uniformly through shared interfaces
