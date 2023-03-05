import { CollectionEntry } from "astro:content";
import { Component, createSignal, For, Show } from "solid-js";
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
        // checa se o projeto possui todas as tags selecionadas
        const projectHasSelectedTags = (projeto: Projeto) => {
            return selectedTags()
                .every(tag => projeto.data.plataformas.includes(tag));
        }

        if (selectedTags().size > 0) {
            // mostrar apenas projetos com as tags selecionada
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
            // adicionar tag ao filtro
            setSelectedTags(selectedTags().add(tag));
        }
    };

    const handleResetFiltersClick = () => {
        // limpar filtros
        setSelectedTags(selectedTags().clear());
    };

    return (
        <div class="px-1 md:px-5 py-6 min-h-[570px] w-screen max-w-screen-2xl">
            <h1 class="text-3xl text-center font-asap dark:text-white">
                {props.nome}:
            </h1>

            <TagList
                tags={tags}
                selectedTags={selectedTags}
                onClick={handleTagClick}
            />

            <Show when={projetosFiltrados().length === 0}>
                <div class="flex flex-col items-center pt-3 w-full">
                    <p class="text-center text-3xl text-slate-700 dark:text-white">
                        Nenhum projeto encontrado.
                    </p>
                </div>
            </Show>

            <div class="grid items-center justify-center gap-5 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <For each={projetosFiltrados()}>
                    {(projeto) => <ProjetoCard projeto={projeto} />}
                </For>
            </div>

            <Show when={selectedTags().size > 0}>
                <div class="flex flex-col items-center m-2">
                    <button
                        class="text-2xl underline text-gray-800 dark:text-gray-400 dark:hover:text-gray-500 hover:text-zinc-500"
                        onclick={handleResetFiltersClick}
                    >
                        Mostrar todos os projetos
                    </button>
                </div>
            </Show>
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