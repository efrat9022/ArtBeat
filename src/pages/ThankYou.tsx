// src/pages/ThankYou.tsx

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>תודה על הרכישה!</Typography>
      <Typography>ההזמנה התקבלה בהצלחה</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>
        חזרה לעמוד הבית
      </Button>
    </Box>
  );
};

export default ThankYou;
