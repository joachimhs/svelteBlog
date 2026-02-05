import type { Article } from '$lib/types';

/**
 * Static cache of generic example articles for demo purposes.
 * This cache is shared across all API endpoints and used in tutorials, previews, and UI testing.
 */
export const articlesCache: Article[] = [
    {
        "id": "getting-started-with-svelte-5",
        "title": "Getting Started with Svelte 5: Modern Web Development Made Simple",
        "publishedDate": "2025-11-17",
        "topics": "Svelte, Web Development, JavaScript, Frontend",
        "preamble": "Svelte 5 introduces a powerful new reactivity system using runes like $state and $derived, making it easier than ever to build fast, reactive user interfaces without the overhead of a virtual DOM.",
        "thumbnail": "/images/svelte5-thumbnail.jpg",
        "contents": "# Why Svelte 5?\n\nSvelte 5 moves away from traditional frameworks by compiling your code into highly efficient vanilla JavaScript. With runes, you no longer need complex stores or reactive statements — state is declared simply with $state(), and computed values use $derived().\n\n## Getting Started\n\nTo start a new Svelte 5 project:\n\n```bash\nnpx create-svelte@latest my-app\ncd my-app\nnpm install\n```\n\nUse `npm run dev` to start the development server. No bundler configuration needed — Svelte handles it all.",
        "author": "Demo Author",
        "isPublished": true
    },
    {
        "id": "understanding-api-design-best-practices",
        "title": "API Design Best Practices: Building Scalable and Maintainable Endpoints",
        "publishedDate": "2025-11-14",
        "topics": "API, REST, HTTP, Backend, Design Patterns",
        "preamble": "A well-designed API is the backbone of modern applications. In this article, we explore common pitfalls and proven patterns to ensure your APIs are intuitive, scalable, and future-proof.",
        "thumbnail": "/images/api-design-thumbnail.jpg",
        "contents": "# Key Principles of API Design\n\n## 1. Consistent Naming\nUse plural nouns for collections (e.g., `/users`) and singular for single resources (`/user/{id}`).\n\n## 2. Status Codes Matter\nReturn appropriate HTTP status codes: `201` for created resources, `404` for not found, and `422` for validation errors.\n\n## 3. Versioning\nAlways version your API — preferably via URL path (`/v1/users`). Avoid header-based versioning unless necessary.\n\n## 4. Documentation First\nWrite API documentation before writing code. Use OpenAPI/Swagger to generate interactive docs automatically.",
        "author": "Demo Author",
        "isPublished": true
    },
    {
        "id": "building-a-blog-with-sveltekit-and-typescript",
        "title": "Building a Blog with SvelteKit and TypeScript: A Complete Guide",
        "publishedDate": "2025-11-10",
        "topics": "SvelteKit, TypeScript, Blogging, SSR, Static Site Generation",
        "preamble": "In this guide, we walk through building a full-featured blog using SvelteKit and TypeScript — from routing and data fetching to styling and performance optimization.",
        "thumbnail": "/images/blog-sveltekit-thumbnail.jpg",
        "contents": "# Setting Up Your Blog Project\n\nStart by creating a SvelteKit project:\n\n```bash\nnpx create-svelte@latest my-blog\n```\n\nChoose **TypeScript** and **standard template**. Add our first page: `src/routes/blog/[slug]/+page.ts`.\n\n## Loading Data\n\nUse the `load` function to fetch articles from a static cache or CMS:\n\n```ts\nimport { articlesCache } from '$lib/data/articlesCache';\n\nexport function load() {\n  return { articles: articlesCache };\n}\n```\n\n## Styling the Blog\n\nUse Svelte's component-scoped styles and CSS variables for theme consistency. Leverage :global() to style Markdown content rendered with `{@html}`.",
        "author": "Demo Author",
        "isPublished": true
    }
];
