import { Projeto } from "@/src/content/config";
import { CollectionEntry } from "astro:content";
import clsx from "clsx";
import { Component, For, Show } from "solid-js";
import { CardLinkButton } from "./CardLinkButton";
import { TagButton } from "./TagButton";

interface Props {
    projeto: Projeto,
}

export const ProjetoCard: Component<Props> = (props) => {
    return (
        <div
            class={clsx([
                'w-[90vw] sm:w-[300px] sm:min-w-[300px] min-h-[460px]',
                'text-slate-700 dark:text-white bg-white dark:bg-zinc-800',
                'rounded-t-md rounded-b shadow-lg dark:shadow-xl text-center',
            ])}
        >
            <img
                src={props.projeto.thumbnail}
                class="h-[180px] w-full object-cover rounded-t-md"
                loading="lazy"
            />

            <div class="p-1 pt-0">
                <p class="mx-1 mt-1 text-xl font-bold text-center">
                    {props.projeto.titulo}
                </p>

                <p class="mx-1 text-center">
                    {props.projeto.descricao}
                </p>

                <div class="flex flex-row flex-wrap justify-center">
                    <Show when={props.projeto.link != null}>
                        <CardLinkButton
                            href={props.projeto.link!}
                            text="Abrir site"
                        />
                    </Show>

                    <Show when={props.projeto.download_link != null}>
                        <CardLinkButton
                            href={props.projeto.download_link!}
                            text="Baixar"
                        />
                    </Show>

                    <Show when={props.projeto.repo != null}>
                        <CardLinkButton
                            href={`https://github.com/roberto-ng/${props.projeto.repo}`}
                            text="Repositório"
                        />
                    </Show>
                </div>

                <div class="text-lg text-center">
                    <p>Feito com: </p>
                    <div class="flex flex-row flex-wrap items-center justify-center whitespace-nowrap">
                        <For each={props.projeto.tags}>
                            {(tag) => <TagButton tag={tag} />}
                        </For>
                    </div>
                </div>

                <div class="text-lg text-center">
                    <p>Disponível para: </p>
                    <div class="flex flex-row flex-wrap items-center justify-center whitespace-nowrap">
                        <For each={props.projeto.plataformas}>
                            {(plataforma) => <TagButton tag={plataforma} />}
                        </For>
                    </div>
                </div>
            </div>
        </div>

    );
};