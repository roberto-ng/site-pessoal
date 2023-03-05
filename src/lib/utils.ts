/** Remove os itens repetidos de uma lista */
export function removerItensRepetidos<T>(array: T[]): T[] {
    return [...new Set(array)];
}

/** Limpa strings para serem usadas nas tags meta */
export function limparMetaTag(texto: string): string {
    return texto
        .split('\n')
        .map(linha => linha.trim())
        .join(' '); // remover quebras de linha da descrição
}

