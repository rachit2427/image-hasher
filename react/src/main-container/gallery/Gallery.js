import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import GalleryItem from '@image-hasher/main-container/gallery/GalleryItem'

const Gallery = () => {
    const allImages = useSelector(state => state.images)

    return (
        <section className="gallery">
            <div className="content-max-width">
                <GalleryItem
                    r-for={image in allImages}
                    key={image.url}
                    image={image}
                />
            </div>
        </section>
    )
}

export default Gallery
