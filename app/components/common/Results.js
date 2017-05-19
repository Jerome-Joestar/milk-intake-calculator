import React, { Component } from 'react';

const Results = () => {
    return (
        <div className="alert alert-success">
            <p><strong>Daily milk intake required (oz):</strong> {this.state.dailyRequiredOz}</p>
            <p><strong>Daily milk intake required (ml):</strong> {this.state.dailyRequiredMl}</p>
            <p><strong>Per feeding needs (oz):</strong> {this.state.perFeedingMin} - {this.state.perFeedingMax}</p>
            <p><strong>8-12 feedings per day (ml):</strong> {this.state.setFeedingsPerDayMin}
                - {this.state.setFeedingsPerDayMax}</p>
        </div>
    );
};

export { Results };
