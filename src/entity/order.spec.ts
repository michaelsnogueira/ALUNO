import Order from "./order";

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
    const order = new Order('1', '123', [
      { _id: '1', _name: 'Item 1', _price: 10 },
      { _id: '2', _name: 'Item 2', _price: 15 }
    ]);
    expect(order.total()).toBe(25);
  });

});