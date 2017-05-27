import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const IntakeTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

export { IntakeTextField };
