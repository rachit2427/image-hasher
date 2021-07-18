import React from 'react'
import InfoMessage from '@image-hasher/common/components/InfoMessage'

const ImageSizeBlock = ({ image }) => (
    <p className="hash-stats size-info">
        Size:{' '}
        <InfoMessage
            hash={{
                computed: image.sizeLoaded,
                value: image.size,
            }}
        />
    </p>
)

export default ImageSizeBlock
