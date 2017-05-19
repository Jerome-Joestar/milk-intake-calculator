import React, { Component } from 'react';

const Errors = ({ touched, error }) => {
    return (

            <div>
                {touched && (error &&
                <div className="alert alert-danger"><strong>{error}</strong></div>)}
            </div>

            /*
             <div className="alert alert-danger">
             <strong>Incorrect Values!</strong>
             <p>Weight (lbs) field cannot be less than 5.</p>
             <p>Age must be a number between 0 to 6.</p>
             </div>*/
    );
};

export { Errors };
