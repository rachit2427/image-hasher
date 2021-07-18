import { IMAGE_MIME_TYPES } from '@image-hasher/common/constants'
import { updateImages } from '@image-hasher/redux/Actions'

const newError = message => ({
    error: true,
    message,
})

onmessage = async ({ data: imageUrl }) => {
    try {
        const response = await fetch(imageUrl)

        if (response.status !== 200) {
            postMessage(
                newError(
                    'Could not fetch image, please try again with a different URL.'
                )
            )
            return
        }

        const contentType = response.clone().headers.get('Content-Type')
        const isValidImg = IMAGE_MIME_TYPES.includes(contentType.toLowerCase())

        if (!isValidImg) {
            postMessage(newError('Please use JPG/JPEG/PNG/GIF images only.'))
            return
        }

        const imageText = await response.clone().text()
        const blob = await response.clone().blob()

        postMessage({
            blob,
            text: imageText,
        })
    } catch (err) {
        postMessage(
            newError(
                'Could not fetch image, probably due to CORS. Please try again with a different URL.'
            )
        )
    }
}
