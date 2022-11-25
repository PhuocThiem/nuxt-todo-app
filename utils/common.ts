import { Ticket } from '~~/store/models/ticket';

export function sortArrAsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? 1 : -1));
}

export function sortArrDsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? -1 : 1));
}

export function sortExpiredAsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) =>
    new Date(a.ExpiredDate).getTime() > new Date(b.ExpiredDate).getTime() ? 1 : -1
  );
}

export function sortExpiredDsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) =>
    new Date(a.ExpiredDate).getTime() > new Date(b.ExpiredDate).getTime() ? -1 : 1
  );
}
