import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import {  Logout, Info } from '@mui/icons-material';
import Groups2Icon from '@mui/icons-material/Groups2';
import SolarPowerIcon from '@mui/icons-material/SolarPower'; // Updated import
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings'; // Add import for Settings icon
import { useNavigate } from 'react-router-dom';
import ARECLOGO from '../icons/AREC.png';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';

const Sidebar = ({ sidebarOpen, selectedIndex, handleItemClick, toggleSidebar, handleSignOut }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, index) => {
    handleItemClick(index);
    navigate(path);
  };

  return (
    <Drawer
      sx={{
        width: sidebarOpen ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 60,
          boxSizing: 'border-box',
          backgroundColor: '#000066ff',
          color: 'white',
          transition: 'width 0.3s',
        },
      }}
      variant={sidebarOpen ? "permanent" : "temporary"}
      anchor="left"
      open={sidebarOpen}
      onClose={toggleSidebar}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={ARECLOGO} alt="Logo" style={{ width: 50, height: 50, marginRight: 10, display: sidebarOpen ? 'block' : 'none' }} />
          <Typography variant="h6" sx={{ color: '#ecf0f1', fontWeight: 'bold', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', letterSpacing: 1 }}>
            AREC SRVA
          </Typography>
        </Box>
      </Box>

      <Divider />

      <List>
        <ListItem button selected={selectedIndex === 0} onClick={() => handleNavigation('/dashboard', 0)} sx={{ '&:hover': { backgroundColor: '#3b5998' }, padding: 2 }}>
          <DashboardIcon sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} /> {/* Updated icon */}
          <ListItemText primary="Dashboard" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 1} onClick={() => handleNavigation('/socio-econ', 1)} sx={{ '&:hover': { backgroundColor: '#3b5998' }, padding: 2 }}>
          <Groups2Icon sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} /> {/* Updated icon */}
          <ListItemText primary="Socio-Econ Datas" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 2} onClick={() => handleNavigation('/technical', 2)} sx={{ '&:hover': { backgroundColor: '#3b5998' }, padding: 2 }}>
          <SolarPowerIcon sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} /> {/* Updated icon */}
          <ListItemText primary="Technical Datas" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 4} onClick={() => handleNavigation('/settings', 4)} sx={{ '&:hover': { backgroundColor: '#3b5998' }, padding: 2 }}>
          <SettingsIcon sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} />
          <ListItemText primary="Settings" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 3} onClick={() => handleNavigation('/about', 3)} sx={{ '&:hover': { backgroundColor: '#3b5998' }, padding: 2 }}>
          <Info sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} /> {/* Updated icon */}
          <ListItemText primary="About" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>

        <Divider sx={{ marginY: 2 }} />

        <ListItem button onClick={handleSignOut} sx={{ '&:hover': { backgroundColor: '#e74c3c' }, padding: 2 }}>
          <Logout sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Sign Out" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none', fontFamily: 'Lato, sans-serif', fontSize: '1rem' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
