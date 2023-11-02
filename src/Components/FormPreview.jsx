import React from 'react';
import { useLocation } from 'react-router-dom';

const FormPreview = () => {
    const location = useLocation()
    const form = location.state.form
    console.log(form);
    return (
        <div>
            <p>form preview</p>
        </div>
    );
};

export default FormPreview;