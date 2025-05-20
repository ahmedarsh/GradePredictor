import { Grid, Typography } from "@mui/material";
import { ImpactChart } from "./ImpactChart";

export default function FeatureImpactSection({ performance }) {
  const subjects = ["overall", "math", "portuguese"];
  return (
    <>
      <Typography variant="h5" mt={5} mb={2}>
        🔍 Feature Impact Analysis
      </Typography>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} key={subject}>
            <ImpactChart
              title={subject.charAt(0).toUpperCase() + subject.slice(1)}
              features={performance[subject].top_features.features}
              impacts={performance[subject].top_features.impacts}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
