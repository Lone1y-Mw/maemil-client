async function removeTodo(grade: string, group: string, todoId: string) {
    return await fetch('http://localhost:5000/api/todo/removeTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grade, group, todoId })
    }).then(res => res.json())
}

export default removeTodo