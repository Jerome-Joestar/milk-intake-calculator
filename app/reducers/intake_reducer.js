import { CALCULATE_MILK_INTAKE } from '../actions/types';

export default function( state = {}, action){
    switch(action.type){
        case CALCULATE_MILK_INTAKE:
            return { ...state }
    }
}