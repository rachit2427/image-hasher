import React, { useEffect, useState } from 'react'
import isUrl from 'is-url'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { encryptNewImage } from '@image-hasher/redux/Thunks'
import useSelectorRef from '@image-hasher/common/hooks/useSelectorRef'

const ImageInput = ({ className = '' }) => {
    const [imageInput, setImageInput] = useState('')
    const [allImages, allImagesRef] = useSelectorRef(state => state.images)
    const dispatch = useDispatch()

    const formSubmitHandler = e => {
        e.preventDefault()
        const isValidURL = isUrl(imageInput)

        if (!isValidURL) alert('Please enter a valid image URL')
        else {
            const alreadyComputed =
                allImagesRef.current.filter(
                    imageObj => imageInput === imageObj.url
                ).length > 0

            if (alreadyComputed) alert('This image has already been computed.')
            else dispatch(encryptNewImage(imageInput, allImagesRef))
        }

        setImageInput('')
    }

    return (
        <form
            className={classNames('image-input-container', className)}
            onSubmit={e => formSubmitHandler(e)}
        >
            <input
                className="image-input"
                placeholder="Enter Image URL"
                value={imageInput}
                onChange={e => setImageInput(e.target.value.trim())}
            />
            <button className="image-submit-btn" type="submit">
                Go
            </button>
        </form>
    )
}

export default ImageInput
