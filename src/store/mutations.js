import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.RETRIEVE_CRIME_DATA]: (state) => {
        state.retrievingData = true;
    },

    [CONSTANTS.RECEIVE_CRIME_DATA]: (state, values) => {
        state.crime = values;
        state.retrievingData = false;
    }
};
