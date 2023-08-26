import { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data";
import { Column } from "../types";
import { validate } from "../utils";

type Context = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const ColumnsContext = createContext<Context | null>(null);

export default function ColumnsProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState(() => {
    const localData = localStorage.getItem("data");
    if (!localData) return data;
    try {
      const parsed = JSON.parse(localData);
      if (!validate(parsed)) return false;
      return parsed;
    } catch (error) {
      return data;
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
  }, [columns]);

  const value = {
    columns,
    setColumns,
  };

  return (
    <ColumnsContext.Provider value={value}>
      {children}
    </ColumnsContext.Provider>
  );
}

export function useColumns() {
  const context = useContext(ColumnsContext);
  if (!context) {
    throw new Error("useColumns must be used within a ColumnsProvider");
  }
  return context;
}
