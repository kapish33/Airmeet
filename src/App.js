import { Route, Routes } from "react-router-dom";
import { Todos } from "./components/Todos";
import Highlighted from "./components/Highlighted.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/highlighted" element={<Highlighted />} />
      </Routes>
    </div>
  );
}

export default App;
