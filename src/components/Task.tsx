import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task as TaskType } from "../types";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { useColumns } from "../contexts/ColumnsContext";
import EditMenu from "./EditMenu";

interface Props {
  item: TaskType;
  index: number;
}

export default function Task({ item, index }: Props) {
  const { columns, setColumns } = useColumns();
  const [editMode, setEditMode] = useState(false);


  function deleteTask(taskId: string) {
    const updatedColumns = columns.map((col) => {
      const updatedTasks = col.tasks.filter((task) => task.id !== taskId);
      return { ...col, tasks: updatedTasks };
    });
    setColumns(updatedColumns);
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(dragProvided) => (
        <>
          <div
            ref={dragProvided.innerRef}
            className="bg-base-300 p-3 mb-4 text-sm overflow-hidden break-words rounded-md shadow-md group relative"
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            onClick={() => setEditMode(true)}
          >
            {item.content}
            <button
              className="bg-base-100 bg-opacity-75 p-1 rounded-md absolute top-2.5 right-2 opacity-0 pointer-events-none hover:bg-opacity-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
              onClick={() => deleteTask(item.id)}
            >
              <DeleteIcon />
            </button>
          </div>
          {editMode && (
            <EditMenu
              id={item.id}
              value={item.content}
              type="TASK"
              action="EDIT"
              setEditMode={setEditMode}
            />
          )}
        </>
      )}
    </Draggable>
  );
}
