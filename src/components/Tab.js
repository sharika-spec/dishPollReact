import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Poll from "./Poll.js";
import Grid from "@mui/material/Grid";
import  Stepper  from "./PollStepper.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        aria-label="basic tabs example"
      >
        <Tab label="Poll" {...a11yProps(0)} />
        <Tab label="Results" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <Box sx={{ flexGrow: 1 }}> */}
          {/* <Grid container spacing={2}> */}
            <Stepper/>
            {/* <Poll /> */}
          {/* </Grid> */}
        {/* </Box> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Results
      </TabPanel>
    </Box>
  );
}
