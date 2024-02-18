import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [toggleExpand, setToggleExpand] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggleExpand(false);
      }
    };
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [ref]);
  return { toggleExpand, setToggleExpand, ref };
};

export default useClickOutsideToggle;
