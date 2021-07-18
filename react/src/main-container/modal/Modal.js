import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageSizeBlock from '@image-hasher/main-container/modal/ImageSizeBlock'
import HashAlgoBlock from '@image-hasher/main-container/modal/HashAlgoBlock'
import TotalTimeBlock from '@image-hasher/main-container/modal/TotalTimeBlock'
import { closeModal } from '@image-hasher/redux/Thunks'
import ImageUrlBlock from '@image-hasher/main-container/modal/ImageUrlBlock'

const Modal = () => {
    const showModal = useSelector(state => state.modal.show)
    const image = useSelector(state => state.modal.image)
    const dispatch = useDispatch()

    useEffect(() => {
        const bodyElement = document.querySelector('body')

        if (showModal) bodyElement.classList.add('overflow-hidden')
        else bodyElement.classList.remove('overflow-hidden')
    }, [showModal])

    const onClickHandler = e => {
        if (e.target === e.currentTarget || e.target.closest('.close'))
            dispatch(closeModal())
    }

    return (
        <div
            className="modal-wrapper"
            r-if={showModal}
            onClick={onClickHandler}
            aria-hidden="true"
            tabIndex="-1"
        >
            <div className="close" />
            <div className="modal">
                <div className="image-container">
                    <img src={image.blobUrl} alt="URL" />
                </div>
                <div className="content-container">
                    <p className="modal-title">Image Stats</p>
                    <ImageUrlBlock image={image} />
                    <ImageSizeBlock image={image} />
                    <HashAlgoBlock image={image} />
                    <TotalTimeBlock image={image} />
                </div>
            </div>
        </div>
    )
}

export default Modal
