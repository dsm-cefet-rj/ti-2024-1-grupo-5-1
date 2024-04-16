import { logout } from '../../redux/reducers/authSlice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        navigate('/');
        toast('Até logo, esperamos vê-lo novamente em breve!', { type: 'success' });
    }, [dispatch, navigate]);
    
    return null;
}

export default Logout;