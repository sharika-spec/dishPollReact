import Tab from "./components/Tab.js";
import Login from "./containers/Login";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLogged,setIsLogged] = useState(false);
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={   <Login isLogged={isLogged} setIsLogged={setIsLogged}/>} />
          <Route path="/poll" element={ <Tab/>} />
      </Routes> 
    </div>
  );
}

export default App;
