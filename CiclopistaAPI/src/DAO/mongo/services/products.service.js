import productsModel from "../models/products.model.js";

class ProductService {
    getProducts = async () => {
        try {
            const products = await productsModel.find().lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    };

    getPaginatedProducts = async (page, query, ITEMS_PER_PAGE) => {
        try {
            const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

            const countPromise = productsModel.estimatedDocumentCount(query);

            const itemsPromise = productsModel.find(query).limit(ITEMS_PER_PAGE).skip(skip);

            const [count, items] = await Promise.all([countPromise, itemsPromise]);

            const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

            return {
                pagination: {
                    count,
                    pageCount,
                },
                items,
            };
        } catch (e) {
            console.error(e);
            return e;
        }
    };

    addProduct = async (product) => {
        try {
            const createdProduct = await productsModel.create(product);
            return createdProduct;
        } catch (error) {
            console.log(error);
        }
    };

    getProductById = async (id) => {
        try {
            const product = await productsModel.findOne({ _id: id }).lean();
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    getProductsByCategory = async (category) => {
        try {
            const products = await productsModel.find({ category: category }).lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    };

    updateProduct = async (id, changes) => {
        try {
            const updatedProduct = await productsModel.updateOne(
                { _id: id },
                changes
            );
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    };

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productsModel.deleteOne({ _id: id });
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    };
}
export const productService = new ProductService();