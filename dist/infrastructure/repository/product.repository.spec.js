"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("../db/sequelize/model/product.model"));
const product_1 = __importDefault(require("../../domain/product/entity/product"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product Repositry test", () => {
    let sequilize;
    beforeEach(async () => {
        sequilize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequilize.addModels([product_model_1.default]);
        await sequilize.sync();
    });
    afterEach(async () => {
        await sequilize.close();
    });
    it("should create product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });
    it("should update product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        });
    });
    it("should find product by id", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: productModel.id,
            name: productModel.name,
            price: productModel.price
        });
    });
    it("should find all products", async () => {
        const productRepository = new product_repository_1.default();
        const product1 = new product_1.default("1", "Product 1", 100);
        const product2 = new product_1.default("2", "Product 2", 200);
        const product3 = new product_1.default("3", "Product 3", 300);
        await productRepository.create(product1);
        await productRepository.create(product2);
        await productRepository.create(product3);
        const products = [product1, product2, product3];
        const foundProducts = await productRepository.findAll();
        expect(foundProducts.length).toBe(3);
        expect(products).toEqual(foundProducts);
    });
});
