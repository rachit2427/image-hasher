const getFromStorage = (key, defaultState) => {
    if (window.localStorage[key] === undefined) return defaultState || {}

    let data
    try {
        data = JSON.parse(window.localStorage[key])
    } catch (err) {
        data = window.localStorage[key] || {}
    }

    return data
}

const setToStorage = (key, value) => {
    window.localStorage[key] = JSON.stringify(value)
}

const useLocalStorage = (key, defaultState) => {
    const currentState = getFromStorage(key, defaultState)
    const setKeyToStorage = value => setToStorage(key, value)

    return [currentState, setKeyToStorage]
}

export default useLocalStorage
