import React, { useEffect } from 'react'
import smoothScroll from 'smoothscroll-polyfill'
import $ from 'jquery'

const App = () => {
    useEffect(() => {
        smoothScroll.polyfill()

        /* Removing WebHostApp branding */
        setTimeout(() => {
            $("img[alt='www.000webhost.com']").parent().parent().remove()
        }, 0)
    }, [])

    return <></>
}

export default App
