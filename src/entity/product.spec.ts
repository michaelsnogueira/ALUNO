import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product('', '123', 0)).toThrow('Id is required');
  });
  it("should throw error when name is empty", () => {
    expect(() => new Product('123', '', 0)).toThrow('Name is required');
  });
  it("should throw error when price is empty", () => {
    expect(() => new Product('123', '123', 0)).toThrow('Price is required');
  });
});