import { Card, CardContent, Typography, Grid, Box, LinearProgress, Chip } from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
export default function PersonalStatementSection({ performance }) {
  const sentiment = performance.sentiment?.sentiment || 0;
  const grammarErrors = performance.sentiment?.num_grammar_errors || 0;
  const finalScore = performance.sentiment?.final_score || 0;

  return (
<Card>
  <CardContent>
    <Typography variant="h6" gutterBottom>Essay Evaluation</Typography>

    <Chip label={`Sentiment: ${sentiment}`} icon={<SentimentSatisfiedIcon />} />
    <Chip label={`Grammar Errors: ${grammarErrors}`} color="error" />

  </CardContent>
</Card>

  );
}
