import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { articlesCache } from '$lib/data/articlesCache';

export const GET: RequestHandler = async ({ params }) => {
    const { articleId } = params;

    if (!articleId) {
        return json(
            { error: 'Article ID is required' },
            { status: 400 }
        );
    }

    // Find article in cache
    // Support both full ID (with date prefix) and slug-only format
    const article = articlesCache.find(a =>
        a.id === articleId || a.id.endsWith(`-${articleId}`)
    );

    if (!article) {
        return json(
            { error: 'Article not found' },
            { status: 404 }
        );
    }

    return json({ article });
};
