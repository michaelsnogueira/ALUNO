import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order('', '123', [])).toThrow('Id is required');
  });
  it("should throw error when customer id is empty", () => {
    expect(() => new Order('1', '', [])).toThrow('Customer id is required');
  });
  it("should throw erro when items is empty", () => {
    expect(() => new Order('1', '123', [])).toThrow('Items is required');
  });
  it("should return total", () => {
    const item1 = new OrderItem('1', 'Item 1', 10, '1', 1);
    const item2 = new OrderItem('1', 'Item 1', 10, '1', 1);
    const order = new Order('1', '123', [
      item1, item2
    ]);
    expect(order.total()).toBe(20);
  });
  it("should throw error if the item quantity is less or zero", () => {
    expect(() => new OrderItem('1', 'Item 1', 10, '1', 0)).toThrow('Quantity must be greater than 0');
  });
  it("should throw error if the item id is empty", () => {
    expect(() => new OrderItem('', 'Item 1', 10, '1', 1)).toThrow('Id is required');
  });
  it("should throw error if the item name is empty", () => {
    expect(() => new OrderItem('1', '', 10, '1', 1)).toThrow('Name is required');
  });
  it("should throw error if the item price is less or zero", () => {
    expect(() => new OrderItem('1', 'Item 1', 0, '1', 1)).toThrow('Price must be greater than 0');
  });

});