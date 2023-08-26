import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { reorderColumns, reorderTasks } from "../utils";
import Column from "./Column";
import { useColumns } from "../contexts/ColumnsContext";
import EditMenu from "./EditMenu";

export default function KanbanBoard() {
  const { columns, setColumns } = useColumns();
  const [addNewColumn, setAddNewColumn] = useState(false);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering columns
    if (result.type === "COLUMN") {
      const ordered = reorderColumns(
        columns,
        source.index,
        destination.index
      );
      setColumns(ordered);
      return;
    }

    // reordering tasks
    const ordered = reorderTasks(columns, source, destination);
    setColumns(ordered);
  }

  return (
    <div className="inline-flex pl-4 w-full overflow-x-auto h-[calc(100vh-5rem)] pb-4">
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(dropProvided) => (
            <div
              ref={dropProvided.innerRef}
              {...dropProvided.droppableProps}
              className="inline-flex"
            >
              {columns.map((col, index) => (
                <Column
                  key={col.id}
                  id={col.id}
                  title={col.title}
                  items={col.tasks}
                  index={index}
                />
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        className="bg-base-200 btn w-72 h-min p-4 mr-4 rounded-md"
        onClick={() => setAddNewColumn(true)}
      >
        Add a column
      </div>
      {addNewColumn && (
        <EditMenu
          id="droppable"
          value="New column"
          type="COLUMN"
          action="ADD"
          setEditMode={setAddNewColumn}
        />
      )}
    </div>
  );
}
