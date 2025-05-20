import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

export default function SubjectScoreCard({ subject, data }) {
  const getLabel = (score) =>
    score >= 75 ? "Excellent" : score >= 60 ? "Average" : "Needs Improvement";

  const getColor = (score) =>
    score >= 75 ? "success" : score >= 60 ? "warning" : "error";

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{subject.toUpperCase()}</Typography>
        <Typography variant="h4" color={getColor(data.score)}>
          {data.score}
        </Typography>
        <Typography variant="body2">{getLabel(data.score)}</Typography>
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={data.score}
            color={getColor(data.score)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
