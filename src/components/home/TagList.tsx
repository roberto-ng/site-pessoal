import { Set } from "immutable";
import { Accessor, Component, For } from "solid-js"
import { TagButton } from "./TagButton";

type Props = {
    tags: Set<string>,
    selectedTag: Accessor<string | null>,
    onClick: (tag: string) => void,
}

export const TagList: Component<Props> = (props) => {    
    return (
        <div class="flex flex-row flex-wrap items-center justify-center lg:justify-start w-full px-1 md:px-8 my-4">
            <p class="mr-1 text-xl text-slate-700 select-none dark:text-white">
                Filtrar:
            </p>

            <For each={props.tags.toArray()}>
                {(tag) => (
                    <TagButton
                        tag={tag}
                        isSelected={props.selectedTag() === tag}
                        onClick={() => props.onClick(tag)}
                    />
                )}
            </For>
        </div>
    );
};