import { defineCollection, z } from 'astro:content';

export type Post = z.infer<typeof postSchema>;

export type Projeto = z.infer<typeof projetoSchema>;

export const postSchema = z.object({
    title: z.string(),
    date: z.string(),
});

export const projetoSchema = z.object({
    titulo: z.string(),
    repo: z.string().optional(),
    download_link: z.string().optional(),
    link: z.string().optional(),
    descricao: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    plataformas: z.array(z.string())
});

export const collections = {
    'post': defineCollection({
        schema: postSchema
    }),

    'projeto': defineCollection({
        schema: projetoSchema,
    }),

    'texto': defineCollection({
        schema: z.object({}),
    }),
};