import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import FileUpload from '../components/FileUpload';

function FileUploadPage() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload PDF Files
      </Typography>
      <Typography paragraph>
        This is a placeholder for the file upload functionality.
        In a real application, you would implement the UI elements for selecting and uploading PDF files here.
      </Typography>
        <FileUpload/>
      
    </Paper>
  );
}

export default FileUploadPage;


