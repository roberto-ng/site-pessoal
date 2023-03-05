import { Set } from "immutable";
import { Accessor, Component, For } from "solid-js"
import { TagButton } from "./TagButton";

type Props = {
    tags: string[],
    selectedTags: Accessor<Set<string>>,
    onClick: (tag: string) => void,
}

export const TagList: Component<Props> = (props) => {    
    return (
        <div class="flex flex-row flex-wrap items-center justify-center sm:justify-start px-1 md:px-5 my-4">
            <p class="mr-1 text-xl text-slate-700 dark:text-white">
                Filtrar:
            </p>

            <For each={props.tags}>
                {(tag) => (
                    <TagButton
                        tag={tag}
                        isSelected={props.selectedTags().includes(tag)}
                        onClick={() => props.onClick(tag)}
                    />
                )}
            </For>
        </div>
    );
};