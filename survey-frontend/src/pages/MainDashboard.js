import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Charts from '../components/Chart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSignOut = () => navigate('/login');
  const handleItemClick = (index) => setSelectedIndex(index);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Example data for the charts
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const lineData = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
  ];

  const barData = [
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 },
  ];

  const areaData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  ];

  // Sample activity data
  const activityData = [
    { date: '2024-11-18', name: 'John Doe', activity: 'Logged in', id: 1 },
    { date: '2024-11-17', name: 'Jane Smith', activity: 'Updated profile', id: 2 },
    { date: '2024-11-16', name: 'Carlos Ramos', activity: 'Created a new report', id: 3 },
  ];

  // Delete activity
  const handleDeleteActivity = (id) => {
    const updatedActivities = activityData.filter(item => item.id !== id);
    // In a real app, you would update the state to reflect the deletion
    console.log("Activity deleted:", updatedActivities);
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
        {/* Welcome Message */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Hi, Welcome back</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, marginRight: 2 }} />
            <Typography variant="body1">Username</Typography>
          </Box>
        </Box>

        {/* Info Cards Section */}
        <Grid container spacing={3} mb={4}>
          {/* Total Users Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#3498db', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,240</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Sessions Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#2ecc71', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Active Sessions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>350</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Completed Tasks Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#f39c12', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Completed Tasks</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,780</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Approvals Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e74c3c', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">Pending Approvals</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>12</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Activity Table and Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {/* Activity Table */}
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Activity</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Activity</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activityData.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>{activity.date}</TableCell>
                          <TableCell>{activity.name}</TableCell>
                          <TableCell>{activity.activity}</TableCell>
                          <TableCell align="center">
                            <IconButton sx={{ color: '#e74c3c' }} onClick={() => handleDeleteActivity(activity.id)}>
                              <Delete sx={{ fontSize: 20 }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            {/* Charts */}
            <Charts pieData={pieData} lineData={lineData} barData={barData} areaData={areaData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
