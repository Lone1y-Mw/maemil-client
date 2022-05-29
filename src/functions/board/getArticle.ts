async function getArticle(href: string) {
    const data = await fetch('http://localhost:5000/api/board/getArticle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ href })
    }).then(res => res.json())

    if(!data.success) return {}
    return data.data
}

export default getArticle