import React from 'react'

const TotalTimeBlock = ({ image }) => (
    <p
        className="hash-stats total-time-block"
        r-if={image.startTime && image.endTime}
    >
        Total calculation time:{' '}
        <strong>{image.endTime - image.startTime}ms</strong>
    </p>
)

export default TotalTimeBlock
