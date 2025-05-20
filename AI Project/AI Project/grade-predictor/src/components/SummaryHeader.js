// src/components/SummaryHeader.js
import { Box, Typography, LinearProgress, Stack, useTheme } from "@mui/material";

export default function SummaryHeader({ filename, performance }) {
  const theme = useTheme();

  // Extract final_score from performance.sentiment
  const finalScore = performance.sentiment?.final_score || 0;
  const maxEssayScore = 100; // Assuming the final essay score is now out of 100
  const finalScoreProgressBarValue = (finalScore / maxEssayScore) * 100;

  // Logic to determine color and qualitative label for the final score
  const getScoreStatus = (value) => {
    if (value >= 75) {
      return { color: theme.palette.success.main, label: 'Excellent' };
    } else if (value >= 60) {
      return { color: theme.palette.warning.main, label: 'Good' }; // Changed from 'Average' to 'Good' for essay context
    } else {
      return { color: theme.palette.error.main, label: 'Needs Improvement' };
    }
  };

  const { color: scoreColor, label: scoreLabel } = getScoreStatus(finalScore);

  return (
    <Stack spacing={2} mb={4}>
      {/* Dashboard Main Title - Can be centralized or kept here */}
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
      Projected Performance Dashboard
      </Typography>

      {/* Report Filename */}
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Report for: {filename}
      </Typography>

      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}> {/* Center the score section */}
        <Typography variant="h5" gutterBottom>Projected Overall Score</Typography> {/* More specific title */}
        <Typography variant="h3" sx={{ color: scoreColor, fontWeight: 'bold' }}>
          {finalScore.toFixed(2)}<Typography component="span" variant="h6" color="text.secondary"> / {maxEssayScore}</Typography>
        </Typography>

        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={finalScoreProgressBarValue}
            sx={{
              height: 10, // Slightly thicker progress bar
              borderRadius: 5,
              '& .MuiLinearProgress-bar': {
                backgroundColor: scoreColor, // Use dynamic color
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" mt={1}>
            {scoreLabel}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}