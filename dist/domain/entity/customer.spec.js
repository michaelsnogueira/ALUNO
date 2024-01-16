"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new customer_1.default("", "John Doe");
        }).toThrow("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            new customer_1.default("123", "");
        }).toThrow("Name is required");
    });
    it("should change name", () => {
        const customer = new customer_1.default("123", "John Doe");
        expect(customer.name).toBe("John Doe");
    });
    it("should activate Customer", () => {
        const customer = new customer_1.default("123", "John Doe");
        const address = new address_1.Address("Main Street", 123, "12345", "New York");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("should deactivate Customer", () => {
        const customer = new customer_1.default("123", "John Doe");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
    it("should throw error when address is undefined when you activate customer", () => {
        const customer = new customer_1.default("123", "John Doe");
        expect(() => {
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });
    it("should add reward points", () => {
        const customer = new customer_1.default("123", "John Doe");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
