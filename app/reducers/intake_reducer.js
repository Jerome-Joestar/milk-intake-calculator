import { INTAKE_SUBMIT } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case INTAKE_SUBMIT:
            return Object.assign({}, ...state, {
                babyValues: action.values
            });
        default:
            return state
    }
    return state;
}