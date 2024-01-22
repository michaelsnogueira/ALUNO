import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit test", () => {
  it("should get tital of all orders", () => {
    const orderItem1 = new OrderItem("1", "item1", 100, "1", 1);
    const order1 = new Order("1", "123", [orderItem1]);

    const orderItem2 = new OrderItem("2", "item2", 200, "2", 2);
    const order2 = new Order("2", "124", [orderItem2]);

    const orders = [order1, order2];

    const total = OrderService.getTotal(orders);
    expect(total).toEqual(500);
  });
  it("should place an order", () => {
    const customer = new Customer("c1", "customer");
    const orderItem1 = new OrderItem("i1", "item1", 10, "p1", 1);
    const order1 = OrderService.placeOrder(customer, [orderItem1]);

    expect(customer.rewardPoints).toEqual(5);
    expect(order1.total()).toBe(10);
  });
});