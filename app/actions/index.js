import { INTAKE_SUBMIT } from './types';

export function generateIntakeResults(values) {
    return { type: INTAKE_SUBMIT, values };
}