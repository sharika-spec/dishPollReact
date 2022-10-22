import Box from "@mui/material/Box";
import "./App.css";
import Tab from "./components/Tab.js";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} m={1}>
          <p>Dish Poll</p>
        </Box>
        <Tab />
      {/* </header> */}
    </div>
  );
}

export default App;
