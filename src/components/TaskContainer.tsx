import { useEffect, useRef, useState } from "react";
import { Droppable, Id } from "@hello-pangea/dnd";
import Task from "./Task";
import { Task as TaskType } from "../types";
import { useColumns } from "../contexts/ColumnsContext";

interface Props {
  id: Id;
  items: TaskType[];
}

export default function TaskContainer({ id, items }: Props) {
  const { columns } = useColumns();
  const [isScrollable, setIsScrollable] = useState(false);
  const taskContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (taskContainerRef.current) {
      if (taskContainerRef.current.scrollHeight > taskContainerRef.current.clientHeight) {
        setIsScrollable(true);
      } else {
        setIsScrollable(false);
      }
    }
  }, [columns]);

  return (
    <Droppable droppableId={id} type="TASK">
      {(dropProvided) => (
        <div
          ref={(el) => {
            taskContainerRef.current = el;
            dropProvided.innerRef(el);
          }}
          {...dropProvided.droppableProps}
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ paddingRight: isScrollable ? "0.375rem" : 0 }}
        >
          {items.map((item, index) => (
            <Task
              key={item.id}
              item={item}
              index={index}
            />
          ))}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
