import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

import {api} from '@/lib/api-client';

export const RegisterForm = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    gamename: '',
    tagline: '',
    segaID: '',
    segaPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
      api.post(`/register`, formData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          User Registration
        </Typography>

        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <Box sx={{display: 'flex'}}>
          <TextField
            label="Game Name"
            name="gamename"
            value={formData.gamename}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            sx={{marginRight: 2}}
          />

          <TextField
            label="Tag Line"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <TextField
          label="Sega ID"
          name="segaID"
          value={formData.segaID}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Sega Password"
          name="segaPassword"
          type="password"
          value={formData.segaPassword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};
