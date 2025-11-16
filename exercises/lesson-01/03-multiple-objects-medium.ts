/**
 * Exercise 3: Multiple Objects (Medium)
 *
 * Create a BankAccount class with:
 * - Properties: accountNumber, ownerName, balance
 * - Methods: deposit(), withdraw(), getBalance(), transfer()
 *
 * See README.md for full requirements and example usage.
 */

// Your code here

class BankAccount {
  accountNumber: string;
  ownerName: string;
  balance: number = 0;

  constructor(accountNumber: string, ownerName: string, balance: number) {
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.balance = balance;
  }

  deposit(amount: number) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    return (this.balance += amount);
  }

  withdraw(amount: number) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }

    return false;
  }

  getBalance() {
    return this.balance;
  }

  transfer(amount: number, toAccount: BankAccount) {
    if (this.withdraw(amount)) {
      toAccount.deposit(amount);
      return true;
    }
    throw new Error("Insufficient funds for transfer");
  }
}

const account1 = new BankAccount("ACC001", "Alice", 1000);
const account2 = new BankAccount("ACC002", "Bob", 500);

account1.deposit(200);
console.log(account1.getBalance()); // 1200

account1.withdraw(300);
console.log(account1.getBalance()); // 900

account1.transfer(400, account2);
console.log(account1.getBalance()); // 500
console.log(account2.getBalance()); // 900
