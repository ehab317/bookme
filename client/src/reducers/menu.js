const initialState = {
    collapsed : false
}

export const menu = (state = initialState, action) => {
    const {type} = action;
    switch (type) {
        case 'SHOW_CONTROLS':
            return {
                ...state,
                collapsed:false
            }
        case 'HIDE_CONTROLS' :
            return {
                ...state,
                collapsed: true
            }
        default:
            return state
    }
}