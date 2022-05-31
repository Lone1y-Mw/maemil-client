async function getTodo(grd: number, grp: number) {
    return await fetch('http://localhost:5000/api/todo/getTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grd, grp })
    }).then(async res => {
        const data: any = await res.json()
        if(data.success) return JSON.parse(data.data)
        return []
    })
}

export default getTodo