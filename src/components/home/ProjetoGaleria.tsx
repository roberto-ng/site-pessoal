import { Component, createEffect, createMemo, createSignal, For } from "solid-js";
import { CollectionEntry } from "astro:content";
import { ProjetoCard } from "./ProjetoCard";
import { List, Set } from "immutable";
import { Projeto } from "@/src/lib/projeto";
import { TagButton } from "./TagButton";
import { TagList } from "./TagList";

type Props = {
    nome: string,
    projetos: CollectionEntry<'projeto'>[],
};

export const ProjetoGaleria: Component<Props> = (props) => {
    const [selectedTags, setSelectedTags] = createSignal(Set<string>());

    const tags = getAllTags(props.projetos);
    
    const projetosFiltrados = () => {
        const isTagSelected = (tag) => selectedTags().includes(tag);

        if (selectedTags().size > 0) {
            // mostrar apenas projetos com alguma plataforma selecionada
            return props.projetos.filter(({ data }) => data.plataformas.some(isTagSelected));
        } else {
            return props.projetos;
        }
    };

    const handleTagClick = (tag: string) => {
        if (selectedTags().includes(tag)) {
            // remover tag ao filtro
            setSelectedTags(selectedTags().remove(tag));
        } else {
            // selecionar tag ao filtro
            setSelectedTags(selectedTags().add(tag));
        }
    };

    return (
        <div>
            <h1 class="text-3xl text-center font-asap dark:text-white">
                {props.nome}:
            </h1>

            <TagList
                tags={tags}
                selectedTags={selectedTags}
                onClick={handleTagClick}
            />

            <div class="grid items-center justify-center gap-5 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <For each={projetosFiltrados()}>
                    {(projeto) => <ProjetoCard projeto={projeto} />}
                </For>
            </div>
        </div>
    );
}

function getAllTags(projetos: CollectionEntry<'projeto'>[]) {
    return projetos
        .reduce(
            (tags, projeto) => tags.merge(getProjectTags(projeto)),
            Set<string>(),
        ) // buscar todas as tags
        .sort() // ordenar alfabeticamente
        .toArray();
}

function getProjectTags(projeto: CollectionEntry<'projeto'>) {
    return projeto.data.plataformas
        .filter(tag => tag != null); // remover itens nulos
}