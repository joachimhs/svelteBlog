<script lang="ts">
    import type { Article } from "$lib/types";
    import { bloggState} from "$lib/state/BloggState.svelte.js";
    import { page } from '$app/state';
    import {onMount} from "svelte";
    import Markdown from "$lib/components/Markdown.svelte";

    let isLoading = $state<boolean>(false);
    let article = $state<Article | null>(null);

    onMount(async () => {
        if (page.params.articleId) {
            article = await bloggState.loadArticle(page.params.articleId);
        }
    });


</script>

{#if bloggState.isLoading}
    <div class="loading">Laster artikler...</div>
{/if}

<div class="buttons">
    <a href="/" class="back-button">Tilbake til forsiden...</a>
</div>


{#if article}
    <article class="blog-post">
        <h1>{article.title}</h1>
        <div class="blog-time">{article.publishedDate}</div>
        <div class="blog-content">
            <Markdown toHtml={article.contents}></Markdown>
        </div>
    </article>
{:else}
    <p>Ingen artikkel funnet...</p>
{/if}

<style>
    .blog-post {
        max-width: 1000px;
        margin: 0 auto;
    }

    .buttons {
        max-width: 1000px;
        margin: 25px auto;
    }

    .buttons .back-button {
        margin-top: 55px;
        padding: 10px 17px;
        border: 1px solid #ddd;
        background: aliceblue;
        border-radius: 7px;
    }
</style>