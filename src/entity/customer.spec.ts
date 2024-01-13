import { Address } from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrow("Id is required");
  });
  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });
  it("should change name", () => {
    const customer = new Customer("123", "John Doe");
    expect(customer.name).toBe("John Doe");
  });
  it("should activate Customer", () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("Main Street", 123, "12345", "New York");
    customer.address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });
  it("should deactivate Customer", () => {
    const customer = new Customer("123", "John Doe");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });
  it("should throw error when address is undefined when you activate customer", () => {
    const customer = new Customer("123", "John Doe");
    expect(() => {
      customer.activate();
    }).toThrow("Address is required");
  });
});