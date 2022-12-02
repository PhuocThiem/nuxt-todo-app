import { Ticket } from '~~/store/ticket/ticket';

export default defineNuxtPlugin(() => {
  function sortTitleAsc(arr: Ticket[]) {
    return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? 1 : -1));
  }

  function sortTitleDsc(arr: Ticket[]) {
    return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? -1 : 1));
  }

  function sortExpiredAsc(arr: Ticket[]) {
    return arr.sort((a: Ticket, b: Ticket) =>
      new Date(a.expiredDate).getTime() > new Date(b.expiredDate).getTime() ? 1 : -1
    );
  }

  function sortExpiredDsc(arr: Ticket[]) {
    return arr.sort((a: Ticket, b: Ticket) =>
      new Date(a.expiredDate).getTime() > new Date(b.expiredDate).getTime() ? -1 : 1
    );
  }

  return {
    provide: {
      sortTitleAsc,
      sortTitleDsc,
      sortExpiredAsc,
      sortExpiredDsc,
    },
  };
});
