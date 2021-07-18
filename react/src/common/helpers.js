/* global __webpack_public_path__ */

import HexEncoding from 'crypto-js/enc-hex'
import Md5 from 'crypto-js/md5'
import Sha1 from 'crypto-js/sha1'
import Sha256 from 'crypto-js/sha256'
import Pbkdf2 from 'crypto-js/pbkdf2'

import {
    ALL_HASHES,
    HASH_MD5,
    HASH_PBKDF2,
    HASH_SHA1,
    HASH_SHA256,
} from '@image-hasher/common/constants'
import { updateImages } from '@image-hasher/redux/Actions'

export const getBaseUrl = () =>
    new URL(__webpack_public_path__, window.location.origin)

export const hash = (msg, algo, salt) => {
    switch (algo) {
        case HASH_MD5:
            return Md5(msg).toString(HexEncoding)

        case HASH_SHA1:
            return Sha1(msg).toString(HexEncoding)

        case HASH_SHA256:
            return Sha256(msg).toString(HexEncoding)

        case HASH_PBKDF2:
            return Pbkdf2(msg, salt, {
                keySize: 512 / 32,
                iterations: 1000,
            }).toString(HexEncoding)

        default:
            return 'Invalid algo'
    }
}

export const hashCallback = (url, allImagesRef, algo, data, dispatch) => {
    const newImages = allImagesRef.current.map(image => {
        if (image.url !== url) return image
        image.hashes[algo] = {
            computed: true,
            value: data.hashedText,
            time: data.totalTime,
        }

        const notLoadedHashes =
            ALL_HASHES.filter(hashAlgo => !image.hashes[hashAlgo].computed)
                .length > 0

        if (!notLoadedHashes) {
            image.endTime = new Date().getTime()
            image.allLoaded = true
        }

        return image
    })

    dispatch(updateImages(newImages))
}

export const calculateHash = async (msg, algo, salt, callback = () => {}) => {
    const worker = new window.Worker(
        new URL('hash-calculator-worker.js', getBaseUrl().href)
    )

    worker.postMessage({ msg, algo, salt })
    worker.onmessage = ({ data }) => {
        callback(data)

        worker.terminate()
    }
}
