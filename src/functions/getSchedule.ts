async function getSchedule(startDay: string, endDay: string) {
    let data = await fetch('http://localhost:5000/api/getSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDay, endDay })
    }).then(res => res.json())

    if(!data.success) return []
    return data.scheduleList
}

export default getSchedule;