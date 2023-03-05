import { CollectionEntry } from "astro:content";
import { Component, For, Show } from "solid-js";
import { CardLinkButton } from "./CardLinkButton";
import { TagButton } from "./TagButton";

interface Props {
    projeto: CollectionEntry<'projeto'>,
}

export const ProjetoCard: Component<Props> = (props) => {
    return (
        <div class="sm:w-[300px] sm:min-w-[300px] mx-5 text-slate-700 dark:text-white min-h-[430px] bg-white dark:bg-zinc-800 rounded-t-md rounded-b shadow-lg dark:shadow-xl text-center">
            <img
                src={props.projeto.data.thumbnail}
                class="h-[180px] w-full object-cover rounded-t-md"
                loading="lazy"
            />

            <div class="p-1 pt-0">
                <p class="mx-1 mt-0 text-xl font-bold text-center">
                    {props.projeto.data.titulo}
                </p>

                <p class="mx-1 text-center">
                    {props.projeto.data.descricao}
                </p>

                <div class="flex flex-row flex-wrap justify-center">
                    <Show when={props.projeto.data.link != null}>
                        <CardLinkButton
                            href={props.projeto.data.link!}
                            text="Abrir site"
                        />
                    </Show>

                    <Show when={props.projeto.data.download_link != null}>
                        <CardLinkButton
                            href={props.projeto.data.download_link!}
                            text="Baixar"
                        />
                    </Show>

                    <Show when={props.projeto.data.repo != null}>
                        <CardLinkButton
                            href={`https://github.com/roberto-ng/${props.projeto.data.repo}`}
                            text="Repositório"
                        />
                    </Show>
                </div>

                <div class="text-lg text-center">
                    <p>Feito com: </p>
                    <div class="flex flex-row flex-wrap items-center justify-center whitespace-nowrap">
                        <For each={props.projeto.data.tags}>
                            {(tag) => <TagButton tag={tag} />}
                        </For>
                    </div>
                </div>

                <div class="text-lg text-center">
                    <p>Disponível para: </p>
                    <div class="flex flex-row flex-wrap items-center justify-center whitespace-nowrap">
                        <For each={props.projeto.data.plataformas}>
                            {(plataforma) => <TagButton tag={plataforma} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>

    );
};