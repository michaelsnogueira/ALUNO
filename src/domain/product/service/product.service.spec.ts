import Product from "../entity/product";
import ProductService from "./product.service";
describe("Product service unit test", () => {
  it("should change the prices of all produits", () => {
    const product1 = new Product("product1", "Product1", 10);
    const product2 = new Product("product2", "Product2", 20);

    const products = [product1, product2];

    ProductService.incrisePrice(products, 100);

    expect(product1.price).toEqual(20);
    expect(product2.price).toEqual(40);
  });
});