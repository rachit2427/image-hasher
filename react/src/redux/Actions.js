import {
    SHOW_MODAL,
    UPDATE_IMAGES,
    UPDATE_MODAL_IMAGE,
} from '@image-hasher/common/constants'

export const updateImages = images => ({
    type: UPDATE_IMAGES,
    payload: images,
})

export const showModal = () => ({
    type: SHOW_MODAL,
    payload: true,
})

export const hideModal = () => ({
    type: SHOW_MODAL,
    payload: false,
})

export const updateModalImage = image => ({
    type: UPDATE_MODAL_IMAGE,
    payload: image,
})
