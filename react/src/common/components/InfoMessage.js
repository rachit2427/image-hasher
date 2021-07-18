import React from 'react'
import classNames from 'classnames'

const InfoMessage = ({ hash: { computed, value, time = false } }) => {
    return (
        <span
            className={classNames({
                computing: !computed,
            })}
        >
            {computed ? value : 'Computing ...'}{' '}
            <span className="time-block" r-if={computed && time}>
                (computed in <strong>{time}ms</strong>)
            </span>
        </span>
    )
}

export default InfoMessage
