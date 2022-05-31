async function regTodo(grd: number, grp: number, todoId: string, desc: string) {
    return await fetch('http://localhost:5000/api/todo/regTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grd, grp, todoId, desc })
    }).then(res => res.json())
}

export default regTodo