import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskContainer from "./TaskContainer";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { Task } from "../types";
import { useColumns } from "../contexts/ColumnsContext";
import EditMenu from "./EditMenu";

interface Props {
  id: string;
  title: string;
  items: Task[];
  index: number;
}

export default function Column({ id, title, items, index }: Props) {
  const { columns, setColumns } = useColumns();
  const [editMode, setEditMode] = useState(false);
  const [addNewTask, setAddNewTask] = useState(false);

  function removeColumn(columnId: string) {
    const removeIndex = columns.findIndex((col) => col.id === columnId);
    columns.splice(removeIndex, 1);
    setColumns([...columns])
  }

  return (
    <Draggable draggableId={id} index={index} >
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          className="flex flex-col bg-base-200 w-72 px-4 pt-4 mr-4 overflow-hidden rounded-md shadow-md"
        >
          <header className="relative mb-4">
            <h2
              className="w-[calc(100%-1.5rem)] font-bold px-1 break-words"
              {...dragProvided.dragHandleProps}
              onClick={() => setEditMode(true)}
            >
              {title}
            </h2>
            <button
              className="absolute top-0 right-0 p-1 rounded-md hover:bg-base-100"
              onClick={() => removeColumn(id)}
            >
              <DeleteIcon />
            </button>
          </header>
          <TaskContainer id={id} items={items} />
          <button
            className="btn btn-primary no-animation w-full mb-4 rounded-md"
            onClick={() => setAddNewTask(true)}
          >
            Add a task
          </button>
          {addNewTask && (
            <EditMenu
              id={id}
              value="New task"
              type="TASK"
              action="ADD"
              setEditMode={setAddNewTask}
            />
          )}
          {editMode && (
            <EditMenu
              id={id}
              value={title}
              type="COLUMN"
              action="EDIT"
              setEditMode={setEditMode}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
