const initialState = {
    token: localStorage.getItem('token'),
    user:null,
    isAuthenticated: null,
    loading: true
}

export const user = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case 'USER_LOADED':
            return {
                ...state,
                user: payload,
                isAuthenticated:true,
                loading:false
            }
        case "LOGOUT_SECCESS":
        case 'REGISTER_FAILED':
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        default:
            return state
    }
}