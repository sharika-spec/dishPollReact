import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function Results({ userId }) {
  const [rows, setRows] = React.useState([]);
  const [overallResults, setOverallResultsArray] = React.useState([]);
  React.useEffect(() => {
    const userPollArray = JSON.parse(window.localStorage.getItem("UserPoll"));
    if (userPollArray[userId-1]) {
      setRows(userPollArray[userId-1].rankList);
    }
    const overallResultsArray = JSON.parse(
      window.localStorage.getItem("OverallResults")
    );
    if (overallResultsArray) setOverallResultsArray(overallResultsArray);
  }, [userId]);

  return (
    <Box>
      <div>User poll results</div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Dish Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.rankNumber}
                  </TableCell>
                  <TableCell>{row.dishName}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <div>Please rank your favourites</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div>Overall results</div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dish Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overallResults &&
              overallResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.dishName}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
