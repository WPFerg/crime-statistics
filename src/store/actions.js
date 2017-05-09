import * as CONSTANTS from './constants';
import { get } from '../api/api';

export default {
    [CONSTANTS.RETRIEVE_CRIME_DATA]({ commit }, postcode) {
        if (postcode) {
            commit(CONSTANTS.RETRIEVE_CRIME_DATA);

            get(postcode).then((crimeData) => {
                commit(CONSTANTS.RECEIVE_CRIME_DATA, crimeData);
            });
        }
    }
};
