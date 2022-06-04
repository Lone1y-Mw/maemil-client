<script lang="ts">
    import { link } from 'svelte-spa-router'
    import FreeboardIcon from '~/icons/FreeboardIcon.svelte'
    import EyeIcon from '~/icons/EyeIcon.svelte'
    import getBoard from '~/functions/board/getBoard'
    import { onMount } from 'svelte'
	import { SyncLoader } from 'svelte-loading-spinners'
    // import ChatIcon from '~/icons/ChatIcon.svelte'

    let loading = true
    let arc = 0
    let boardData: any[]

    onMount(async () => {
        loading = true
        boardData = await getBoard(arc)
        console.log(boardData)
        loading = false
    })

    async function handleMorebutton() {
        console.log('더보기')
    }
</script>

<div class="freeboard">
    <div class="freeboard-title">
        <div class="freeboard-icon"><FreeboardIcon /></div>
        <div>자유게시판</div>
    </div>
    <div class="freeboard-contents">
        {#if loading}
            <div class="loader">
                <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
            </div>
            {:else}
                {#each boardData as { createdAt, href, division, title, uploader, views }}
                    <div class="freeboard-sug">
                        <div class="sug-division">{division}</div>
                        <div class="sug-link">
                            <a
                                href={'/community' + href}
                                class="focus-shadow"
                                use:link>{title}</a>
                        </div>
                        <div class="sug-info">
                            <div class="info-views">
                                <div class="views-icon"><EyeIcon /></div>
                                <div class="views-views">{views}</div>
                            </div>
                            <!-- <div class="info-cc">
                                <div class="cc-icon"><ChatIcon /></div>
                                <div class="cc-cc">{cc}</div>
                            </div> -->
                        </div>
                    </div>
                {/each}
        {/if}
    </div>
    <div class="freeboard-more">
        <button
            type="button"
            on:click={handleMorebutton}>더보기</button>
    </div>
</div>

<style>
    .freeboard {
        width: fit-content;
        margin: 0 auto;
		padding: 1.7em;
		border-radius: 20px;
		background-color: white;
		box-shadow: 1px 1px 50px 5px #D3D3D3;
    }
    
    .freeboard-title {
        display: flex;
        color: #7292ED;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .freeboard-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .freeboard-contents {
    }

    .loader {
        width: 50px;
        height: 50px;
        margin: auto;
    }

    .freeboard-sug {
        position: relative;
        display: flex;
        width: 440px;
        height: 20px;
        margin-bottom: 8px;
    }

    .sug-division {
        width: fit-content;
        height: 20px;
        box-sizing: border-box;
        padding: 3px 9px;
        border-radius: 20px;
        background-color: #7292ED;
        margin-right: 5px;
        font-size: 12px;
        color: #fff;
    }

    .sug-link > a {
        color: #222;
    }

    .sug-info {
        position: absolute;
        right: 0;
    }

    .info-views
    /* ,.info-cc */ {
        display: flex;
        font-size: 14px;
        width: 60px;
    }

    .views-icon {
        margin-right: 3px;
    }

    .views-views {
        color: #94969b;
    }
</style>