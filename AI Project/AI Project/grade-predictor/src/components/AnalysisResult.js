import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import Dashboard from '../Dashboard'; // Assuming Dashboard is in the components folder

const AnalysisResults = ({ predictedGrade, sentiment, extractedText }) => {
  return (
    <Grid>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Predicted Final Grade: {predictedGrade.overall ? predictedGrade.overall.score : 'N/A'}
      </Typography>
      {sentiment && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Sentiment Score: {sentiment}
        </Typography>
      )}

      {predictedGrade && <Dashboard performance={predictedGrade} />}

      {extractedText && (
        <Box sx={{ mt: 4, width: '100%', maxWidth: '500px' }}>
          <Typography variant="h6">Extracted Text:</Typography>
          <Paper sx={{ padding: '10px', whiteSpace: 'pre-wrap' }}>
            {extractedText}
          </Paper>
        </Box>
      )}
    </Grid>
  );
};

export default AnalysisResults;