async function getTimetable() {
    let data = await fetch('http://localhost:5000/api/getTimetable').then(res => res.json())
    return data
}
  
export default getTimetable;
  
  