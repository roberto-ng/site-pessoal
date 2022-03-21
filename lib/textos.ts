import path from 'path'
import fs from 'fs/promises'
import { remark } from 'remark'
import html from 'remark-html'

const pastaTextos = path.join(process.cwd(), 'textos');

export async function getTexto(id: string) {
    const caminho = path.join(pastaTextos, `${id}.md`);
    const conteudo = await fs.readFile(caminho, 'utf-8');
    const conteudoProcessado = 
        await remark()
            .use(html)
            .process(conteudo);

    return conteudoProcessado.toString();
}