import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';
import DashboardMainContent from '../components/DashboardMainContent';

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
    <Box component="main" sx={{ flexGrow: 1, px: 4, backgroundColor: '#f9f9f9' }}>

      {/* Sidebar */}

      <Drawer
  variant="permanent"
  sx={{
    width: 200,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
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
      <Box component="main" sx={{ flexGrow: 1, px: 4 }}>
        {currentAnalysis ? (
          <DashboardMainContent performance={currentAnalysis} filename={selectedFile} />
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
