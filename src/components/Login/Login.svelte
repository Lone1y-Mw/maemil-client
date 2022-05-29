<script lang="ts">
    let id = '', password = ''

    async function submit() {
        let data = await fetch('http://localhost:5000/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id,
                password
            })
        }).then(res => res.json())

        console.log(data)
    }
</script>

<div class="login">
    <div>
        <input
            type="text" 
            placeholder="아이디"
            bind:value={id} />
    </div>
    <div>
        <input
            type="password"
            placeholder="비밀번호"
            bind:value={password} />
    </div>
    <div>
        <button
            type="button"
            on:click={submit}>
            로그인
        </button>
    </div>
</div>

<style>
</style>