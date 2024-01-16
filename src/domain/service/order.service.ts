import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuidv4 } from 'uuid';

export default class OrderService {

  static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(uuidv4(), customer.id, orderItems);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}