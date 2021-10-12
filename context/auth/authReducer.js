import {
    REGISTER_USER,
    REGISTER_USER_ERROR,
    DISMISS_ALERT,
    USER_LOGIN_ERROR,
    USER_LOGIN,
    AUTH_USER,
    LOG_OUT
} from '../../actions'

const AuthReducer =  (state, action) => {
    switch (action.type) {
        case REGISTER_USER_ERROR:
        case USER_LOGIN_ERROR:
        case REGISTER_USER: {
            return {
                ...state,
                message: action.payload
            }
        }

        case DISMISS_ALERT: {
            return {
                ...state,
                message: null
            }
        }

        case USER_LOGIN: {
            localStorage.setItem("token", action.payload)
            return {
                ...state,
                authenticated: true,
                token: action.payload
            }
        }

        case AUTH_USER: {
                return {
                    ...state,
                    user: action.payload,
                    authenticated: true
                }
        }

        case LOG_OUT: {
            localStorage.removeItem("token")
            return {
                ...state,
                user: null,
                authenticated: null,
                token: null
            }
        }

        default: return state
    }
}

export default AuthReducer;