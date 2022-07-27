export type Projeto = {
    titulo: string;
    repo: string | null;
    descricao: string;
    thumbnail: string | null;
    link: string | null;
    download_link: string | null,
    tags: string[];
    plataformas: string[];
};