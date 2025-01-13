import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Local Buy
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
            Register
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>
            Contact
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/help" style={{ color: '#fff', textDecoration: 'none' }}>
            Help
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
