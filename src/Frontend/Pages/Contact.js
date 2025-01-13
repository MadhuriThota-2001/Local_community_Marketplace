import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

export default function Contact() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <TextField fullWidth label="Your Name" margin="normal" />
      <TextField fullWidth label="Your Email" margin="normal" />
      <TextField fullWidth label="Message" multiline rows={4} margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Send Message
      </Button>
    </Container>
  );
}
