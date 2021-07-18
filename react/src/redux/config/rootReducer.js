import { combineReducers } from 'redux'
import { imageReducer, modalReducer } from '@image-hasher/redux/Reducers'

const rootReducer = combineReducers({
    images: imageReducer,
    modal: modalReducer,
})

export default rootReducer
