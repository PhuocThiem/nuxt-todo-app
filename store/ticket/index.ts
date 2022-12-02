import { defineStore } from 'pinia';
import { Ticket } from './ticket';

export const useTicketStore = defineStore('ticket', () => {
  const getTicketsState = ref([] as Ticket[]);

  function updateGetTicketsState(tickets: Ticket[]) {
    getTicketsState.value = tickets;
  }
  function clearGetTasksState() {
    getTicketsState;
  }
  return {
    updateGetTicketsState,
    clearGetTasksState,
  };
});
