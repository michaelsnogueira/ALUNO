"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../entity/order"));
const uuid_1 = require("uuid");
class OrderService {
    static getTotal(orders) {
        return orders.reduce((total, order) => total + order.total(), 0);
    }
    static placeOrder(customer, orderItems) {
        if (orderItems.length === 0) {
            throw new Error('Order must have at least one item');
        }
        const order = new order_1.default((0, uuid_1.v4)(), customer.id, orderItems);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}
exports.default = OrderService;
