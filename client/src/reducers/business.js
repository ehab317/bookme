const initialState = {
    business: null
}

export const business = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'BUSINESSES_LOADED':
            return {
                ...state,
                business:payload
            }
        case 'BUSINESS_CREATED':
            return {
                ...state,
                business: [...state.business, payload]
            }
        case 'BUSINESS_DELETED':
            return {
                ...state,
                business: [...state.business.filter( ({_id}) => _id !== payload._id)]
            }
        default:
            return state
    }
}