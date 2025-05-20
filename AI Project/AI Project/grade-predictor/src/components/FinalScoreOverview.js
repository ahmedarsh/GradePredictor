import { Card, CardContent, Typography, Grid, LinearProgress, Box } from "@mui/material";

export default function FinalScoreOverview({ performance }) {
  const finalScore = performance.sentiment?.final_score || 0;
  const math = performance.math?.score || 0;
  const portuguese = performance.portuguese?.score || 0;
  const academicAvg = (math + portuguese) / 2;
  const sentiment = performance.sentiment?.sentiment || 0;
  const grammarErrors = performance.sentiment?.num_grammar_errors || 0;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🧮 Final Score Overview
        </Typography>
        <Typography variant="h3" color="primary">
          {finalScore.toFixed(2)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Aggregated from academic and essay performance
        </Typography>

        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Math Score: {math}</Typography>
              <Typography variant="body1">Portuguese Score: {portuguese}</Typography>
              <Typography variant="body1">Academic Avg: {academicAvg.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Essay Sentiment: {sentiment}</Typography>
              <Typography variant="body1">Grammar Errors: {grammarErrors}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Typography variant="body2">Final Score Progress</Typography>
          <LinearProgress variant="determinate" value={(finalScore / 20) * 100} />
        </Box>
      </CardContent>
    </Card>
  );
}
