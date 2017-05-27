import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

function IntakeContainer (props){
    return (
        <Card>
            {props.children}
        </Card>
    );
}

export { IntakeContainer };
