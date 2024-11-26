import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Charts from '../components/Chart';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/700.css';
import { getDatabase, ref, get } from "firebase/database";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSignOut = () => navigate('/login');
  const handleItemClick = (index) => setSelectedIndex(index);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [completedSurveys, setCompletedSurveys] = useState(0);
  const [totalSurveys, setTotalSurveys] = useState(localStorage.getItem('totalRespondents') || 1930); // Read total respondents from local storage
  const [pieData, setPieData] = useState([
    { name: 'Not yet Interviewed', value: totalSurveys },
    { name: 'Completed Interviews', value: 0 },
  ]);

  const lineData = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
  ];

  const [activityData, setActivityData] = useState([]);

  // Delete activity
  const handleDeleteActivity = (id) => {
    const updatedActivities = activityData.filter(item => item.id !== id);
    console.log("Activity deleted:", updatedActivities);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchSurveyData = async () => {
      const db = getDatabase(); // Initialize the database
      const dbRef = ref(db, 'surveys'); // Reference the "surveys" node
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          // Transform data into an array of records with flattened fields
          const formattedData = Object.keys(rawData).map((id) => ({
            id,
            date: rawData[id].date,
            interviewer: rawData[id].interviewer,
            startTime: rawData[id].startTime,
            province: rawData[id].province,
            barangay: rawData[id].barangay,
          }));
          console.log(`Number of surveys: ${formattedData.length}`);
          setCompletedSurveys(formattedData.length);
          setPieData([
            { name: 'Not yet Interviewed', value: totalSurveys - formattedData.length },
            { name: 'Completed Interviews', value: formattedData.length },
          ]);
          setActivityData(formattedData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSurveyData();
  }, [totalSurveys]);

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
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'IBM Plex Sans, sans-serif' }}>Hi, Welcome back</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          </Box>
        </Box>

        {/* Info Cards Section */}
        <Grid container spacing={3} mb={4}>
          {/* Total Respondents Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#3498db', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Total Respondents</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>{totalSurveys}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Interviews Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#f39c12', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Not yet Interviewed</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>{totalSurveys - completedSurveys}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Completed Interviews Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#2ecc71', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Completed Interviews</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>{completedSurveys}</Typography>
              </CardContent>
            </Card>
          </Grid>

          
        </Grid>

        {/* Activity Table and Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* Activity Table */}
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
                  Activity
                </Typography>
                <TableContainer sx={{ height: 450 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px' }}>Interview Time</TableCell>
                        <TableCell sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px' }}>Date</TableCell>
                        <TableCell sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px' }}>Province</TableCell>
                        <TableCell sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px' }}>Barangay</TableCell>
                        <TableCell sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', padding: '10px' }}>Interviewer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activityData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, index) => (
                        <TableRow 
                          key={activity.id} 
                          sx={{ 
                            bgcolor: index % 2 === 0 ? '#f9f9f9' : 'white', 
                            '&:hover': { bgcolor: '#f1f1f1' } 
                          }}
                        >
                          <TableCell sx={{ fontFamily: 'Roboto, sans-serif', padding: '10px' }}>{activity.startTime}</TableCell>
                          <TableCell sx={{ fontFamily: 'Roboto, sans-serif', padding: '10px' }}>{activity.date}</TableCell>
                          <TableCell sx={{ fontFamily: 'Roboto, sans-serif', padding: '10px' }}>{activity.province}</TableCell>
                          <TableCell sx={{ fontFamily: 'Roboto, sans-serif', padding: '10px' }}>{activity.barangay}</TableCell>
                          <TableCell sx={{ fontFamily: 'Roboto, sans-serif', padding: '10px' }}>{activity.interviewer}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[8]}
                  component="div"
                  count={activityData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Charts */}
            <Charts pieData={pieData} lineData={lineData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
