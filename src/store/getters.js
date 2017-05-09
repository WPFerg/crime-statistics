export default {
    crimeByType(state) {
        return state.crime.reduce((r, d) => {
            if (!r[d.category]) {
                r[d.category] = [];
            }

            r[d.category].push(d);
            return r;
        }, {});
    }
};
