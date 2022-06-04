async function getTimetable() {
    let data = await fetch('https://api.maemil.kr/api/getTimetable').then(res => res.json())
    return data
}
  
export default getTimetable;
  
  