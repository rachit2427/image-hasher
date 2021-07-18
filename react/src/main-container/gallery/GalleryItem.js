import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { openModal } from '@image-hasher/redux/Thunks'
import { updateImages } from '@image-hasher/redux/Actions'
import useSelectorRef from '@image-hasher/common/hooks/useSelectorRef'

const GalleryItem = ({ image }) => {
    const [, allImagesRef] = useSelectorRef(state => state.images)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!image.forceHide && image.error) {
            setTimeout(() => {
                dispatch(
                    updateImages(
                        allImagesRef.current.map(img => {
                            if (img.url !== image.url) return img
                            img.forceHide = true
                            return img
                        })
                    )
                )
            }, 3000)
        }
    }, [image.error])

    const onClickHandler = () => {
        dispatch(openModal(image))
    }

    if (image.forceHide) return <></>

    return (
        <div className="gallery-item-wrapper">
            <div
                className={classNames('gallery-item', {
                    loading: !image.allLoaded,
                    loaded: image.allLoaded,
                    error: image.error,
                })}
                onClick={onClickHandler}
                aria-hidden="true"
                tabIndex="-1"
            >
                <div className="image-container">
                    <img src={image.blobUrl} alt="URL" />
                </div>
                <div className="info-container">
                    <p className="loading-status">
                        {image.error && (
                            <>
                                Unexpected error <span>Removing card</span>
                            </>
                        )}
                        {!image.error && !image.allLoaded && 'Computing ... '}
                        {!image.error && image.allLoaded && 'Computed'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GalleryItem
