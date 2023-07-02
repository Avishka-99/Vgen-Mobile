import { INCREMENT_REDBUTTON } from "../constants/counterActionTypes";
export const incrementRedButton = (parameter) => {
    return {
        type: INCREMENT_REDBUTTON,
        payload: parameter
    }
}