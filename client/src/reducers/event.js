const initialState = {
    events: []
}

export const events = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'EVENTS_LOADED':
            return {
                ...state,
                events:payload
            }
        case 'EVENT_CREATED':
            return {
                ...state,
                events:  [...state.events, payload]
            }
        case 'EVENT_DELETED':
            return {
                ...state,
                events: [...state.events.filter( ({_id}) => _id !== payload.id)]
            }
        default:
            return state
    }
}