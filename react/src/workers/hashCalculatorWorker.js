import { hash } from '@image-hasher/common/helpers'

onmessage = ({ data }) => {
    const startTime = new Date().getTime()

    const { msg, algo, salt } = data
    const hashedText = hash(msg, algo, salt)

    const endTime = new Date().getTime()
    const totalTime = endTime - startTime

    postMessage({ hashedText, totalTime })
}
