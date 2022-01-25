const initialState = {
    units: null
}

export const units = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'UNITS_LOADED':
            return {
                ...state,
                units:payload
            }
        case 'UNIT_CREATED':
            return {
                ...state,
                units: [...state.units, payload]
            }
        case 'UNIT_DELETED':
            return {
                ...state,
                units: [...state.units.filter( ({_id}) => _id !== payload._id)]
            }
        default:
            return state
    }
}