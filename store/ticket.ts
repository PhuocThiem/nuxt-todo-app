
import { defineStore } from "pinia";
import {
  Ticket
} from "./models/ticket"

export const useTicketStore = defineStore("ticket", () => {
  const createTicketState = reactive({
    data: null,
  });

  const getTicketsState = ref([] as Ticket[])

  const updateTicketState = reactive({
    data: null,
  });

  const updateTicketStatusState = reactive({
    data: null,
  });

  const deleteTicketState = reactive({
    data: null,
  });

  const getTicketDetailState = reactive({
    data: null,
  });

  function updateCreateTicketState() {

  }
  function updateGetTicketsState(tickets: Ticket[]) {
    getTicketsState.value = tickets
  }
  function clearGetTasksState() {
    getTicketsState
  }
  return {
    createTicketState,
    getTicketsState,
    updateTicketState,
    updateTicketStatusState,
    deleteTicketState,
    getTicketDetailState,
    updateGetTicketsState,
    clearGetTasksState,
  }
})