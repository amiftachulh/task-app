import { useLayoutEffect, useRef, useState } from "react";
import CheckIcon from "../assets/icons/CheckIcon";
import CaretDownIcon from "../assets/icons/CaretDownIcon";
import useOutsideClickDropdown from "../hooks/useOutsideClickDropdown";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState("");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme || !themes.includes(localTheme)) {
      localStorage.setItem("theme", "dracula");
    }
    document.documentElement.setAttribute("data-theme", localTheme!);
    setTheme(localTheme!);
  }, []);

  useOutsideClickDropdown(detailsRef);

  function changeTheme(theme: string) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  return (
    <details ref={detailsRef} className="dropdown">
      <summary className="btn rounded-md">
        Theme
        <CaretDownIcon />
      </summary>
      <ul
        className="dropdown-content top-14 right-0 overflow-x-hidden overflow-y-auto flex flex-col gap-2 flex-nowrap bg-base-300 h-80 p-2 text-sm shadow-md rounded-md z-[2]"
      >
        {themes.map((t) => (
          <li
            key={t}
            className="relative px-8 py-3 rounded-md capitalize cursor-pointer hover:bg-base-200"
            data-theme={t}
            onClick={() => changeTheme(t)}
          >
            <div className="absolute left-2 top-3">
              {theme === t && <CheckIcon />}
            </div>
            <span className="font-roboto">{t}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
