import React from 'react'
import { ALL_HASHES } from '@image-hasher/common/constants'
import InfoMessage from '@image-hasher/common/components/InfoMessage'

const HashAlgoBlock = ({ image }) => (
    <p
        className="hash-stats"
        r-for={(hashAlgo, index) in ALL_HASHES}
        key={index}
    >
        {hashAlgo.toUpperCase()}:
        <InfoMessage hash={image.hashes[hashAlgo]} />
    </p>
)

export default HashAlgoBlock
