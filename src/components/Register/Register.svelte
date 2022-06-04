<script lang="ts">
    let id = '', password = ''

    async function submit() {
        await fetch('https://api.maemil.kr/api/session/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                password
            })
        })
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
            회원가입
        </button>
    </div>
</div>

<style>
</style>