import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper, Grid, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DashboardComponent from '../components/Dashboard'; // Your actual Dashboard visualization component

const DashboardPage = () => {
  const location = useLocation();
  const backendResponse = location.state?.analysisResults || {};
  const initiatedAnalyses = backendResponse?.initiated || [];
  const analysisResultsMap = initiatedAnalyses.reduce((acc, item) => {
    acc[item.filename] = item.result;
    return acc;
  }, {});
  const filenames = Object.keys(analysisResultsMap);
  const [selectedFile, setSelectedFile] = useState(filenames[0] || null);
  const [currentAnalysis, setCurrentAnalysis] = useState(analysisResultsMap[selectedFile] || null);

  useEffect(() => {
    setCurrentAnalysis(analysisResultsMap[selectedFile] || null);
  }, [selectedFile, analysisResultsMap]);

  const handleFileSelect = (filename) => {
    setSelectedFile(filename);
  };

  if (filenames.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No analysis results available.</Typography>
        <Typography variant="body2">Please upload files on the Upload Files page.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Select Report
          </Typography>
          <List>
            {filenames.map((filename) => (
              <ListItem key={filename} disablePadding>
                <ListItemButton
                  selected={selectedFile === filename}
                  onClick={() => handleFileSelect(filename)}
                >
                  <ListItemText primary={filename} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analysis Results
        </Typography>

        {currentAnalysis ? (
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6">
                Report for: <Typography component="span" sx={{ fontWeight: 'bold' }}>{selectedFile}</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Predicted Final Grade: {currentAnalysis?.overall?.score || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Sentiment Score: {currentAnalysis?.sentiment?.sentiment || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Final Score: {currentAnalysis?.sentiment?.final_score || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Total Grammar Errors: {currentAnalysis?.sentiment?.num_grammar_errors || 'N/A'}
              </Typography>
            </Grid>
            {currentAnalysis && (
              <Grid item xs={12}>
                <DashboardComponent performance={currentAnalysis} filename={selectedFile} />
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography variant="subtitle1">
            No report selected. Please choose a file from the sidebar.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;