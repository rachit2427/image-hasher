import React from 'react'
import Logo from '@image-hasher/common/components/Logo'
import Branding from '@image-hasher/common/components/Branding'
import ImageInput from '@image-hasher/main-container/header/ImageInput'

const Header = () => (
    <header>
        <div className="content-max-width">
            <div className="first-row">
                <Logo />
                <Branding />
            </div>
            <ImageInput className="second-row" />
        </div>
    </header>
)

export default Header
