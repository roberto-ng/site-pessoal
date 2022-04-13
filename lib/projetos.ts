import { readFile, readdir } from 'fs/promises'
import path from 'path'
import YAML from 'yaml'

export interface Projeto {
    titulo: string;
    repo: string;
    descricao: string;
    thumbnail: string | null;
    link: string | null;
    tags: string[];
    plataformas: string[];
}

const pastaProjetos = path.join(process.cwd(), 'data/projetos');

function lerDados(arquivo: string): Projeto {
    const dados = YAML.parse(arquivo);

    return {
        titulo: dados.titulo ?? '',
        repo: dados.repo ?? '',
        descricao: dados.descricao ?? '',
        thumbnail: dados.thumbnail ?? null,
        link: dados.link ?? null,
        tags: dados.tags ?? [],
        plataformas: dados.plataformas ?? [],
    };
}

export async function buscarProjetos(): Promise<Projeto[]> {
    const arquivos = await readdir(pastaProjetos);
    // Ordenar arquivos 
    const arquivosEmOrdem = arquivos.sort((a: string, b: string) => {
        const nomeA = a.toLowerCase();
        const nomeB = b.toLowerCase();

        if (nomeA > nomeB) {
            return -1;
        }
        else if (nomeA < nomeB) {
            return 1;
        } else {
            return 0;
        }
    });

    const promessas = arquivosEmOrdem.map(async (arquivo) => {
        const caminho = path.join(pastaProjetos, arquivo);
        // Conteúdo do arquivo
        const conteudo = await readFile(caminho, 'utf-8');
        // ler dados do arquivo
        return lerDados(conteudo);
    });

    // Esperar todos os arquivos serem lidos
    return await Promise.all(promessas);
}

export async function buscarProjeto(repo: string): Promise<Projeto> {
    const arquivo = path.join(pastaProjetos, `${repo}.yaml`);
    const conteudo = await readFile(arquivo, 'utf-8');
    return lerDados(conteudo);
}