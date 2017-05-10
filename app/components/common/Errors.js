import React, { Component } from 'react';

const Errors = () => {
    return (
        <div>
            <div className="alert alert-danger">
                <strong>Missing form info!</strong> The first three fields (Age, Weight (lbs), Weight (oz)) must be
                completed to calculate results.
            </div>
            <div className="alert alert-danger">
                <strong>Incorrect Values!</strong>
                <p>Weight (lbs) field cannot be less than 5.</p>
                <p>Age must be a number between 0 to 6.</p>
            </div>
        </div>
    );
}

export default Errors;
