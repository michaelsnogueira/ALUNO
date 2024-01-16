import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product('', '123', 0)).toThrow('Id is required');
  });
  it("should throw error when name is empty", () => {
    expect(() => new Product('123', '', 0)).toThrow('Name is required');
  });
  it("should throw erro when price is negative", () => {
    expect(() => new Product('123', '123', -1)).toThrow('Price must be greater than 0');
  });
  it("should change name", () => {
    const product = new Product('123', '123', 209);
    product.changeName('456');
    expect(product.name).toBe('456');
  });
  it("should change price", (() => {
    const product = new Product('123', '123', 209);
    product.changePrice(100);
    expect(product.price).toBe(100);
  }));
});