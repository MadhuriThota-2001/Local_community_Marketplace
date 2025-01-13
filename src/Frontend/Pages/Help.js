import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Help() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Typography variant="body1">
        If you have any questions or need assistance, please contact us via the Contact page.
      </Typography>
    </Container>
  );
}
