import React from 'react';

const renderInputField = ({ label, type, input, meta: { touched, error } }) => (
    <div className="input-row">
        <label>{label}</label>
        <input {...input} type={type} className="form-control"/>
        {touched && error && <span className="error">{error}</span>}
    </div>
);

export default renderInputField;

