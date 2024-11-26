import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ pieData, lineData }) => (
  <Grid container spacing={3} direction="column">
    {/* Pie Chart */}
    <Grid item xs={12}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'left', 
              color: 'gray', 
              fontFamily: 'Roboto, sans-serif', 
              fontWeight: 'bold', 
              mb: 2 
            }}
          >
            Progress Pie Chart
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#3498db" label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#f39c12' : '#2ecc71'} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Line Chart */}
    <Grid item xs={12}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'left', 
              color: 'gray', 
              fontFamily: 'Roboto, sans-serif', 
              fontWeight: 'bold', 
              mb: 2 
            }}
          >
            Progress Line Chart
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#2ecc71" />
              <Line type="monotone" dataKey="pv" stroke="#3498db" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default Charts;
