import { DraggableLocation } from "@hello-pangea/dnd";
import { Column } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reorderColumns = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const reorderTasks = (
  columns: Column[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  return columns.map((col) => {
    if (col.id !== source.droppableId) return col;

    const reorderedTasks = [...col.tasks];
    const [draggedTask] = reorderedTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      reorderedTasks.splice(destination.index, 0, draggedTask);
    } else {
      const destinationColIndex = columns.findIndex((c) => c.id === destination.droppableId);
      const destinationCol = columns[destinationColIndex];
      destinationCol.tasks.splice(destination.index, 0, draggedTask);
    }

    return {
      ...col,
      tasks: reorderedTasks,
    };
  });
}

export const validate = (data: unknown) => {
  if (!Array.isArray(data)) return false;

  const columndIdSet = new Set();
  const taskIdSet = new Set();

  for (const col of data) {
    if (!col.id || !col.title || !Array.isArray(col.tasks)) return false;
    if (columndIdSet.has(col.id)) return false;
    columndIdSet.add(col.id);

    for (const task of col.tasks) {
      if (!task.id || !task.content) return false;
      if (taskIdSet.has(task.id)) return false;
      taskIdSet.add(task.id);
    }
  }

  return true;
}
