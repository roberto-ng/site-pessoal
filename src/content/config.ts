import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
    }),
});

const projetoCollection = defineCollection({
    schema: z.object({
        titulo: z.string(),
        repo: z.string(),
        download_link: z.string(),
        descricao: z.string(),
        thumbnail: z.string(),
        tags: z.array(z.string()),
        plataformas: z.array(z.string())
    }),
});

const textoCollection = defineCollection({
    schema: z.object({}),
});

export const collections = {
    'post': postCollection,
    'projeto': projetoCollection,
    'texto': textoCollection,
};