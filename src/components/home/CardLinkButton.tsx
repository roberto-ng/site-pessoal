import { Component } from "solid-js";

interface Props {
    href: string,
    text: string,
}

export const CardLinkButton: Component<Props> = (props) => {
    return (
        <div class="flex justify-center m-1">
            <a
                href={props.href}
                class="w-28 p-2 text-white no-underline transition-all bg-gray-800 rounded hover:bg-gray-500 dark:bg-zinc-700 dark:hover:bg-zinc-500"
                target="_blank"
                rel="noreferrer"
            >
                {props.text}
            </a>
        </div>
    );
};