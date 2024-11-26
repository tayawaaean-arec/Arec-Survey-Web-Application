import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/700.css';

const About = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSignOut = () => {}; // Adjust if you want to implement sign-out functionality
  const handleItemClick = (index) => setSelectedIndex(index);

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
        {/* Welcome Message */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'IBM Plex Sans, sans-serif' }}>
            About Us
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, marginRight: 2 }} />
            <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif' }}>Our Team</Typography>
          </Box>
        </Box>

        {/* Mission, Vision, and Achievements */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#3498db', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Our Mission</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}>
                  To create impactful solutions that empower individuals and communities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#f39c12', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Our Vision</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}>
                  A world where technology drives positive change and sustainable growth.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#2ecc71', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Our Achievements</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}>
                  Reached over 10,000 customers globally and partnered with leading organizations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Team Introduction */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'left', 
                    fontFamily: 'IBM Plex Sans, sans-serif', 
                    color: 'gray', 
                    fontWeight: 'bold', 
                    mb: 2, 
                    borderBottom: '2px solid black', 
                    pb: 1 
                  }}
                >
                  Meet Our Team
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ fontFamily: 'Roboto, sans-serif', color: 'black' }}
                >
                  Our team comprises talented individuals from diverse backgrounds who share a common passion for innovation and excellence. Together, we strive to deliver the best experiences to our users.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
