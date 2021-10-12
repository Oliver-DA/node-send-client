import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axiosClient';
import authToken from '../../config/token';
import {
    REGISTER_USER,
    REGISTER_USER_ERROR,
    DISMISS_ALERT,
    USER_LOGIN,
    USER_LOGIN_ERROR,
    AUTH_USER,
    LOG_OUT
} from '../../actions'

const AuthState = ({children}) => {

    const initialState = {
        token: typeof window !== "undefined" ?  localStorage.getItem("token") : "",
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUp = async (data) => {

        try {
            const response = await axiosClient.post("/api/users", data);
            dispatch({
                type: REGISTER_USER,
                payload: response.data.msg
            });

        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: error.response.data.msg
            });
        }
    
        setTimeout(() => {
            dispatch({
                type: DISMISS_ALERT
            });
        }, 2500)
    }

    const logIn = async (data) => {

        try {
            const response = await axiosClient.post("/api/auth", data);

            dispatch({
                type: USER_LOGIN,
                payload: response.data.token
            });

        } catch(error) {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: DISMISS_ALERT
            });
        }, 2500)
    }

    const authenticatedUser = async () => {
        const token = localStorage.getItem("token");
        
        if(token) {
            authToken(token);
        }
        
        try {
            const response = await axiosClient.get("/api/auth");

            dispatch({
                type: AUTH_USER,
                payload: response.data
            });

        } catch (error) {
            console.log(error.response)
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

 

    return (

        <AuthContext.Provider
            value = {{
                toke: state.token,
                authenticated: state.authenticated,
                user: state.user, 
                message: state.message,
                signUp,
                logIn,
                authenticatedUser,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthState;