import ticketsModel from "../models/tickets.model.js";
import { productService } from "./products.service.js";
import { UserModel } from "../models/users.model.js";

class TicketService {
    constructor() { }

    addTicket = async (ticket) => {
        try {
            const createdTicket = await ticketsModel.create(ticket);
            const user = await UserModel.findOne({ email: ticket.purchaser });

            if (user) {
                user.tickets.push({ order: createdTicket._id });
                await user.save();
            }
            return createdTicket;
        } catch (error) {
            console.log(error);
        }
    };

    getTickets = async () => {
        try {
            const tickets = await ticketsModel.find().lean();
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };

    getTicketById = async (id) => {
        try {
            const ticket = await ticketsModel.findOne({ _id: id }).lean();
            return ticket;
        } catch (error) {
            console.log(error);
        }
    };

    getTicketsByUser = async (email) => {
        try {
            const user = await UserModel.findOne({ email }).populate('orderHistory.order');
            return user;
        } catch (error) {
            throw new Error('Error retrieving user with order details');
        }
    };

    deleteTicket = async (id) => {
        try {
            const deletedTicket = await ticketsModel.deleteOne({ _id: id });
            return deletedTicket;
        } catch (error) {
            console.log(error);
        }
    };

    updateTicket = async (id, changes) => {
        try {
            const updatedTicket = await ticketsModel.updateOne(
                { _id: id },
                changes
            );
            return updatedTicket;
        } catch (error) {
            console.log(error);
        }
    };

    updateProducts = async (id, count) => {
        try {
            const productById = await productService.getProductById(id);
            const updateStock = productById.stock - count;
            const changes = {
                stock: updateStock,
            };
            await productService.updateProduct(id, changes);
        } catch (error) {
            console.error(error);
        }
    };


    getTicketsByStatus = async (status) => {
        try {
            const tickets = await ticketsModel.find({ status: status }).lean();
            return tickets;
        } catch (error) {
            console.log(error);
        }
    };
}

export const ticketService = new TicketService();