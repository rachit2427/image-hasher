import React from 'react'
import { Provider } from 'react-redux'
import MainContainer from '@image-hasher/main-container/MainContainer'
import configureStore from '@image-hasher/redux/config/store'

const App = () => {
    const store = configureStore()

    return (
        <Provider store={store}>
            <MainContainer />
        </Provider>
    )
}

export default App
