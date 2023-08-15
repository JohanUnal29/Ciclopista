import { productService } from "../DAO/mongo/services/products.service.js";
import ProductDTO from "../DAO/DTO/products.dto.js";

class ProductController {
    async getPaginatedProducts(req, res) {
        try {
            const ITEMS_PER_PAGE = 20;
            const page = req.query.page || 1;

            // Put all your query params in here
            const query = {};
            const products = await productService.getPaginatedProducts(page, query, ITEMS_PER_PAGE);

            if (!products) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "products was not found" });
            }

            return res.send({
                status: "success",
                message: "product found",
                payload: products,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching paginated products",
            });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await productService.getProducts();

            if (!products) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "products was not found" });
            }

            return res.send({
                status: "success",
                message: "product found",
                payload: products,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching products",
            });
        }
    }

    async getProductsByCategory(req, res) {
        try {
            const productsCategory = req.params.category;
            const products = await productService.getProductsByCategory(productsCategory);

            if (!products) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "product was not found" });
            }

            return res.send({
                status: "success",
                message: "product found",
                payload: products,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching products by category",
            });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.pid;
            const product = await productService.getProductById(productId);

            if (!product) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "product was not found" });
            }

            return res.send({
                status: "success",
                message: "product found",
                payload: product,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching product by ID",
            });
        }
    }

    async addProduct(req, res) {
        const product = req.body;

        const productDTO = new ProductDTO(product);

        try {
            await productService.addProduct(productDTO);
            return res.send({ status: "OK", message: "Product successfully added" });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "Error, failed to add the add",
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.pid;
            const changes = req.body;

            const updatedProduct = await productService.updateProduct(productId, changes);

            if (!updatedProduct) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "product was not found" });
            }

            return res.send({
                status: "OK",
                message: "Product successfully updated",
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while updating product",
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.pid;
            const deletedProduct = await productService.deleteProduct(productId);

            if (!deletedProduct) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "Product does not exist" });
            }

            return res.send({ status: "OK", message: "Product deleted successfully" });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while deleting product",
            });
        }
    }
}

export const productController = new ProductController();