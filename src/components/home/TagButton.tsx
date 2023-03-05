import { Component } from "solid-js";
import clsx from 'clsx';

type Props = {
    tag: string,
    isSelected?: boolean,
    onClick?: () => void,
}

export const TagButton: Component<Props> = (props) => {
    return (
        <button
            class={clsx([
                (props.isSelected) 
                    ? 'bg-gray-800 dark:bg-white hover:bg-gray-600 dark:hover:bg-slate-200 dark:hover:border-slate-200' 
                    : 'bg-transparent hover:bg-zinc-300 dark:hover:bg-zinc-700',
                'transition-colors duration-300 border border-gray-800 dark:border-white rounded m-1 p-1.5',
            ])}
            onclick={props.onClick}
            disabled={props.onClick == null}
        >
            <p
                class={clsx([
                    (props.isSelected) ? 'text-white dark:text-gray-800' : 'text-gray-800 dark:text-white',
                    'm-0 text-base'
                ])}
            >
                {props.tag}
            </p>
        </button>
    );
};