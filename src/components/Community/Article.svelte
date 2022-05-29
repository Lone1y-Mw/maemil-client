<script lang="ts">
    import EyeIcon from '~/icons/EyeIcon.svelte'
    import { link } from 'svelte-spa-router'
    import { onMount } from 'svelte'
    import getArticle from '~/functions/board/getArticle'
	import { SyncLoader } from 'svelte-loading-spinners'

    export let params: any = {}

    let loading = true
    let article: any

    onMount(async () => {
        loading = true
        article = (await getArticle('/' + params.href))[0]
        console.log(article)
        loading = false
    })

    function handleCommentInput(target: EventTarget) {
        const element = target as HTMLInputElement
        element.style.height = '5px';
        element.style.height = element.scrollHeight + 'px';
    }

    function handleCommentSubmit() {
        const input = document.getElementsByClassName('comment-input')[0] as HTMLInputElement
        if(input.value === '') return
        
        console.log(input.value)
    }
</script>

<div class="article">
    {#if loading}
        <div class="loader">
            <SyncLoader size="50" color="#7292ED" unit="px" duration="1s" />
        </div>
        {:else}
        <div class="head">
            <div class="title">{article.title}</div>
            <div class="uploader">{article.uploader}</div>
            <div class="info">
                <div class="info-views">
                    <div class="views-icon"><EyeIcon /></div>
                    <div class="views-desc">{article.views}</div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="contents">{article.contents}</div>
            <div class="comment">
                <div class="comment-info">
                    댓글 {JSON.parse(article.comments).length}
                </div>
                <div class="comment-new">
                    <textarea
                        placeholder="댓글을 입력하세요"
                        class="comment-input focus-shadow"
                        on:input={e => {
                            if(e.target != null) handleCommentInput(e.target)
                        }} />
                    <button
                        type="button"
                        class="comment-input-done focus-shadow"
                        on:click={handleCommentSubmit}>확인</button>
                </div>
                <div class="comments">
                    {#each JSON.parse(article.comments) as { id, grdp, comment }}
                        <div class="comment-item">
                            <div class="comment-uploader">
                                <div class="uploader-id">{id}</div>
                                <div>&nbsp;·&nbsp;</div>
                                <div class="uploader-grdp">{grdp}</div>
                            </div>
                            <div class="comment-content">{comment}</div>
                        </div>
                        {:else}
                            댓글이 없슴.
                    {/each}
                </div>
            </div>
        </div>
        <!-- <div class="foot">
            <div class="article-sug">
                {#each sugArticle as { title, div, views, href }}
                    <div class="article-item">
                        <div class="sug-division">{div}</div>
                        <div class="sug-link">
                            <a
                                {href}
                                class="focus-shadow"
                                use:link>{title}</a>
                        </div>
                    </div>
                {/each}
            </div>
        </div> -->
    {/if}
</div>

<style>
    .article {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .loader {
        width: 50px;
        height: 50px;
        margin: auto;
    }

    .head {
        margin-bottom: 40px;
    }

    .title {
        font-size: 20px;
        font-weight: bold;
    }

    .info-views {
        display: flex;
        font-size: 14px;
        width: 60px;
    }

    .views-icon {
        margin-right: 3px;
    }

    .views-desc {
        color: #94969b;
    }

    .body {
        margin-bottom: 80px;
    }

    .contents {
        margin-bottom: 40px;
    }

    .comment-info {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .comment-new {
        display: flex;
        margin-bottom: 20px;
    }

    .comment-input {
        width: calc(85% - 8px);
        height: 40px;
        min-height: 40px;
        outline: none;
        border: 1px solid #ccc;
        padding: 10px;
        box-sizing: border-box;
        font-size: 15px;
        border-radius: 3px;
        margin-right: 8px;
        resize: none;
        overflow: hidden;
    }

    .comment-input-done {
        width: 15%;
        height: 40px;
        background: #7292ED;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        border-radius: 3px;
        border: none;
    }

    .comment-item {
        margin-bottom: 20px;
    }

    .comment-uploader {
        display: flex;
        color: #94969b;
    }

    .uploader-grdp {
    }

    .uploader-id {
    }

    .article-sug {
        width: fit-content;
        margin: 0 auto;
    }

    .article-item {
        position: relative;
        display: flex;
        max-width: 440px;
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
</style>