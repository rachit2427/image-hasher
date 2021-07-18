import {
    hideModal,
    showModal,
    updateImages,
    updateModalImage,
} from '@image-hasher/redux/Actions'
import {
    ALL_HASHES,
    HASH_MD5,
    HASH_SHA1,
    HASH_SHA256,
    PLACEHOLDER_IMAGE_URL,
} from '@image-hasher/common/constants'
import {
    calculateHash,
    getBaseUrl,
    hashCallback,
} from '@image-hasher/common/helpers'

const calculateAlgoHash = (url, allImagesRef, str, hashAlgo) => dispatch => {
    const callback = hashedText => {
        hashCallback(url, allImagesRef, hashAlgo, hashedText, dispatch)
    }

    calculateHash(str, hashAlgo, url, callback)
}

const calculateHashes = (url, allImagesRef, imageText) => async dispatch => {
    ALL_HASHES.forEach(hashAlgo => {
        dispatch(calculateAlgoHash(url, allImagesRef, imageText, hashAlgo))
    })
}

const updateBlobImageData =
    (id, allImagesRef, newBlobUrl, calculateStats, size) => dispatch => {
        dispatch(
            updateImages(
                allImagesRef.current.map(image => {
                    if (image.url !== id) return image
                    let newImage = {
                        ...image,
                        blobUrl: newBlobUrl,
                    }

                    if (calculateStats) {
                        newImage = {
                            ...newImage,
                            size: `${size} bytes`,
                            sizeLoaded: true,
                        }
                    }
                    return newImage
                })
            )
        )
    }

const imageHasError = (id, allImagesRef) => dispatch => {
    dispatch(
        updateImages(
            allImagesRef.current.map(image => {
                if (image.url !== id) return image
                return {
                    ...image,
                    error: true,
                    errorTime: new Date().getTime(),
                }
            })
        )
    )
}

export const fetchImage =
    (url, allImagesRef, calculateStats = true) =>
    dispatch => {
        const worker = new window.Worker(
            new URL('image-fetch-worker.js', getBaseUrl().href)
        )

        worker.postMessage(url)
        worker.onmessage = ({ data }) => {
            if (data.error) {
                alert(data.message)
                dispatch(imageHasError(url, allImagesRef))
            } else {
                const blobImageUrl = URL.createObjectURL(data.blob)
                dispatch(
                    updateBlobImageData(
                        url,
                        allImagesRef,
                        blobImageUrl,
                        calculateStats,
                        data.blob.size
                    )
                )

                if (calculateStats)
                    dispatch(calculateHashes(url, allImagesRef, data.text))
            }

            worker.terminate()
        }
    }

export const encryptNewImage = (url, allImagesRef) => async dispatch => {
    const startTime = new Date().getTime()

    if (!window.Worker) {
        alert(
            'Your browser do not support Web Worker. Please use a different browser'
        )
        return
    }

    dispatch(fetchImage(url, allImagesRef))

    const imageObject = {
        url,
        blobUrl: PLACEHOLDER_IMAGE_URL,
        size: false,
        sizeLoaded: false,
        allLoaded: false,
        startTime,
        endTime: false,
        hashes: {},
    }

    ALL_HASHES.forEach(hashAlgo => {
        imageObject.hashes[hashAlgo] = {
            computed: false,
            value: false,
            time: false,
        }
    })

    dispatch(updateImages([...allImagesRef.current, imageObject]))
}

export const openModal = image => dispatch => {
    dispatch(updateModalImage(image))
    dispatch(showModal())
}

export const closeModal = () => dispatch => {
    dispatch(hideModal())
}
