<script lang="ts">
    import { onMount } from 'svelte'
    import { quintOut } from 'svelte/easing'
    import { crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
	import { SyncLoader } from 'svelte-loading-spinners'
    import BackspaceIcon from '~/icons/BackspaceIcon.svelte'
    import getTimetable from '~/functions/getTimetable'
    import regTodo from '~/functions/todo/regTodo'
    import removeTodo from '~/functions/todo/removeTodo'
    import getTodo from '~/functions/todo/getTodo'
    import randomString from '~/functions/randomString'

    type Todo = {
        todoId: string;
        done: boolean;
        desc: string;
    }

    type Grdp = {
        grade?: string;
        group?: string;
    }

    let loading = true
    let todos: Todo[] = []
    let todo_done: string[] = JSON.parse(localStorage.getItem('todo-done') || '[]')
    let classes: Grdp[] = []
    let grdpSp: string[] = localStorage.getItem('todo-grdp')?.split('-') || ['1', '1']
    let grade = grdpSp[0]
    let group = grdpSp[1]
    let selected = grade + '-' + group

    onMount(async () => {
        loading = true
        todos = await getTodo(grade, group)
        for(let td of todo_done) {
            todos.map(t => {
                if(t.todoId === td) {
                    t.done = true
                }
            })
        }
        loading = false
    })
    
    const [send, receive] = crossfade({
        fallback(node) {
            const style = getComputedStyle(node)
            const transform = style.transform === 'none' ? '' : style.transform

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `
            }
        }
    })

    async function initClasses() {
        let timetableList = await getTimetable()
    
        for(let grd in timetableList) {
            let timetable = timetableList[grd]
            for(let grp in timetable) {
                classes.push({ grade: grd, group: grp })
            }
        }
    }

    function updateTodoDoneStorage(todo_done: string[]) {
        localStorage.setItem('todo-done', JSON.stringify(todo_done))
    }

    function handleNewtodobutton() {
        const input = document.getElementsByClassName('new-todo-input')[0] as HTMLInputElement
        if(input.value === '') return

        const todoId = randomString()
        regTodo(grade, group, todoId, input.value)
        .then(res => {
            if(res.success) {
                const todo = {
                    todoId,
                    done: false,
                    desc: input.value
                }
                todos = [todo, ...todos]
                input.value = ''
            }
        })
    }

    async function handleOption(target: EventTarget) {
        loading = true
        const value = (target as HTMLSelectElement).value
        const grdpList = value.split('-')
        grade = grdpList[0]
        group = grdpList[1]

        localStorage.setItem('todo-grdp', value)

        todos = await getTodo(grade, group)

        for(let td of todo_done) {
            todos.map(t => {
                if(t.todoId === td) {
                    t.done = true
                }
            })
        }
        loading = false
    }
</script>

<div class="todo">
    <div class="top">
        <div class="todo-input">
            <input
                type="text"
                class="new-todo-input focus-shadow"
                placeholder="할 일을 등록하세요"
                autocomplete="off" />
            <button
                class="new-todo-button focus-shadow"
                on:click={handleNewtodobutton}>확인</button>
        </div>
        <div class="todo-input-desc">
            <span class="todo-text-warning">(주의)</span>
            <span>할 일 등록 및 삭제는 해당 반 전체에 반영됩니다.</span>
        </div>
    </div>
    <div class="middle">
        {#if loading}
            <div class="todo-loader">
                <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
            </div>
            {:else}
                <div class="todo-over">
                    <div class="start">
                        <span>시작 🚀</span>
                    </div>
                    {#each todos.filter(t => !t.done) as todo (todo.todoId)}
                        <label
                            class="todo-label"
                            in:receive|local={{key: todo.todoId}}
                            out:send|local={{key: todo.todoId}}
                            animate:flip>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                on:change={() => {
                                    todo.done = !todo.done
                                    todo_done.push(todo.todoId)
                                    updateTodoDoneStorage(todo_done)
                                }}>
                            {todo.desc}
                            <button
                                class="todo-btn-remove"
                                on:click={() => {
                                    removeTodo(grade, group, todo.todoId)
                                    .then(res => {
                                        if(res.success) {
                                            todos = todos.filter(t => t !== todo)
                                        }
                                    })
                                }}>
                                <BackspaceIcon />
                            </button>
                        </label>
                    {/each}
                </div>
                <div class="todo-under">
                    <div class="finish">
                        <span>끝 🌌</span>
                    </div>
                    {#each todos.filter(t => t.done) as todo (todo.todoId)}
                        <label
                            class="todo-label"
                            in:receive|local={{key: todo.todoId}}
                            out:send|local={{key: todo.todoId}}
                            animate:flip>
                            <input
                                type="checkbox" 
                                checked={todo.done}
                                on:change={() => {
                                    todo.done = !todo.done
                                    todo_done = todo_done.filter(t => t !== todo.todoId)
                                    updateTodoDoneStorage(todo_done)
                                }}>
                            {todo.desc}
                            <button
                                class="todo-btn-remove"
                                on:click={() => {
                                    removeTodo(grade, group, todo.todoId)
                                    .then(res => {
                                        if(res.success) {
                                            todos = todos.filter(t => t !== todo)
                                            todo_done = todo_done.filter(t => t !== todo.todoId)
                                            updateTodoDoneStorage(todo_done)
                                        }
                                    })
                                }}>
                                <BackspaceIcon />
                            </button>
                        </label>
                    {/each}
                </div>
        {/if}
    </div>
    {#await initClasses()}
        <div></div>
        {:then}
            <div class="bottom">
                <div class="todo-selector">
                    <select
                        bind:value={selected}
                        on:change={e => {
                            if(e?.target) handleOption(e.target)
                        }}>
                        {#each classes as { grade, group }}
                            <option value={`${grade}-${group}`}>{`${grade}학년 ${group}반`}</option>
                        {/each}
                    </select>
                </div>
            </div>
    {/await}
</div>

<style class="scss">
    .todo {
		max-width: 20em;
        min-height: 180px;
		padding: 1.5em;
		border-radius: 40px 40px;
		background-color: white;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
    }

    .start, .finish {
        margin-bottom: 7px;
    }

    .todo-input {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .todo-input-desc {
        font-size: 13px;
        text-align: center;
        margin-bottom: 10px;
    }

    .todo-text-warning {
        color: #DC3545;
    }

    .new-todo-input {
        width: calc(82% - 8px);
        outline: none;
        border: 1px solid #ccc;
        padding: 10px 14px;
        font-size: 15px;
        border-radius: 5px;
        margin-right: 8px;
    }

    .new-todo-button {
        width: 18%;
        height: 40px;
        background: #7292ED;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        border-radius: 10px;
        border: none;
    }

    .todo-loader {
        width: 50px;
        height: 50px;
        margin: auto;
    }

    .todo-over, .todo-under {
        box-sizing: border-box;
    }

    .todo-under > label {
        background-color: #7292ED;
        color: #fff;
    }

    .todo-label {
        position: relative;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 0.5em;
        margin: 0 auto 0.5em auto;
        border-radius: 2px;
        background-color: #eee;
        user-select: none;
        word-wrap: break-word;
    }

    .todo-btn-remove {
        position: absolute;
        top: 50%;
        right: 0.5em;
        transform: translateY(-50%);
        box-sizing: border-box;
        background-color: transparent;
        border: none;
        color: #d9534f;
        cursor: pointer;
    }

    .todo-selector {
        display: flex;
        justify-content: center;
    }
</style>