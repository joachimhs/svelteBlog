# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --install npm svelteBlog
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Steg 1 - Blogg index 
## etter commit 508ff6194508224425b6169df55f1b7942569ff7

<details>
  <summary>/src/routes/+layout.svelte</summary>

```diff
+<slot></slot>
```
</details>

<details>
  <summary>/src/routes/+page.svelte</summary>

```diff
+<script lang="ts">
+    import type { Article } from "$lib/types";
+    import {articlesCache} from "$lib/data/articlesCache";
+
+    let articles : Article[] = $state([]);
+    let isLoading = $state(true);
+
+    $effect(() => {
+        articles = articlesCache;
+        isLoading = false;
+    })
+</script>
+
+<main class="blog-index">
+    {#if isLoading}
+        <div class="loading">Laster artikler...</div>
+    {/if}
+
+    {#if articles && articles.length > 0}
+        <div class="article-grid">
+            {#each articles as article}
+                <div class="article-card">
+                    <h2><a href="/articles/{article.id}">{article.title}</a></h2>
+                    <p>{article.preamble}</p>
+                </div>
+            {/each}
+        </div>
+    {:else}
+        <div class="no-articles">Ingen artikler funnet.</div>
+    {/if}
+
+</main>
+
+<style>
+    .loading {
+        display: flex;
+        justify-content: center;
+        align-items: center;
+        height: 100vh;
+    }
+
+    .article-grid {
+        display: grid;
+        grid-template-columns: repeat(auto-fill, 300px);
+        max-width: 1000px;
+        margin: 0 auto;
+        gap: 2rem;
+    }
+</style>
```
</details>

# Steg 2 - Oppretter shared state for artikler og XHR fetch

<details>
  <summary>/src/lib/state/BloggState.svelte.ts</summary>

```diff
+import type {Article} from "$lib/types";
+
+export const wait = async (amount: number)   => new Promise(res => setTimeout(res, amount ?? 100));
+
+export class BloggState {
+    articles= $state<Article[]>([]);
+    isLoading = $state<boolean>(false);
+    error =  $state<string | null>(null);
+    isLoaded = $state<boolean>(false);
+
+    async loadArticles(reload: boolean = false) {
+        if (this.isLoaded || reload) {
+            return this.articles;
+        }
+
+        this.isLoading = true;
+        this.error = null;
+
+        let rawResponse = await fetch('/api/articles');
+
+        if (rawResponse.ok && rawResponse) {
+            let content = await rawResponse.json();
+            this.articles = content.articles;
+            this.isLoaded = true;
+        } else {
+            this.error = "Feil ved lasting av artikler: " + rawResponse.statusText;
+        }
+
+        await wait(1000);
+        this.isLoading = false;
+    }
+
+    async loadArticle(id: string) {
+        if (!this.isLoaded) {
+            await this.loadArticles();
+        }
+
+        return this.articles.find(article => article.id === id);
+    }
+}
+
+export const bloggState = new BloggState();
```
</details>

<details>
  <summary>/src/routes/+page.svelte</summary>

```diff
 <script lang="ts">
     import type { Article } from "$lib/types";
-    import {articlesCache} from "$lib/data/articlesCache";
+    import { bloggState} from "$lib/state/BloggState.svelte";
 
     let articles : Article[] = $state([]);
-    let isLoading = $state(true);
 
     $effect(() => {
-        articles = articlesCache;
-        isLoading = false;
-    })
+        bloggState.loadArticles();
+    });
+
+    $effect(() => {
+        articles = bloggState.articles;
+    });
 </script>
 
 <main class="blog-index">
-    {#if isLoading}
+    {#if bloggState.isLoading}
         <div class="loading">Laster artikler...</div>
     {/if}
     
```
</details>

# Steg 3 - Implementerer en enkel side header som en komponent

<details>
  <summary>/src/lib/components/Header.svelte</summary>

```diff
+<section class="header-area">
+  <div class="site-name">Svelte Blog</div>
+</section>
+
+<style>
+  .header-area {
+    background: var(--bg-primary);
+    border-bottom: 1px solid var(--border-default);
+    padding: 1.5rem 2rem;
+    display: flex;
+    align-items: center;
+    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
+    position: relative;
+    z-index: 100;
+  }
+
+  .site-name {
+    font-size: clamp(1.5rem, 4vw, 2.25rem);
+    font-weight: 700;
+    color: var(--text-primary);
+    margin: 0;
+    letter-spacing: -0.5px;
+    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
+    transition: color 0.2s ease;
+  }
+
+  .site-name:hover {
+    color: var(--text-accent);
+  }
+
+  /* Responsiv: mindre skjermer */
+  @media (max-width: 768px) {
+    .header-area {
+      padding: 1rem;
+    }
+
+    .site-name {
+      font-size: clamp(1.3rem, 6vw, 2rem);
+    }
+  }
+</style>
```
</details>

<details>
  <summary>/src/routes/+layout.svelte</summary>

```diff
+<script>
+    import Header from "$lib/components/Header.svelte";
+</script>
+
+<Header></Header>
+
 <slot></slot>
```
</details>


# Steg 4 - Implementerer Blogg artikkel

<details>
  <summary>/src/lib/components/Markdown.svelte</summary>

```diff
+<script lang="ts">
+    import {marked} from "marked";
+
+    let {
+        toHtml
+    } = $props();
+
+    marked.use({
+        mangle: false,
+        headerIds: false
+    });
+</script>
+
+{#if toHtml}
+    {@html marked(toHtml) }
+{/if}
```
</details>


<details>
  <summary>/src/lib/state/BloggState.svelte.ts</summary>

```diff
         export class BloggState {
             await this.loadArticles();
         }
 
-        return this.articles.find(article => article.id === id);
+        let article = this.articles.find(article => article.id === id);
+        if (article) {
+            return article;
+        } else {
+            return null;
+        }
     }
 }
```
</details>

<details>
  <summary>/src/routes/+layout.svelte</summary>

```diff
 
 <Header></Header>
 
-<slot></slot>
\ No newline at end of file
+<slot></slot>
+
+<style>
+    :global(a) {
+        text-decoration: none;
+        color: inherit; /* Optional: to keep the link color consistent with surrounding text */
+    }
+
+    :global(a:hover) {
+        color: #007bff; /* Optional: change color on hover */
+    }
+
+    :global(a:visited) {
+        color: inherit; /* Optional: change color for visited links */
+    }
+</style>
```
</details>

<details>
  <summary>/src/routes/articles/[articleId]/+page.svelte</summary>

```diff
+<script lang="ts">
+    import type { Article } from "$lib/types";
+    import { bloggState} from "$lib/state/BloggState.svelte.js";
+    import { page } from '$app/state';
+    import {onMount} from "svelte";
+    import Markdown from "$lib/components/Markdown.svelte";
+
+    let isLoading = $state<boolean>(false);
+    let article = $state<Article | null>(null);
+
+    onMount(async () => {
+        if (page.params.articleId) {
+            article = await bloggState.loadArticle(page.params.articleId);
+        }
+    });
+
+
+</script>
+
+{#if bloggState.isLoading}
+    <div class="loading">Laster artikler...</div>
+{/if}
+
+<div class="buttons">
+    <a href="/" class="back-button">Tilbake til forsiden...</a>
+</div>
+
+
+{#if article}
+    <article class="blog-post">
+        <h1>{article.title}</h1>
+        <div class="blog-time">{article.publishedDate}</div>
+        <div class="blog-content">
+            <Markdown toHtml={article.contents}></Markdown>
+        </div>
+    </article>
+{:else}
+    <p>Ingen artikkel funnet...</p>
+{/if}
+
+<style>
+    .blog-post {
+        max-width: 1000px;
+        margin: 0 auto;
+    }
+
+    .buttons {
+        max-width: 1000px;
+        margin: 25px auto;
+    }
+
+    .buttons .back-button {
+        margin-top: 55px;
+        padding: 10px 17px;
+        border: 1px solid #ddd;
+        background: aliceblue;
+        border-radius: 7px;
+    }
+</style>
```
</details>


# Steg 6 - Legger til en egen app.css fil



<details>
  <summary>/src/app.css</summary>

```diff
+a {
+    text-decoration: none;
+    color: inherit; /* Optional: to keep the link color consistent with surrounding text */
+}
+
+a:hover {
+    color: #007bff; /* Optional: change color on hover */
+}
+
+a:visited {
+    color: inherit; /* Optional: change color for visited links */
+}
```
</details>

<details>
  <summary>/src/routes/+layout.svelte</summary>

```diff
 <script>
+    import '../app.css';
     import Header from "$lib/components/Header.svelte";
 </script>
 
@@ -7,16 +8,5 @@
 <slot></slot>
 
 <style>
-    :global(a) {
-        text-decoration: none;
-        color: inherit; /* Optional: to keep the link color consistent with surrounding text */
-    }
 
-    :global(a:hover) {
-        color: #007bff; /* Optional: change color on hover */
-    }
-
-    :global(a:visited) {
-        color: inherit; /* Optional: change color for visited links */
-    }
 </style>
```
</details>