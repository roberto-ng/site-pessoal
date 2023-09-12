import { List, Set } from "immutable";
import type { Projeto } from "../content/config";

export function getAllTags(projetos: Projeto[]): Set<string> {
    return List(projetos)
        .flatMap(projeto => projeto.plataformas)
        .sort((a, b) => {
            // ordenar como case insensitive
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        })
        .toOrderedSet();
}