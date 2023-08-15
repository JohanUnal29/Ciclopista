import { v4 as uuidv4 } from "uuid";
import { ticketService } from "../DAO/mongo/services/tickets.service.js";
import { productService } from "../DAO/mongo/services/products.service.js";
import ticketsModel from "../DAO/mongo/models/tickets.model.js";
import TicketDTO from "../DAO/DTO/tickets.dto.js";

class TicketController {

    async getTickets(req, res) {
        try {
            const tickets = await ticketService.getTickets();

            if (!tickets) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "tickets was not found" });
            }

            return res.send({
                status: "success",
                message: "ticket found",
                payload: tickets,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching tickets",
            });
        }
    }

    async getTicketById(req, res) {
        try {
            const ticketId = req.params.pid;
            const ticket = await ticketService.getTicketById(ticketId);

            if (!ticket) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "ticket was not found" });
            }

            return res.send({
                status: "success",
                message: "ticket found",
                payload: ticket,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching ticket by ID",
            });
        }
    }

    async getTicketsByStatus(req, res) {
        try {
            const ticketsStatus = req.params.status;
            const tickets = await ticketService.getTicketsByStatus(ticketsStatus);

            if (!tickets) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "ticket was not found" });
            }

            return res.send({
                status: "success",
                message: "ticket found",
                payload: tickets,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching tickets by status",
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
                    console.log(`Product with ID ${cartItem._id} is out of stock or not found.`);
                }
            }

            const ticketDTO = new TicketDTO(ticketCode, ticket, updatedCart);
            await ticketService.addTicket(ticketDTO);
            return res.send({ status: "OK", message: "Ticket successfully added" });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while adding the ticket",
            });
        }
    }

    async updateTicket(req, res) {
        try {
            const ticketId = req.params.pid;
            const changes = req.body;

            const updatedTicket = await ticketService.updateTicket(ticketId, changes);

            if (!updatedTicket) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "Ticket was not found" });
            }

            return res.send({
                status: "OK",
                message: "Ticket successfully updated",
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while updating the ticket",
            });
        }
    }

    async deleteTicket(req, res) {
        try {
            const ticketId = req.params.pid;
            const deletedTicket = await ticketService.deleteTicket(ticketId);

            if (!deletedTicket) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "Ticket does not exist" });
            }

            return res.send({ status: "OK", message: "Ticket deleted successfully" });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while deleting the ticket",
            });
        }
    }

    async getTicketsByUser(req, res) {
        try {
            const userEmail = req.params.email;
            const userWithOrders = await ticketService.getTicketsByUser(userEmail);

            if (!userEmail) {
                return res
                    .status(404)
                    .send({ status: "Error", error: "user was not found" });
            }

            return res.send({
                status: "success",
                message: "user found",
                payload: userWithOrders,
            });
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                error: "An error occurred while fetching ticket by ID",
            });
        }
    }

}

export const ticketController = new TicketController();