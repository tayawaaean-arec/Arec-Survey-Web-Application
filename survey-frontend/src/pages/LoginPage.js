import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography, Grid, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig'; // Import Firebase auth
import googleLogo from '../icons/google.svg';

function LoginPage() {
  const navigate = useNavigate(); // Initialize navigate function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // If login is successful, navigate to the dashboard
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      console.error("Error logging in: ", error);
      setAlertMessage(error.message);
      setAlertSeverity('error');
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side (Logo/Illustration) */}
      <Grid item xs={false} sm={6} sx={{ backgroundColor: '#f5f7fa', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
        <img
          src="./AREC3.png" // Replace with the path of your image
          alt="Login Illustration"
          className="login-image"
          style={{ maxWidth: '85%', height: 'auto' }}
        />
      </Grid>

      {/* Right Side (Form) */}
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 3 }}>
        <Paper elevation={4} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#000082ff', fontWeight: 'bold' }}>
            Welcome to AREC Survey Result Visualization App!
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom sx={{ marginBottom: 3 }}>
            Please sign-in to your account and start the adventure
          </Typography>

          {/* Show alert message */}
          {alertMessage && (
            <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#000082ff' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#000082ff' } }
              }}
            />
            <FormControlLabel
              control={<Checkbox name="remember-me" />}
              label="Remember Me"
              sx={{ marginBottom: 2 }}
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
              Sign In
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant="body2">
              <a href="#" style={{ color: '#000082ff', textDecoration: 'none' }}>Forgot Password?</a>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              New on our platform? <a href="/create-account" style={{ color: '#000082ff', textDecoration: 'none' }}>Create an account</a>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button
              variant="outlined"
              startIcon={<img src={googleLogo} alt="Google logo" style={{ width: 20, height: 20 }} />}
              sx={{
                borderColor: '#000082ff',
                color: '#000082ff',
                '&:hover': { borderColor: 'black', color: 'black' },
                padding: '8px 16px',
                borderRadius: 2,
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
