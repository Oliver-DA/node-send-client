import {
    SHOW_ALERT,
    DISMISS_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    LOADING_UPLOAD_FILE,
    CREATE_LINK,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../actions';

const AppReducer = (state, action) => {

    switch(action.type) {

        case DISMISS_ALERT: 
            return {
                ...state,
                message_file: null
            }
        

        case SHOW_ALERT: 
            return {
                ...state,
                message_file: action.payload
            }
        

        case UPLOAD_FILE: 
            return {
                ...state,
                loading: null,
                name: action.payload.name,
                original_name: action.payload.original_name
            }
        

        case UPLOAD_FILE_ERROR: 
            return {
                ...state,
                loading: null,
                message_file: action.payload
            }
        

        case LOADING_UPLOAD_FILE: 
            return {
                ...state,
                loading: true
            }
        
        
        case CREATE_LINK: 
            return {
                ...state,
                url: action.payload
            }
        

        case CLEAN_STATE: 
            return {
                ...state,
                message_file: null,
                name: "",
                original_name: "",
                loading: null,
                downloads: 1,
                password: "",
                url: "",
                author: null
            }
        

        case ADD_PASSWORD: 
            return {
                ...state,
                password: action.payload
            }
        
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        
        default: return state
    }
}

export default AppReducer;