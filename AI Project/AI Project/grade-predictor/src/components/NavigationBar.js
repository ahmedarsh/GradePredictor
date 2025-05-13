import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Performance Analysis
        </Typography>
        <Button color="inherit" startIcon={<CloudUploadIcon />} component={Link} to="/upload">
          Upload Files
        </Button>
        <Button color="inherit" startIcon={<DashboardIcon />} component={Link} to="/dashboard">
          View Dashboards
        </Button>
        <Button color="inherit" startIcon={<CompareArrowsIcon />} component={Link} to="/compare">
          Compare Students
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;