import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig'; // Import Firebase auth and firestore

function CreateAccountPage() {
  const navigate = useNavigate(); // Initialize navigate function

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(''); // 'success', 'error', 'warning', 'info'

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      setAlertSeverity('error');
      return;
    }

    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the newly created user's UID
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        createdAt: new Date(),
      });

      // Show success message
      setAlertMessage("Account successfully created!");
      setAlertSeverity('success');

      // After successful registration, navigate to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait for 2 seconds before redirecting

    } catch (error) {
      console.error("Error creating user: ", error);
      setAlertMessage(error.message);
      setAlertSeverity('error');
    }
  };

  // Add a console log to verify if the alert state is being set
  console.log(alertMessage, alertSeverity);

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side (Logo/Illustration) */}
      <Grid item xs={false} sm={6} sx={{ backgroundColor: '#f5f7fa', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
        <img
          src="./AREC3.png" // Replace with the path of your image
          alt="Create Account Illustration"
          className="create-account-image"
          style={{ maxWidth: '85%', height: 'auto' }}
        />
      </Grid>

      {/* Right Side (Form) */}
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 3 }}>
        <Paper elevation={4} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#000082ff', fontWeight: 'bold' }}>
            Create a New Account
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom sx={{ marginBottom: 3 }}>
            Please fill in the details below to create a new account
          </Typography>

          {/* Show alert message */}
          {alertMessage && (
            <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}> {/* Bind form to handleSubmit */}
            <TextField
              label="Full Name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#000082ff' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000082ff' } }
              }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#000082ff' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000082ff' } }
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiInputLabel-root': { color: '#000082ff' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000082ff' } }
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{
                '& .MuiInputLabel-root': { color: '#000082ff' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000082ff' } }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000082ff',
                color: 'white',
                '&:hover': { backgroundColor: '#0082C8' },
                padding: 1.5,
                marginTop: 2,
                borderRadius: 2,
              }}
            >
              Create Account
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2">
              Already have an account? <a href="/login" style={{ color: '#000082ff', textDecoration: 'none' }}>Sign in</a>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreateAccountPage;
