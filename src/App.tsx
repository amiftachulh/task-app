import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";
import ColumnsProvider from "./contexts/ColumnsContext";

function App() {
  return (
    <ColumnsProvider>
      <Navbar />
      <KanbanBoard />
    </ColumnsProvider>
  );
}

export default App;
