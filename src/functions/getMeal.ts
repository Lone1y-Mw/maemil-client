async function getMeal(date: string) {
    let data = await fetch('https://api.maemil.kr/api/getMeal', {
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