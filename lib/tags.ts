export function formatar(tags: string[]) {
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

        case 'next':
            return 'Next.js';

        case 'react':
            return 'React.js';

        case 'react native':
            return 'React Native';

        case 'redux':
            return 'Redux';
            
        case 'strapi':
            return 'Strapi CMS';

        case 'netlify-cms':
            return 'Netlify CMS';

        default:
            return null;
    }
}

export default {
    formatar,
    getTexto,
}
