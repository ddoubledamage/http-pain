export const API = {
    async getAllTickets() {
        const response = await fetch('http://localhost:7070/?method=allTickets');
        return response.json();
    },

    async getTicketById(id) {
        const response = await fetch(`http://localhost:7070/?method=ticketById&id=${id}`);
        return response.json();
    },

    async createTicket(data) {
        const response = await fetch('http://localhost:7070/?method=createTicket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async deleteTicket(id) {
        await fetch(`http://localhost:7070/?method=deleteById&id=${id}`, { method: 'DELETE' });
    },

    async updateTicket(id, data) {
        const response = await fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
};