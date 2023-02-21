import { defineCollection, z } from 'astro:content';

export const collections = {
    'post': defineCollection({
        schema: z.object({
            title: z.string(),
            date: z.coerce.date(),
        }),
    }),

    'projeto': defineCollection({
        schema: z.object({
            titulo: z.string(),
            repo: z.string().optional(),
            download_link: z.string().optional(),
            link: z.string().optional(),
            descricao: z.string(),
            thumbnail: z.string(),
            tags: z.array(z.string()),
            plataformas: z.array(z.string())
        }),
    }),

    'texto': defineCollection({
        schema: z.object({}),
    }),
};