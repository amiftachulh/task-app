import { useRef } from "react";
import { useColumns } from "../contexts/ColumnsContext";
import GearIcon from "../assets/icons/GearIcon";
import { data } from "../data";
import useOutsideClickDropdown from "../hooks/useOutsideClickDropdown";

export default function Settings() {
  const { setColumns } = useColumns();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useOutsideClickDropdown(detailsRef);

  return (
    <details ref={detailsRef} className="dropdown">
      <summary className="btn bg-transparent border-none rounded-md hover:bg-transparent">
        <GearIcon />
      </summary>
      <ul className="dropdown-content menu w-24 top-14 right-0 overflow-x-hidden overflow-y-auto flex-nowrap bg-base-300 text-sm shadow-md rounded-md z-[2]">
        <li
          className="p-2 rounded-md cursor-pointer hover:bg-base-200"
          onClick={() => setColumns([])}
        >
          Clear
        </li>
        <li
          className="p-2 rounded-md cursor-pointer hover:bg-base-200"
          onClick={() => setColumns(data)}
        >
          Reset
        </li>
      </ul>
    </details>
  );
}
