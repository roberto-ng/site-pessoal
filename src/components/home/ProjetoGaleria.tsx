import { CollectionEntry } from "astro:content";
import { Component, createSignal, For } from "solid-js";
import { ProjetoCard } from "./ProjetoCard";
import { List, Set } from "immutable";
import { TagList } from "./TagList";

type Projeto = CollectionEntry<'projeto'>;

type Props = {
    nome: string,
    projetos: Projeto[],
};

export const ProjetoGaleria: Component<Props> = (props) => {
    const [selectedTags, setSelectedTags] = createSignal(Set<string>());

    const tags = getAllTags(props.projetos);

    const projetosFiltrados = () => {
        const projectHasSelectedTags = (projeto: Projeto) => {
            return selectedTags()
                .every(tag => projeto.data.plataformas.includes(tag));
        }

        if (selectedTags().size > 0) {
            // mostrar apenas projetos com as plataforma selecionada
            return props.projetos.filter(projectHasSelectedTags);
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
        <div class="px-5 min-h-[570px] w-screen max-w-screen-2xl">
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
        ) // buscar todas as plataformas
        .sort() // ordenar alfabeticamente
        .toArray();
}

function getProjectTags(projeto: CollectionEntry<'projeto'>) {
    return projeto.data.plataformas
        .filter(tag => tag != null); // remover itens nulos
}