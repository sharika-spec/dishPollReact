import Box from "@mui/material/Box";
import "./App.css";
import Tab from "./components/Tab.js";
function App() {
  return (
    <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} m={1}>
          Dish Poll 
        </Box>
        <Tab />
    </div>
  );
}

export default App;
