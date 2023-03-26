import { CollectionEntry } from "astro:content";
import { Component, createSignal, For, Show } from "solid-js";
import { ProjetoCard } from "./ProjetoCard";
import { List, Set } from "immutable";
import { TagList } from "./TagList";
import { Projeto } from "@/src/content/config";

type Props = {
    nome: string,
    projetos: Projeto[],
};

export const ProjetoGaleria: Component<Props> = (props) => {
    const [selectedTag, setSelectedTag] = createSignal<string | null>(null);

    const tags = getAllTags(props.projetos);

    const projetosExibidos = () => {
        if (selectedTag() != null) {
            // mostrar apenas projetos com a tag selecionada
            return props.projetos.filter(projeto => projeto.plataformas.includes(selectedTag()!));
        } else {
            // mostrar todos projetos
            return props.projetos;
        }
    };

    const handleTagClick = (tag: string) => {
        if (selectedTag() === tag) {
            // remover tag
            setSelectedTag(null);
        } else {
            // selecionar tag
            setSelectedTag(tag);
        }
    };

    const limparFiltro = () => {
        // limpar tags
        setSelectedTag(null);
    };

    return (
        <div class="flex flex-col items-center py-6 min-h-[570px] w-screen max-w-screen-2xl">
            <h1 class="text-3xl text-center font-asap dark:text-white">
                {props.nome}:
            </h1>

            <TagList
                tags={tags}
                selectedTag={selectedTag}
                onClick={handleTagClick}
            />

            <Show when={projetosExibidos().length === 0}>
                <div class="flex flex-col items-center pt-3 w-full">
                    <p class="text-center text-3xl text-slate-700 dark:text-white">
                        Nenhum projeto encontrado.
                    </p>
                </div>
            </Show>

            <div class="grid items-center justify-center gap-5 mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                <For each={projetosExibidos()}>
                    {(projeto) => <ProjetoCard projeto={projeto} />}
                </For>
            </div>

            <Show when={selectedTag() != null}>
                <div class="flex flex-col items-center m-2">
                    <button
                        class="text-2xl underline text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 hover:text-zinc-500"
                        onclick={limparFiltro}
                    >
                        Mostrar todos os projetos
                    </button>
                </div>
            </Show>
        </div>
    );
}

function getAllTags(projetos: Projeto[]): Set<string> {
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