<script lang="ts">
    import type { Article } from "$lib/types";
    import {articlesCache} from "$lib/data/articlesCache";

    let articles : Article[] = $state([]);
    let isLoading = $state(true);

    $effect(() => {
        articles = articlesCache;
        isLoading = false;
    })
</script>

<main class="blog-index">
    {#if isLoading}
        <div class="loading">Laster artikler...</div>
    {/if}

    {#if articles && articles.length > 0}
        <div class="article-grid">
            {#each articles as article}
                <div class="article-card">
                    <h2><a href="/articles/{article.id}">{article.title}</a></h2>
                    <p>{article.preamble}</p>
                </div>
            {/each}
        </div>
    {:else}
        <div class="no-articles">Ingen artikler funnet.</div>
    {/if}

</main>

<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .article-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
        max-width: 1000px;
        margin: 0 auto;
        gap: 2rem;
    }
</style>