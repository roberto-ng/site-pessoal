import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface Projeto {
    titulo: string;
    repo: string;
    descricao: string;
    thumbnail: string | null;
    tags: string[];
    plataformas: string[];
    texto: string | null;
}

const pastaProjetos = path.join(process.cwd(), 'projetos');

export async function buscarProjetos(): Promise<Projeto[]> {
    const arquivos = await readdir(pastaProjetos);
    // Ordenar arquivos alfabeticamente 
    const arquivosEmOrdem = arquivos.sort((a: string, b: string) => {
        const nomeA = a.toLowerCase();
        const nomeB = b.toLowerCase();

        if (nomeA < nomeB) {
            return -1;
        }
        else if (nomeA > nomeB) {
            return 1;
        } else {
            return 0;
        }
    });

    const promessas = arquivosEmOrdem.map(async (arquivo) => {
        const caminho = path.join(pastaProjetos, arquivo);
        // Conteúdo do arquivo
        const conteudo = await readFile(caminho, 'utf-8');
        // Pegar dados do arquivo
        const dados = matter(conteudo);

        return {
            titulo: dados.data.titulo ?? '',
            repo: dados.data.repo ?? '',
            descricao: dados.data.descricao ?? '',
            thumbnail: dados.data.thumbnail ?? null,
            tags: dados.data.tags ?? [],
            plataformas: dados.data.plataformas ?? [],
            texto: null,
        };
    });

    // Esperar todos os arquivos serem lidos
    return await Promise.all(promessas);
}

export async function buscarProjeto(repo: string): Promise<Projeto> {
    const arquivo = path.join(pastaProjetos, `${repo}.md`);
    const conteudo = await readFile(arquivo, 'utf-8');
    const dados = matter(conteudo);

    return {
        texto: dados.content,
        titulo: dados.data.titulo ?? '',
        repo: dados.data.repo ?? '',
        descricao: dados.data.descricao ?? '',
        thumbnail: dados.data.thumbnail ?? null,
        tags: dados.data.tags ?? [],
        plataformas: dados.data.plataformas ?? [],
    };
}