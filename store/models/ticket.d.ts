export type Ticket = {
  id: number;
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: string;
  createdAt: string;
};

export type TicketForm = {
  title: string;
  note: string;
  isCompleted: boolean;
  assignTo: string;
  expiredDate: Date;
};
