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
                (props.isSelected) ? 'bg-gray-800 dark:bg-white' : 'bg-transparent',
                'border border-gray-800 dark:border-white rounded m-1 p-1.5',
            ])}
            onclick={props.onClick}
        >
            <p
                class={clsx([
                    (props.isSelected) ? 'text-white dark:text-gray-800' : 'text-gray-800 dark:text-white',
                    "m-0 text-base"
                ])}
            >
                {props.tag}
            </p>
        </button>
    );
};