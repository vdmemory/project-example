import React from 'react';
import { toastifyCustomStyles } from './Toastify.styled';
import { toast, ToastContainer } from 'react-toastify';

export const Toastify = () => {
    const configToastify = {
        position: toast.POSITION.BOTTOM_LEFT,
        limit: 7,
        hideProgressBar: false,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
    };

    return <ToastContainer css={toastifyCustomStyles} {...configToastify} />;
};

export default Toastify;
