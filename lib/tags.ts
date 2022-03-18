export function formatarTags(tags: string[]) {
    return tags
        .map(getTexto)
        .join(', ');
}

export function getTexto(tag: string): string | null {
    switch (tag.trim()) {
        case 'c++':
            return 'C++';

        case 'electron':
            return 'Electron';
        
        case 'gtk':
            return 'GTK';

        case 'javascript':
            return 'JavaScript';

        case 'react':
            return 'React';

        case 'react native':
            return 'React Native';

        default:
            return null;
    }
}