async function getMeal(date: string) {
    let data = await fetch('http://localhost:5000/api/getMeal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
    }).then(res => res.json())

    if(!data.success) return []
    return data.mealList
}

export default getMeal