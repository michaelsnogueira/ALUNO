"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../entity/customer"));
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
const order_service_1 = __importDefault(require("./order.service"));
describe("Order Service unit test", () => {
    it("should get tital of all orders", () => {
        const orderItem1 = new order_item_1.default("1", "item1", 100, "1", 1);
        const order1 = new order_1.default("1", "123", [orderItem1]);
        const orderItem2 = new order_item_1.default("2", "item2", 200, "2", 2);
        const order2 = new order_1.default("2", "124", [orderItem2]);
        const orders = [order1, order2];
        const total = order_service_1.default.getTotal(orders);
        expect(total).toEqual(500);
    });
    it("should place an order", () => {
        const customer = new customer_1.default("c1", "customer");
        const orderItem1 = new order_item_1.default("i1", "item1", 10, "p1", 1);
        const order1 = order_service_1.default.placeOrder(customer, [orderItem1]);
        expect(customer.rewardPoints).toEqual(5);
        expect(order1.total()).toBe(10);
    });
});
