import { API } from './api.js';

export const initApp = async () => {
    const app = document.getElementById('app');

    const renderTickets = async () => {
        const tickets = await API.getAllTickets();
        app.innerHTML = '<h1>HelpDesk</h1><button id="add-ticket">Добавить тикет</button><div id="tickets"></div>';

        const ticketsContainer = document.getElementById('tickets');
        tickets.forEach(ticket => {
            const ticketEl = document.createElement('div');
            ticketEl.className = 'ticket';
            ticketEl.innerHTML = `
        <div>
            <input type="checkbox" class="ticket-checkbox" data-id="${ticket.id}" ${ticket.status ? 'checked' : ''}> 
            <span class="ticket-details" data-id="${ticket.id}">${ticket.name}</span>
        </div>
        <div>
            <button class="edit-ticket" data-id="${ticket.id}">✎</button>
            <button class="delete-ticket" data-id="${ticket.id}">✖</button>
        </div>
    `;
            ticketsContainer.appendChild(ticketEl);
        });


        document.querySelectorAll('.ticket-details').forEach(el => {
            el.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const ticket = await API.getTicketById(id);
                alert(`Описание: ${ticket.description || 'Нет описания'}`);
            });
        });

        document.querySelectorAll('.delete-ticket').forEach(el => {
            el.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (confirm('Вы уверены, что хотите удалить тикет?')) {
                    await API.deleteTicket(id);
                    renderTickets();
                }
            });
        });

        document.querySelectorAll('.edit-ticket').forEach(el => {
            el.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const ticket = await API.getTicketById(id);
                const newName = prompt ('Введите новое название тикета', ticket.name);
                const newDescription = prompt ('Введите новое описание тикета', ticket.description);

                if (newName) {
                    await API.updateTicket (id, {name: newName, description: newDescription});
                    renderTickets();
                }
            })
        });

        document.querySelectorAll('.ticket-checkbox').forEach(el => {
            el.addEventListener('change', async (e) =>{
                const id = e.target.dataset.id;
                const status = e.target.checked;

                await API.updateTicket(id, {status});
                renderTickets();
            })
        })
    };

    document.body.addEventListener('click', async (e) => {
        if (e.target.id === 'add-ticket') {
            const name = prompt('Введите краткое описание:');
            const description = prompt('Введите подробное описание:');
            if (name) {
                await API.createTicket({ name, description });
                renderTickets();
            }
        }
    });

    renderTickets();
};
