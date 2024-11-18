import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Charts = ({ pieData, lineData, barData, areaData }) => (
  <Grid container spacing={3}>
    {/* Pie Chart */}
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#3498db' }}>Pie Chart</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#3498db">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#3498db', '#2ecc71', '#f39c12', '#9b59b6'][index % 4]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Line Chart */}
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#2ecc71' }}>Line Chart</Typography>
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

    {/* Bar Chart */}
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#f39c12' }}>Bar Chart</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#f39c12" />
              <Bar dataKey="pv" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>

    {/* Area Chart */}
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#9b59b6' }}>Area Chart</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default Charts;
