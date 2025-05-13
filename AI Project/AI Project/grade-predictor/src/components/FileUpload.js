import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FileUploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null); // To store the full analysis results
  const navigate = useNavigate(); // Initialize useNavigate

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setUploadStatus(null);
    setAnalysisResults(null); // Clear previous results
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus({ type: 'error', message: 'Please select at least one file to upload.' });
      return;
    }

    setUploadStatus({ type: 'info', message: 'Uploading files...' });
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:3001/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Files uploaded successfully. Analysis results:', data);
        setUploadStatus({ type: 'success', message: 'Files uploaded and analysis complete.' });
        setAnalysisResults(data); // Store the full analysis results
        setSelectedFiles([]); // Clear selected files after successful upload

        // Navigate to the dashboard with the analysis results
        navigate('/dashboard', { state: { analysisResults: data } });
      } else {
        const errorData = await response.json();
        console.error('File upload failed:', errorData);
        setUploadStatus({ type: 'error', message: `File upload failed: ${errorData?.message || 'An error occurred.'}` });
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setUploadStatus({ type: 'error', message: 'An unexpected error occurred during file upload.' });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    multiple: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          p: 8,
          textAlign: 'center',
          border: '4px dashed grey',
          borderRadius: 3,
          cursor: 'pointer',
          width: '80%',
          maxWidth: 800,
          backgroundColor: isDragActive ? '#e0f7fa' : '#fafafa',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h4" gutterBottom>
          {isDragActive ? 'Drop the PDF files here...' : 'Drag and drop PDF files here, or click to select'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          You can upload multiple PDF files.
        </Typography>
      </Paper>

      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2, width: '80%', maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom>
            Selected Files:
          </Typography>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <Typography variant="body1">{file.name}</Typography>
              </li>
            ))}
          </ul>
          <Button variant="contained" color="primary" onClick={handleUpload} size="large" sx={{ mt: 2 }}>
            Upload and Analyze All
          </Button>
        </Box>
      )}

      {uploadStatus && (
        <Typography
          variant="subtitle2"
          color={uploadStatus.type === 'error' ? 'error' : uploadStatus.type === 'success' ? 'success' : 'info'}
          sx={{ mt: 2 }}
        >
          {uploadStatus.message}
        </Typography>
      )}

      {analysisResults && uploadStatus?.type === 'success' && (
        <Box sx={{ mt: 3, width: '80%', maxWidth: 800 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Results:
          </Typography>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre> {/* Display results for now */}
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            You have been redirected to the dashboard to view the detailed analysis.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadPage;