import React, { Component } from 'react';

const IntakeErrors = ({ touched, error }) => {
    return (
        <div>
            {touched && (error &&
            <div className="alert alert-danger"><strong>{error}</strong></div>)}
        </div>
    );
};

export { IntakeErrors };
