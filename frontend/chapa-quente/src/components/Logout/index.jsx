import { logout } from '../../redux/reducers/authSlice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        navigate('/');
    }, [dispatch, navigate]);
    
    return null;
}

export default Logout;