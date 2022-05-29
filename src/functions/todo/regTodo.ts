async function regTodo(grade: string, group: string, todoId: string, desc: string) {
    return await fetch('http://localhost:5000/api/todo/regTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grade, group, todoId, desc })
    }).then(res => res.json())
}

export default regTodo