import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component{

    render() {
        return(
            <div data={this.props.babyValues}>
            </div>
        );
    }
}

function mapStateToProps(state){
    if(state.form.intake_form.values.sex){
        return { babyValues: state.form.intake_form.values.sex };
    }

    else{
        return { babyValues: state.form.intake_form.values };
    }
}

export default connect(mapStateToProps)(Results);