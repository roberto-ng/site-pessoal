export type Post = {
    title: string,
    lang: string,
    date: string,  
};

export function isDateValid(date: Date): boolean {
    return !isNaN(date.getTime());
}