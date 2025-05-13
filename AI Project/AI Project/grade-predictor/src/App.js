import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import FileUploadPage from './pages/FileUploadPage';
import DashboardPage from './pages/DashboardPage';
import CompareStudentsPage from './pages/CompareStudentsPage';
import { Container } from '@mui/material';

function AppLayout() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="upload" element={<FileUploadPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="compare" element={<CompareStudentsPage />} />
        <Route index element={<FileUploadPage />} /> {/* Default route */}
      </Route>
    </Routes>
  );
}

export default App;