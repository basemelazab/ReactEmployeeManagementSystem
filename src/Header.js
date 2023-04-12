import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [displayusername, setDisplayusername] = useState('');
    const [menu, setMenu] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setMenu(false);
        } else {
            setMenu(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                setDisplayusername(username);
            }
        }
    }, [location])

    return (
        <div>
            {menu &&
                <div className="header">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/employee'}>Employee</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Header;