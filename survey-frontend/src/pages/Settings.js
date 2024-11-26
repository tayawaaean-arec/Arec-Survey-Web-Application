import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField, // Import TextField for form inputs
  Snackbar, // Import Snackbar
  Alert, // Import Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState({
    totalRespondents: localStorage.getItem('totalRespondents') || '', // Retrieve total respondents from local storage
  });
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

  const handleSignOut = () => navigate('/login');
  const handleItemClick = (index) => setSelectedIndex(index);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    localStorage.setItem('totalRespondents', formData.totalRespondents); // Save total respondents to local storage
    setOpenSnackbar(true); // Open Snackbar
    // Add additional form submission logic here
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close Snackbar
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        selectedIndex={selectedIndex}
        handleItemClick={handleItemClick}
        toggleSidebar={toggleSidebar}
        handleSignOut={handleSignOut}
      />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#ecf0f1', p: 3, height: '100vh', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Lato, sans-serif' }}>Settings</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

          </Box>
        </Box>

        {/* Form Section */}
        <Box 
          sx={{ 
            p: 3, 
            maxWidth: '600px', 
            margin: '0 auto', 
            bgcolor: '#FBFBFBff', 
            borderRadius: 2, 
            boxShadow: 3, 
            border: '1px solid #ddd', 
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Lato, sans-serif', color: 'black' }}>Set Total Respondents</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Total Respondents"
              name="totalRespondents"
              value={formData.totalRespondents}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ fontFamily: 'Roboto, sans-serif' }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Total Respondents saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
