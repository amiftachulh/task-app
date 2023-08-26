import { nanoid } from "nanoid";
import { Column } from "./types";

export const data: Column[] = [
  {
    id: nanoid(),
    title: "To Do",
    tasks: [
      {
        id: nanoid(),
        content: "Implement backend",
      },
      {
        id: nanoid(),
        content: "Write unit tests",
      },
      {
        id: nanoid(),
        content: "Code review",
      },
      {
        id: nanoid(),
        content: "Integration testing",
      },
    ],
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [
      {
        id: nanoid(),
        content: "Design UI",
      },
      {
        id: nanoid(),
        content: "Implement frontend",
      },
    ],
  },
  {
    id: nanoid(),
    title: "Done",
    tasks: [
      {
        id: nanoid(),
        content: "Gather project requirements",
      },
      {
        id: nanoid(),
        content: "Define project architectures",
      },
      {
        id: nanoid(),
        content: "Setup development environment",
      },
      {
        id: nanoid(),
        content: "Create initial mockups",
      },
    ],
  },
];
