import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import Sidebar from '../components/Sidebar';
import * as XLSX from 'xlsx'; // Import xlsx library

const SocioEcon = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [surveyData, setSurveyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = () => navigate('/login');
  const handleItemClick = (index) => setSelectedIndex(index);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
            ...rawData[id],
          }));
          setSurveyData(formattedData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  const flattenRecord = (record) => {
    const flattened = {};
    for (const key in record) {
      if (typeof record[key] === 'object' && !Array.isArray(record[key])) {
        const nested = flattenRecord(record[key]);
        for (const nestedKey in nested) {
          flattened[`${key}.${nestedKey}`] = nested[nestedKey];
        }
      } else if (Array.isArray(record[key])) {
        flattened[key] = record[key].join(', ');
      } else {
        flattened[key] = record[key];
      }
    }
    return flattened;
  };

  const allFlattenedRecords = surveyData.map((record) => flattenRecord(record));
  const headers = Object.keys(allFlattenedRecords[0] || {});

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(allFlattenedRecords); // Convert data to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Data"); // Append the sheet to the workbook
    XLSX.writeFile(workbook, "survey_data.xlsx"); // Write the file
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Hi, Welcome back</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32, marginRight: 2 }} />
            <Typography variant="body1" sx={{ fontFamily: 'Arial, sans-serif' }}>Username</Typography>
          </Box>
        </Box>

        {/* Survey Data Section with added border, shadow, and elevation */}
        <Box 
          sx={{ 
            p: 3, 
            maxWidth: '2500px', 
            margin: '0 auto', 
            bgcolor: '#f9f9f9', 
            borderRadius: 2, 
            boxShadow: 3, // Material-UI elevation
            border: '1px solid #ddd', // Border for the container
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Survey Data</Typography>

          {/* Export Button */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={exportToExcel}
            sx={{ mb: 3 }}
          >
            Export to Excel
          </Button>

          {isLoading ? (
            <Typography sx={{ fontFamily: 'Arial, sans-serif' }}>Loading data...</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                <TableHead sx={{ bgcolor: '#000082ff' }}>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableCell key={index} sx={{ color: '#ffffff', fontWeight: 'bold', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFlattenedRecords.map((record, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        '&:nth-of-type(even)': { bgcolor: '#f2f2f2' },
                        '&:nth-of-type(odd)': { bgcolor: '#ffffff' },
                        '&:hover': { bgcolor: '#e0e0e0', cursor: 'pointer' }, // Row highlighting on hover
                      }}
                    >
                      {headers.map((header, colIndex) => (
                        <TableCell key={colIndex} sx={{ color: '#000000', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>
                          {record[header] || 'N/A'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SocioEcon;
