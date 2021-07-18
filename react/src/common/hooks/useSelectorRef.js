import { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'

const useSelectorRef = func => {
    const mutableState = useRef()

    if (typeof func !== 'function')
        throw new Error('The selector must be a pure function.')

    const selector = useCallback(func, [])

    const stateValue = useSelector(selector)
    mutableState.current = stateValue

    return [stateValue, mutableState]
}

export default useSelectorRef
