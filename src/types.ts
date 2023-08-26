import { Id } from "@hello-pangea/dnd";

export type Column = {
  id: Id;
  title: string;
  tasks: Task[];
}

export type Task = {
  id: Id;
  content: string;
}
