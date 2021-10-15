import React, { useReducer } from 'react';
import AppContext from './appContext';
import AppReducer from '../../context/app/appReducer';
import axiosClient from '../../config/axiosClient';

import {
    SHOW_ALERT,
    DISMISS_ALERT,
    UPLOAD_FILE,
    LOADING_UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    CREATE_LINK,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../actions'

const AppState = ({children}) => {

    const initialState = {
        message_file: null,
        name: "",
        original_name: "",
        loading: null,
        downloads: 1,
        password: "",
        url: "",
        author: null
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const showAlert = (msg) => {

        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: DISMISS_ALERT
            })
        }, 3000)
    }

    const uploadFiles = async (formData, fileName) => {
        
        dispatch({
            type: LOADING_UPLOAD_FILE
        });
        
        try {
            const response = await axiosClient.post("api/file", formData);
            dispatch({
                type: UPLOAD_FILE,
                payload: {
                    original_name: fileName,
                    name: response.data.file
                }
            })

        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            })

        }
        
    }

    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const response = await axiosClient.post("api/links", data)
            dispatch({
                type: CREATE_LINK,
                payload: response.data.msg
            })

        } catch (error) {
            console.log(error)
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    const addPassword = (password) => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }
    
    const addDownloads = (downloads) => {
       
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <AppContext.Provider
            value = {{
                downloads: state.downloads,
                password: state.password,
                url: state.url,
                author: state.author,
                message_file: state.message_file,
                name: state.name,
                loading: state.loading,
                original_name: state.original_name,
                showAlert,
                uploadFiles,
                cleanState,
                createLink,
                addPassword,
                addDownloads
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppState;