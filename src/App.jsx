import "./App.css";
import TreePage from "./ParserComponents/Tree";
import Scanner from "./Scanner";
import { HashRouter, BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Router } from '../lib/electron-router-dom'


function App() {
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Scanner/>}/>
        <Route path="/parser" element={<TreePage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App;
