export type Ticket = {
  id?: number;
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: Date;
  createdAt?: Date;
};

export type TicketForm = {
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: Date;
};
