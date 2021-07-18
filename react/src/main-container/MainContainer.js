import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import smoothScroll from 'smoothscroll-polyfill'
import $ from 'jquery'
import Header from '@image-hasher/main-container/header/Header'
import Gallery from '@image-hasher/main-container/gallery/Gallery'
import useLocalStorage from '@image-hasher/common/hooks/useLocalStorage'
import { updateImages } from '@image-hasher/redux/Actions'
import Modal from '@image-hasher/main-container/modal/Modal'
import Footer from '@image-hasher/main-container/footer/Footer'
import { PLACEHOLDER_IMAGE_URL } from '@image-hasher/common/constants'
import useSelectorRef from '@image-hasher/common/hooks/useSelectorRef'
import { fetchImage } from '@image-hasher/redux/Thunks'

const MainContainer = () => {
    const [allImages, allImagesRef] = useSelectorRef(state => state.images)
    const dispatch = useDispatch()

    const [imagesInStorage, setImagesInStorage] = useLocalStorage(
        'allImages',
        []
    )

    const imageUrlToPlaceholder = image => {
        image.blobUrl = PLACEHOLDER_IMAGE_URL
        if (!image.error && !image.forceHide)
            dispatch(fetchImage(image.url, allImagesRef, false))

        return image
    }

    useEffect(() => {
        smoothScroll.polyfill()
        dispatch(updateImages(imagesInStorage.map(imageUrlToPlaceholder)))

        /* Removing WebHostApp branding */
        setTimeout(() => {
            $("img[alt='www.000webhost.com']").parent().parent().remove()
        }, 0)
    }, [])

    useEffect(() => {
        setImagesInStorage(allImages)
    }, [allImages])

    return (
        <>
            <Modal />
            <Header />
            <Gallery />
            <Footer />
        </>
    )
}

export default MainContainer
