import Box from "@mui/material/Box";
import "./App.css";
import Tab from "./components/Tab.js";
import Login from "./containers/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={   <Login />} />
          <Route path="/poll" element={ <Tab />} />
      </Routes> 
    </div>
  );
}

export default App;
