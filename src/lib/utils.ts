/** Remove os itens repetidos de uma lista */
export function removerItensRepetidos<T>(array: T[]): T[] {
    return [...new Set(array)];
}