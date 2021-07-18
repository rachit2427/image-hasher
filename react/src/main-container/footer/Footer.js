import React from 'react'
import { useDispatch } from 'react-redux'
import Branding from '@image-hasher/common/components/Branding'
import { updateImages } from '@image-hasher/redux/Actions'

const Footer = () => {
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(updateImages([]))
    }

    return (
        <footer>
            <div className="content-max-width">
                <Branding />
                <button
                    type="button"
                    className="clear-storage-cta"
                    onClick={onClickHandler}
                >
                    Reset items (and storage)
                </button>
            </div>
        </footer>
    )
}

export default Footer
