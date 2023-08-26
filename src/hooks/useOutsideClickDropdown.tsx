import { useEffect } from "react";

export default function useOutsideClickDropdown(ref: React.RefObject<HTMLDetailsElement>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.removeAttribute("open");
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }, [ref]);
}
