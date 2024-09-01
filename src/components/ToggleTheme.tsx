import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [mode, setMode] = useState<"dark" | "light">(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );

  const changeMode = () => {
    if (mode === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setMode("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setMode("dark");
    }
  };

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  return (
    <div onClick={changeMode} className="cursor-pointer text-xl">
      {mode === "dark" ? "☀️" : "🌙"}
    </div>
  );
};

export default ToggleTheme;
