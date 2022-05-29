function randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 10
    let rs = ''

    for(let i = 0; i < stringLength; i++) {
        const charIndex = Math.floor(Math.random() * chars.length)
        rs += chars.substring(charIndex, charIndex + 1)
    }

    return rs
}

export default randomString