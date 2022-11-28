import { Ticket } from '~~/store/models/ticket';

export function sortTitleAsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? 1 : -1));
}

export function sortTitleDsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? -1 : 1));
}

export function sortExpiredAsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) =>
    new Date(a.expiredDate).getTime() > new Date(b.expiredDate).getTime() ? 1 : -1
  );
}

export function sortExpiredDsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) =>
    new Date(a.expiredDate).getTime() > new Date(b.expiredDate).getTime() ? -1 : 1
  );
}
