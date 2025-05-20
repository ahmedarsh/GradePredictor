// src/components/PerformanceGrid.js
import { Grid } from "@mui/material";
import SubjectScoreCard from "./SubjectScoreCard";

export default function PerformanceGrid({ performance }) {
  // Ensure the subjects array matches the data structure in your performance object
  const subjects = ["overall", "math", "portuguese"];
  return (
    <Grid container spacing={3}>
      {subjects.map((subject) => (
        <Grid item xs={12} md={4} key={subject}>
          <SubjectScoreCard subject={subject} data={performance[subject]} />
        </Grid>
      ))}
    </Grid>
  );
}