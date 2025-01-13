import { Toolbar, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

const SellerNavBar = ({ title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };



    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <IconButton onClick={() => navigate('/seller-landing')} color="inherit" aria-label="home">
                <HomeIcon />
            </IconButton>
        
            <Divider orientation="vertical" flexItem style={{ margin: '0 16px' }} />
            
            <div style={{ flexGrow: 1 }}>
                <h1 style={{ margin: 0 }}>{title}</h1>
            </div>
            <Toolbar style={{ justifyContent: 'end' }}>
                <IconButton  edge="start" onClick={() => navigate("/landing")} color="inherit" aria-label="seller-landing">
                    <StoreIcon sx={{ color: 'whitesmoke' }} />
                </IconButton>
                <IconButton edge="inherit" color="inherit" aria-label="transactions" onClick={() => navigate('/transactions')}>
                    <ListAltIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="add product" onClick={() => navigate('/add-product')}>
                    <AddBoxIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="profile" onClick={() => navigate('/profile')}>
                    <AccountCircleIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="sign out" onClick={handleLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </div>
    );
};

export default SellerNavBar;
