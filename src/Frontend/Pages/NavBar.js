import { Toolbar, IconButton, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import appIcon from './Assets/appIcon.png'



const NavBar = ({ title, color = 'primary', category = 'CONSUMER' }) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/login');
    };
    
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color:{color} }}>
            <IconButton onClick={() => navigate('/landing')} color="inherit" aria-label="home">
                <HomeIcon />
            </IconButton>
        
            <Divider orientation="vertical" flexItem style={{ margin: '0 16px' }} />
{/*             
            <div style={{ flexGrow: 1 }}>
                <h1 style={{ margin: 0 }}>Hi! {title}</h1>
            </div> */}
            <div style={{ flexGrow: 1 , display: 'flex'}}>
                <img src={appIcon} alt="App Icon" style={{ width: 60, height: 40, marginRight: 8, borderRadius: 10 }} />
                <Typography variant="h6" justifyContent='center' alignSelf='center'><strong>{title}</strong></Typography>
            </div>
            <Toolbar style={{ justifyContent: 'end' }}>
                { category.toLocaleLowerCase() === 'seller' && (
                    <IconButton   onClick={() => navigate("/landing")} color="inherit" aria-label="seller-landing">
                        <StoreIcon sx={{ color: 'whitesmoke' }} />
                    </IconButton>
                )
                }
                <IconButton color="inherit" aria-label="orders" onClick={() => navigate("/cart")}>
                    <ShoppingCartIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="wishlist" onClick={() => navigate("/wishlist")}>
                    <FavoriteIcon sx={{ color: 'whitesmoke' }}  />
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

export default NavBar;
