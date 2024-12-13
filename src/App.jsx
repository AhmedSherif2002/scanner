import "./App.css";
import TreePage from "./ParserComponents/Tree";
import Scanner from "./Scanner";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scanner/>}/>
        <Route path="/parser" element={<TreePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
