"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static incrisePrice(products, percentage) {
        products.forEach(product => {
            product.changePrice(product.price + (product.price * percentage / 100));
        });
        return products;
    }
}
exports.default = ProductService;
