async function getBoard(arc: number) {
    const data = await fetch('http://localhost:5000/api/board/getBoard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arc })
    }).then(res => res.json())

    if(!data.success) return []
    return data.data
}

export default getBoard