async function getTodo(grd: number, grp: number) {
    return await fetch('https://api.maemil.kr/api/todo/getTodo', {
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