export type Ticket = {
  id: number;
  createdAt: string;
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: string;
};

export type TicketForm = {
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: Date;
};
