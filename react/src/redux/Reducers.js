import defaultState from '@image-hasher/redux/config/defaultState'
import {
    SHOW_MODAL,
    UPDATE_IMAGES,
    UPDATE_MODAL_IMAGE,
} from '@image-hasher/common/constants'

export const imageReducer = (state = defaultState.images, action) => {
    switch (action.type) {
        case UPDATE_IMAGES:
            return action.payload

        default:
            return state
    }
}

export const modalReducer = (state = defaultState.modal, action) => {
    switch (action.type) {
        case UPDATE_MODAL_IMAGE:
            return {
                ...state,
                image: action.payload,
            }

        case SHOW_MODAL:
            return {
                ...state,
                show: action.payload,
            }

        default:
            return state
    }
}
