import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Home, Settings, InsertChart, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
          backgroundColor: '#2c3e50',
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
        <Typography variant="h6" sx={{ color: '#ecf0f1', fontWeight: 'bold', display: sidebarOpen ? 'block' : 'none' }}>
          AREC SRVA
        </Typography>
      </Box>

      <Divider />

      <List>
        <ListItem button selected={selectedIndex === 0} onClick={() => handleNavigation('/dashboard', 0)} sx={{ '&:hover': { backgroundColor: '#34495e' }, padding: 2 }}>
          <Home sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} />
          <ListItemText primary="Dashboard" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 1} onClick={() => handleNavigation('/socio-econ', 1)} sx={{ '&:hover': { backgroundColor: '#34495e' }, padding: 2 }}>
          <InsertChart sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} />
          <ListItemText primary="Socio-Econ Datas" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 2} onClick={() => handleNavigation('/technical-datas', 2)} sx={{ '&:hover': { backgroundColor: '#34495e' }, padding: 2 }}>
          <InsertChart sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} />
          <ListItemText primary="Technical Datas" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none' }} />
        </ListItem>

        <ListItem button selected={selectedIndex === 3} onClick={() => handleNavigation('/settings', 3)} sx={{ '&:hover': { backgroundColor: '#34495e' }, padding: 2 }}>
          <Settings sx={{ color: 'white', marginRight: 2, display: sidebarOpen ? 'block' : 'none' }} />
          <ListItemText primary="Settings" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none' }} />
        </ListItem>

        <Divider sx={{ marginY: 2 }} />

        <ListItem button onClick={handleSignOut} sx={{ '&:hover': { backgroundColor: '#e74c3c' }, padding: 2 }}>
          <Logout sx={{ color: 'white', marginRight: 2 }} />
          <ListItemText primary="Sign Out" sx={{ color: 'white', display: sidebarOpen ? 'block' : 'none' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
