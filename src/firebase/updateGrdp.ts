async function updateGrdp(grdp: string) {
    const token = localStorage.getItem('fcm-token') || ''
    const data = await fetch('https://api.maemil.kr/api/useMessage/updateGrdp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, grdp })
    }).then(res => res.json())
    
    return data
}

export default updateGrdp