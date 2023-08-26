import { useEffect, useRef, useState } from "react";
import { useColumns } from "../contexts/ColumnsContext";
import { Id } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";

interface Props {
  id: Id;
  value: string;
  type: "COLUMN" | "TASK";
  action: "ADD" | "EDIT";
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditMenu(props: Props) {
  const { columns, setColumns } = useColumns();
  const [value, setValue] = useState(props.value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      const textLength = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(textLength, textLength);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        textAreaRef.current && !textAreaRef.current.contains(event.target as Node) &&
        saveBtnRef.current && !saveBtnRef.current.contains(event.target as Node)
      ) {
        props.setEditMode(false);
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }, []);

  function add() {
    if (!value) {
      props.setEditMode(false);
      return;
    }

    if (props.type === "COLUMN") {
      setColumns([...columns, {
        id: nanoid(),
        title: value,
        tasks: [],
      }]);
    } else {
      const result = columns.map((col) => {
        if (col.id !== props.id) return col;
        const tasks = [...col.tasks, {
          id: nanoid(),
          content: value,
        }];
        return { ...col, tasks };
      })
      setColumns(result);
    }
    props.setEditMode(false);
  }

  function update() {
    if (!value || value === props.value) {
      props.setEditMode(false);
      return;
    }

    let result;

    if (props.type === "COLUMN") {
      result = columns.map((col) => {
        if (col.id !== props.id) return col;
        return { ...col, title: value }
      });
    } else {
      result = columns.map((col) => {
        const tasks = col.tasks.map((task) => {
          if (task.id !== props.id) return task;
          return { ...task, content: value };
        });
        return { ...col, tasks };
      });
    }

    setColumns(result);
    props.setEditMode(false);
  }

  function handleClick() {
    if (props.action === "ADD") {
      add();
    } else {
      update();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  return (
    <div className="absolute grid place-items-center bg-black bg-opacity-70 inset-0 z-[2]">
      <div className="flex flex-col gap-4">
        <textarea
          ref={textAreaRef}
          className="bg-base-100 p-2 rounded-md"
          placeholder={props.type === "COLUMN" ? "Enter column title here..." : "Enter task content here..."}
          cols={30}
          rows={4}
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-4">
          <button ref={saveBtnRef} className="btn btn-primary flex-1 rounded-md" onClick={handleClick}>
            Save
          </button>
          <button className="btn btn-secondary flex-1 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
