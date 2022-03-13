import { Route, Routes } from "react-router-dom";
import { Todos } from "./components/Todos";
import Highlighted from "./components/Highlighted.jsx";
import Favoutite from "./components/Favoutite.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/highlighted" element={<Highlighted />} />
        <Route path="favourite" element={<Favoutite />} />
      </Routes>
    </div>
  );
}

export default App;
