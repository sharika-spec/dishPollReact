import * as React from "react";
import Dishes from "../db.json";
import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormLabel,
} from "@mui/material";

export default function Poll({rankIndex,selectedValue , setSelectedValue ,value ,setValue}) {


  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedValue(Dishes[event.target.value-1].dishName);
    // setSelectedValue(Dishes[event.target.value-1]);
  };

  // const handleSubmit = (event) => {
  //   console.log(Dishes[value-1]);
  // };
  
  return (
    <FormControl>
      {/* <FormLabel id="demo-controlled-radio-buttons-group">Rank</FormLabel> */}
      {/* <div></div> */}
      <Typography variant="h5" component="h2">
        Which dish you would like to Rank {rankIndex}?
      </Typography>

      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <Box sx={{ flexWrap: "wrap" }} m={2}>
          <Grid container>
            {Dishes.map((item) => (
              <Grid item key={item.id} xs={6} md={4}>
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={item.dishName}
                  // disabled={ selectedValue.id === item.id ? true : false }
                />
              </Grid>
            ))}
            {/* <Button
              onClick={handleSubmit}
            >
              Submit
            </Button> */}
          </Grid>
        </Box>
      </RadioGroup>
    </FormControl>
  );
}
