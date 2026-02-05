export interface Article {
    id: string;
    title: string;
    publishedDate: string;
    topics: string;
    preamble: string;
    thumbnail: string;
    contents: string; // Markdown content
    author: string;
    isPublished?: boolean;
}

export interface ArticleDatabase {
    articles: Article[];
}