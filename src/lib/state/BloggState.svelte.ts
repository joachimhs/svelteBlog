import type {Article} from "$lib/types";

export const wait = async (amount: number)   => new Promise(res => setTimeout(res, amount ?? 100));

export class BloggState {
    articles= $state<Article[]>([]);
    isLoading = $state<boolean>(false);
    error =  $state<string | null>(null);
    isLoaded = $state<boolean>(false);

    async loadArticles(reload: boolean = false) {
        if (this.isLoaded || reload) {
            return this.articles;
        }

        this.isLoading = true;
        this.error = null;

        let rawResponse = await fetch('/api/articles');

        if (rawResponse.ok && rawResponse) {
            let content = await rawResponse.json();
            this.articles = content.articles;
            this.isLoaded = true;
        } else {
            this.error = "Feil ved lasting av artikler: " + rawResponse.statusText;
        }

        await wait(1000);
        this.isLoading = false;
    }

    async loadArticle(id: string) {
        if (!this.isLoaded) {
            await this.loadArticles();
        }

        let article = this.articles.find(article => article.id === id);
        if (article) {
            return article;
        } else {
            return null;
        }
    }
}

export const bloggState = new BloggState();