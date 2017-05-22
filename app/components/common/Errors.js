import React, { Component } from 'react';

const Errors = ({ touched, error }) => {
    return (
        <div>
            {touched && (error &&
            <div className="alert alert-danger"><strong>{error}</strong></div>)}
        </div>
    );
};

export { Errors };
