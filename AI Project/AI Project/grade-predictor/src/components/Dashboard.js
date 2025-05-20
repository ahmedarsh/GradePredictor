import { Typography, Grid, Box } from "@mui/material";
import { ImpactChart } from "./ImpactChart";
import SubjectScore from "./SubjectScore";
import { FeatureChart } from "./FeatureChart";
export default function Dashboard({ performance }) {
  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Typography variant="h4" gutterBottom>
        🎓 Student Performance Overview
      </Typography>

      <Grid container spacing={3}>
        {["overall", "math", "portuguese"].map((key) => (
          <Grid item xs={12} md={4} key={key}>
            <SubjectScore
              subject={key.charAt(0).toUpperCase() + key.slice(1)}
              data={performance[key]}
            />
          </Grid>
        ))}

        {["overall", "math", "portuguese"].map((key) => (
          <Grid item xs={12} key={`${key}-chart`}>
            <ImpactChart
              title={`${
                key.charAt(0).toUpperCase() + key.slice(1)
              } Performance`}
              features={performance[key].top_features.features}
              impacts={performance[key].top_features.impacts}
            />
          </Grid>
        ))}
      </Grid>
    </Box>

    // <div className="max-w-3xl mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-6">
    //     📊 Student Performance Dashboard
    //   </h1>
    //   <SubjectScore subject="Overall" score={performance.overall.score} />
    //   <SubjectScore subject="Math" score={performance.math.score} />
    //   <SubjectScore subject="Portuguese" score={performance.portuguese.score} />

    //   <FeatureChart
    //     title="Math"
    //     features={performance.math.top_features.features}
    //     impacts={performance.math.top_features.impacts}
    //   />
    //   <FeatureChart
    //     title="Portuguese"
    //     features={performance.portuguese.top_features.features}
    //     impacts={performance.portuguese.top_features.impacts}
    //   />
    //   <FeatureChart
    //     title="Overall"
    //     features={performance.overall.top_features.features}
    //     impacts={performance.overall.top_features.impacts}
    //   />
    // </div>
  );
}
