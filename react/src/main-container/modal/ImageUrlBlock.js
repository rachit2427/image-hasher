import React from 'react'
import InfoMessage from '@image-hasher/common/components/InfoMessage'

const ImageUrlBlock = ({ image }) => (
    <p className="hash-stats url-block">
        URL:{' '}
        <InfoMessage
            hash={{
                computed: image.url,
                value: image.url,
            }}
        />
    </p>
)

export default ImageUrlBlock
