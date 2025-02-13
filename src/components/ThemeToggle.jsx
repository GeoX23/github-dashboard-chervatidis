import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
    </div>
  );
};

export default ThemeToggle;
