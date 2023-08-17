import { User } from "./user"

export interface Todo {
  id: string;
  title: string;
  dueDate?: Date;
  completed: boolean;
  expired: boolean;
  createdBy: User;
  assignedTo?: User;
}