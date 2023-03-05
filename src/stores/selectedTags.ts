import { createStore } from "solid-js/store";
import { Set } from "immutable";

/** Lista de tags selecionadas */
export type SelectedTags = Set<string>;

export const [selectedProjectTags, setSelectedProjectTags] = createStore<SelectedTags>(Set());

export function selectProjectTag(tag: string) {
    const newTags = selectedProjectTags.add(tag);
    setSelectedProjectTags(newTags);
}

export function removeProjectTag(tag: string) {
    const newTags = selectedProjectTags.remove(tag);
    setSelectedProjectTags(newTags);
}