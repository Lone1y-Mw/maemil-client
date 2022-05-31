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

    let loading: boolean

    type Todo = {
        todoId: string;
        done: boolean;
        desc: string;
    }
    let todos: Todo[] = []
    let todo_done: string[] = JSON.parse(localStorage.getItem('todo-done') || '[]')

    type Grdp = {
        grd: number;
        grp: number;
    }
    let classes: Grdp[] = []

    let todoLatestGrdp: Grdp = JSON.parse(localStorage.getItem('todo-latest-grdp') || '{ "grd": 1, "grp": 1 }')
    let grd = todoLatestGrdp.grd
    let grp = todoLatestGrdp.grp
    let selected = grd + '-' + grp

    onMount(async () => {
        loading = true
        todos = await getTodo(grd, grp)
        todo_done.forEach(td => {
            todos.map(t => {
                if(t.todoId === td) t.done = true
            })
        })
        loading = false
    })

    async function initClasses() {
        const timetableList = await getTimetable()

        for(let grd in timetableList) {
            let timetable = timetableList[grd]
            for(let grp in timetable) {
                classes.push({ grd: +grd, grp: +grp })
            }
        }
    }

    function updateTododoneStorage(todo_done: string[]) {
        localStorage.setItem('todo-done', JSON.stringify(todo_done))
    }

    async function handleNewtodo() {
        const input = document.getElementsByClassName('new-todo-input')[0] as HTMLInputElement

        if(input.value === '') return

        const todoId = randomString()
        const res = await regTodo(grd, grp, todoId, input.value)
        if(res.success) {
            const todo: Todo = {
                todoId,
                done: false,
                desc: input.value
            }
            todos = [todo, ...todos]
            input.value = ''
        }
    }

    async function handleSelector(target: EventTarget) {
        loading = true
        const value = (target as HTMLSelectElement).value
        const grdp = value.split('-')
        grd = +grdp[0]
        grp = +grdp[1]

        localStorage.setItem('todo-latest-grdp', `{ "grd": ${grd}, "grp": ${grp} }`)
        
        todos = await getTodo(grd, grp)

        todo_done.forEach(td => {
            todos.map(t => {
                if(t.todoId === td) t.done = true
            })
        })
        loading = false
    }
    
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
                on:click={handleNewtodo}>확인</button>
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
                                    updateTododoneStorage(todo_done)
                                }}>
                            {todo.desc}
                            <button
                                class="todo-btn-remove"
                                on:click={() => {
                                    removeTodo(grd, grp, todo.todoId)
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
                                    updateTododoneStorage(todo_done)
                                }}>
                            {todo.desc}
                            <button
                                class="todo-btn-remove"
                                on:click={async () => {
                                    const res = await removeTodo(grd, grp, todo.todoId)
                                    if(res.success) {
                                        todos = todos.filter(t => t !== todo)
                                        todo_done = todo_done.filter(t => t !== todo.todoId)
                                        updateTododoneStorage(todo_done)
                                    }
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
                        on:change={e => e?.target && handleSelector(e.target)}>
                        {#each classes as { grd, grp }}
                            <option value={`${grd}-${grp}`}>{`${grd}학년 ${grp}반`}</option>
                        {/each}
                    </select>
                </div>
            </div>
    {/await}
</div>

<style lang="scss">
    .todo {
		max-width: 320px;
        width: 100%;
        height: 100%;
		padding: 25px;
		border-radius: 40px;
		background-color: #fff;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
        .top {
            .todo-input {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
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
                    background: $primary-color-default;
                    color: #fff;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: 10px;
                    border: none;
                }
            }
            .todo-input-desc {
                font-size: 13px;
                text-align: center;
                margin-bottom: 10px;
                .todo-text-warning {
                    color: $text-color-warning;
                }
            }
        }
        .middle {
            padding-bottom: 7px;
            .todo-loader {
                width: 50px;
                height: 50px;
                margin: auto;
            }
            .todo-over, .todo-under {
                box-sizing: border-box;
                .start, .finish {
                    margin-bottom: 7px;
                }
                .todo-label {
                    position: relative;
                    display: block;
                    font-size: 16px;
                    line-height: 1;
                    padding: 8px;
                    margin: 0 auto 8px;
                    border-radius: 2px;
                    background-color: #eee;
                    user-select: none;
                    word-wrap: break-word;
                }
                .todo-btn-remove {
                    position: absolute;
                    top: 50%;
                    right: 8px;
                    transform: translateY(-50%);
                    box-sizing: border-box;
                    background-color: transparent;
                    border: none;
                    color: $text-color-warning;
                    cursor: pointer;
                }
            }
            .todo-under {
                .todo-label {
                    background-color: $primary-color-default;
                    color: #fff;
                }
            }
        }
        .bottom {
            .todo-selector {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>