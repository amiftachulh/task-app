import Settings from "./Settings";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  return (
    <nav className="navbar p-4">
      <div className="navbar-start">
        <h1 className="font-bold text-xl">
          <span className="text-primary">Task</span>&nbsp;Management
        </h1>
      </div>
      <div className="navbar-end gap-2">
        <ThemeSelector />
        <Settings />
      </div>
    </nav>
  );
}
