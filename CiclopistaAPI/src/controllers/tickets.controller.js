import { v4 as uuidv4 } from "uuid";
import { ticketService } from "../DAO/mongo/services/tickets.service.js";
import { productService } from "../DAO/mongo/services/products.service.js";
import ticketsModel from "../DAO/mongo/models/tickets.model.js";
import TicketDTO from "../DAO/DTO/tickets.dto.js";
import CustomError from "../DAO/mongo/services/errors/custom-error.js";
import EErros from "../DAO/mongo/services/errors/enum.js";

class TicketController {

    async getTickets(req, res) {
        try {
            const tickets = await ticketService.getTickets();

            if (!tickets) {
                CustomError.createError({
                    name: "Error-tickets",
                    cause: "Tickets was not found",
                    message: "Tickets was not found",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({
                status: "success",
                message: "ticket found",
                payload: tickets,
            });
        } catch (error) {
            CustomError.createError({
                name: "Error-tickets",
                cause: "An error occurred while fetching tickets",
                message: "An error occurred while fetching tickets",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

    async getTicketById(req, res) {
        try {
            const ticketId = req.params.pid;
            const ticket = await ticketService.getTicketById(ticketId);

            if (!ticket) {
                CustomError.createError({
                    name: "Error-ticket-by-id",
                    cause: "Ticket was not found",
                    message: "Ticket was not found",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({
                status: "Success",
                message: "Ticket found",
                payload: ticket,
            });
        } catch (error) {
            CustomError.createError({
                name: "Error-ticket-by-id",
                cause: "An error occurred while fetching ticket by ID",
                message: "An error occurred while fetching ticket by ID",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

    async getTicketsByStatus(req, res) {
        try {
            const ticketsStatus = req.params.status;
            const tickets = await ticketService.getTicketsByStatus(ticketsStatus);

            if (!tickets) {
                CustomError.createError({
                    name: "Error-tickets-by-status",
                    cause: "Tickets was not found",
                    message: "Tickets was not found",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({
                status: "success",
                message: "ticket found",
                payload: tickets,
            });
        } catch (error) {
            CustomError.createError({
                name: "Error-ticket-by-status",
                cause: "An error occurred while fetching ticket by status",
                message: "An error occurred while fetching ticket by status",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

    async addTicket(req, res) {
        try {
            const ticket = req.body;

            let ticketCode = uuidv4().toString();
            let ticketCodeMongo = await ticketsModel.findOne({ code: ticketCode }).lean();

            while (ticketCode == ticketCodeMongo) {
                ticketCode = uuidv4().toString();
                ticketCodeMongo = await ticketsModel.findOne({ code: ticketCode }).lean();
            }

            const updatedCart = [];
            for (const cartItem of ticket.cart) {
                const product = await productService.getProductById(cartItem._id);
                if (product && product.stock >= cartItem.cantidad) {
                    await ticketService.updateProducts(cartItem._id, cartItem.cantidad);
                    updatedCart.push(cartItem);
                } else {
                    CustomError.createError({
                        name: "Error-add-product-to-the-cart",
                        cause: `Product with ID ${cartItem._id} is out of stock or not found.`,
                        message: `Product with ID ${cartItem._id} is out of stock or not found.`,
                        code: EErros.ADDPRODUCT_TO_CART_ERORR,
                    });
                }
            }

            const ticketDTO = new TicketDTO(ticketCode, ticket, updatedCart);
            await ticketService.addTicket(ticketDTO);
            return res.send({ status: "OK", message: "Ticket successfully added" });
        } catch (error) {
            CustomError.createError({
                name: "Error-add-product-to-the-cart",
                cause: `Product is out of stock or not found.`,
                message: `Product with ID is out of stock or not found.`,
                code: EErros.ADDPRODUCT_TO_CART_ERORR,
            });
        }
    }

    async updateTicket(req, res) {
        try {
            const ticketId = req.params.pid;
            const changes = req.body;

            const updatedTicket = await ticketService.updateTicket(ticketId, changes);

            if (!updatedTicket) {
                CustomError.createError({
                    name: "Error-update-ticket",
                    cause: "Ticket was not found",
                    message: "Ticket was not found",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({
                status: "OK",
                message: "Ticket successfully updated",
            });
        } catch (error) {
            CustomError.createError({
                name: "Error-update-ticket",
                cause: "An error occurred while updating ticket",
                message: "An error occurred while updating ticket",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

    async deleteTicket(req, res) {
        try {
            const ticketId = req.params.pid;
            const deletedTicket = await ticketService.deleteTicket(ticketId);

            if (!deletedTicket) {
                CustomError.createError({
                    name: "Error-delete-ticket",
                    cause: "Ticket does not exists",
                    message: "Ticket does not exists",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({ status: "OK", message: "Ticket deleted successfully" });
        } catch (error) {
            CustomError.createError({
                name: "Error-delete-ticket",
                cause: "An error occurred while deleting ticket",
                message: "An error occurred while deleting ticket",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

    async getTicketsByUser(req, res) {
        try {
            const userEmail = req.params.email;
            const userWithOrders = await ticketService.getTicketsByUser(userEmail);

            if (!userEmail) {
                CustomError.createError({
                    name: "Error-user",
                    cause: "User does not exists",
                    message: "User does not exists",
                    code: EErros.DATABASES_READ_ERROR,
                });
            }

            return res.send({
                status: "success",
                message: "user found",
                payload: userWithOrders,
            });
        } catch (error) {
            CustomError.createError({
                name: "Error-user",
                cause: "An error occurred while fetching ticket by ID",
                message: "An error occurred while fetching ticket by ID",
                code: EErros.DATABASES_READ_ERROR,
            });
        }
    }

}

export const ticketController = new TicketController();