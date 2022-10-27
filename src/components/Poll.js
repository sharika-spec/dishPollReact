import * as React from "react";
import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function Poll({
  rankIndex,
  dishes,
  setTemp,
  value,
  setValue,
  ids
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
    setTemp(dishes[event.target.value - 1].dishName);
  };


  return (
    <FormControl>
      <Typography component={'div'}>
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
            {dishes.map((item) => (
              <Grid item key={item.id} xs={6} md={4}>
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={item.dishName}
                  disabled={ids.has(String(item.id))}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </RadioGroup>
    </FormControl>
  );
}
