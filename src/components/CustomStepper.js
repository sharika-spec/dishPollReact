import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Poll from "./Poll.js";
import axios from "axios";
import OverallResults from "../overallResults.json";
import { useSnackbar } from "notistack";

const steps = ["Rank 1", "Rank 2", "Rank 3"];
const score = [30, 20, 10];

export default function CustomStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [rankedItems, setRankedItems] = React.useState(new Map());
  const [ids, setIds] = React.useState(new Map());
  const [dishes, setDishes] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setRankedItems(rankedItems.set(activeStep + 1, temp));

    setIds(ids.set(value, activeStep + 1));

    setValue("");
    if (activeStep + 1 === steps.length) {
      enqueueSnackbar("Click on results", {
        variant: "success",
        autoHideDuration: 1000,
      });
      saveRankDetails();
    }
  };

  const saveRankDetails = () => {
    const userRankList = [];
    function createData(id, rankNumber, dishName, score) {
      return { id, rankNumber, dishName, score };
    }

    for (let i = 1; i <= steps.length; i++) {
      userRankList.push(
        createData(ids[i - 1], i, rankedItems.get(i), score[i - 1])
      );
    }

    const userPollDetails = [{ userId: 1, rankList: userRankList }];
    window.localStorage.setItem("UserPoll", JSON.stringify(userPollDetails));

    const newOverallResults = getOverallResults();

    if (newOverallResults) {
      for (let i = 0; i < newOverallResults.length; i++) {
        if (ids.has(String(newOverallResults[i].id))) {
          const key = newOverallResults[i].id;
          const prevScore = newOverallResults[i].score;
          const rank = ids.get(String(key));
          newOverallResults[i].score = prevScore + score[rank - 1];
        }
        newOverallResults.sort((a, b) => b.score - a.score);
        window.localStorage.setItem(
          "OverallResults",
          JSON.stringify(newOverallResults)
        );
      }
    }
  };
  const getOverallResults = () => {
    return JSON.parse(window.localStorage.getItem("OverallResults"));
  };
  React.useEffect(() => {
    const callAPI = async () => {
      const dishesResponse = await performAPICall();
      setDishes(dishesResponse);
      if (!getOverallResults()) {
        window.localStorage.setItem(
          "OverallResults",
          JSON.stringify(OverallResults)
        );
      }
    };

    callAPI();
  }, []);

  const performAPICall = async () => {
    try {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography component={"div"} sx={{ mt: 2, mb: 1 }}>
            You have successfully submitted your votes.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography component={"div"} sx={{ mt: 2, mb: 1 }}>
            <Poll
              rankIndex={activeStep + 1}
              dishes={dishes}
              setTemp={setTemp}
              value={value}
              setValue={setValue}
              ids={ids}
            />
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} disabled={value === ""}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
