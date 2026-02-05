import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { articlesCache } from '$lib/data/articlesCache';

export const GET: RequestHandler = async () => {
    // Return cached data for demo purposes
    return json({ articles: articlesCache });
};
