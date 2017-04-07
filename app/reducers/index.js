import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import intakeReducer from './intake_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    intakeReducer: intakeReducer
});

export default rootReducer;