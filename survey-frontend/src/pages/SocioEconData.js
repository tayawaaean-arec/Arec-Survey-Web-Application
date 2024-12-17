import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
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
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
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
  const [openDialog, setOpenDialog] = useState(false);
  const [filename, setFilename] = useState("survey_data");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSignOut = () => navigate('/login');
  const handleItemClick = (index) => setSelectedIndex(index);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleFilenameChange = (event) => setFilename(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

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
          console.log(`Number of surveys: ${formattedData.length}`);
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
  const headers = [
    "id", 
    "interviewer", 
    "date", 
    "startTime", 
    "endTime", 
    "solarSystem", 
    "yearInstalled", 
    "longitude", 
    "latitude", 
    "province", 
    "municipality", 
    "barangay", 
    "beneficiary.name",
    "beneficiary.age",
    "beneficiary.sex",
    "beneficiary.maritalStatus",
    "beneficiary.contactNo",
    "beneficiary.education",
    "beneficiary.occupation",
    "intervieweeName",
    ...Object.keys(allFlattenedRecords[0] || {}).filter(key => 
      key !== "id" && 
      key !== "interviewer" && 
      key !== "date" && 
      key !== "startTime" && 
      key !== "endTime" && 
      key !== "solarSystem" && 
      key !== "yearInstalled" && 
      key !== "longitude" && 
      key !== "latitude" && 
      key !== "province" && 
      key !== "municipality" && 
      key !== "barangay" &&
      key !== "beneficiary.name" &&
      key !== "beneficiary.age" &&
      key !== "beneficiary.sex" &&
      key !== "beneficiary.maritalStatus" &&
      key !== "beneficiary.contactNo" &&
      key !== "beneficiary.education" &&
      key !== "beneficiary.occupation" &&
      key !== "intervieweeName"
    )
  ];

  useEffect(() => {
    setFilteredData(
      allFlattenedRecords.filter(record =>
        headers.some(header =>
          record[header]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }, [searchQuery, allFlattenedRecords]);

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(allFlattenedRecords); // Convert data to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Data"); // Append the sheet to the workbook
    XLSX.writeFile(workbook, `${filename}.xlsx`); // Write the file with the specified filename
    handleDialogClose();
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Lato, sans-serif' }}>Socio-Economic Survey Data</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

          </Box>
        </Box>

        {/* Survey Data Section with added border, shadow, and elevation */}
        <Card 
          sx={{ 
            p: 3, 
            maxWidth: '2500px', 
            margin: '0 auto', 
            bgcolor: 'white', 
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Export Button */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleDialogOpen}
                  sx={{ fontFamily: 'Roboto, sans-serif', marginRight: 2 }}
                >
                  Export to Excel
                </Button>
                {/* Add Filter Button here if needed */}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ fontFamily: 'Roboto, sans-serif', marginLeft: 2 }}
                />
              </Box>
            </Box>

            {/* Dialog for setting filename */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>Export to Excel</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the filename for the exported Excel file.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Filename"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={filename}
                  onChange={handleFilenameChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={exportToExcel}>Export</Button>
              </DialogActions>
            </Dialog>

            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
                  <TableHead sx={{ bgcolor: '#000066ff' }}>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableCell key={index} sx={{ color: '#FBFBFBff', fontWeight: 'bold', border: '1px solid #ddd', fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((record, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        sx={{
                          '&:nth-of-type(even)': { bgcolor: '#f2f2f2' },
                          '&:nth-of-type(odd)': { bgcolor: '#ffffff' },
                          '&:hover': { bgcolor: '#e0e0e0', cursor: 'pointer' }, // Row highlighting on hover
                        }}
                      >
                        {headers.map((header, colIndex) => (
                          <TableCell key={colIndex} sx={{ color: 'black', border: '1px solid #ddd', fontFamily: 'Roboto, sans-serif', textAlign: 'center', padding: '8px' }}>
                            {record[header] || 'N/A'}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SocioEcon;
