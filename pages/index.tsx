import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { buscarProjetos, Projeto } from '../lib/projetos'
import Tags from '../lib/tags'
import { getTexto } from '../lib/textos'

interface Props {
    projetos: Projeto[];
    contato: string;
}

const Home: NextPage<Props> = ({ projetos, contato }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Roberto Guedes</title>
                <meta name="description" content="Portfólio - Roberto Guedes" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.sobreMim}>
                <h1>Contato:</h1>
                <div className={`${styles.caixa} ${styles.fadeIn}`}>
                    <div className={styles.contato}
                        dangerouslySetInnerHTML={{ __html: contato }}
                    >
                    </div>
                </div>
            </div>

            <h1 style={{ textAlign: 'center', marginTop: 20 }}>
                Portfólio:
            </h1>

            <div className={styles.grid}>
                {projetos.map(projeto => (
                    <div key={projeto.repo} className={`${styles.cardProjeto} ${styles.fadeIn}`}>
                        <div 
                            className={styles.thumb}
                            style={{ backgroundImage: `url("${projeto.thumbnail}")` }}
                        >
                        </div>

                        <div className={styles.cardProjetoDetalhes}>
                            <p className={styles.titulo}>
                                {projeto.titulo}
                            </p>

                            <p className={styles.descricao}>
                                {projeto.descricao}
                            </p>

                            <div className={styles.links}>
                                {(projeto.link != null) && (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a 
                                            href={projeto.link} 
                                            className={styles.link} 
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Abrir site
                                        </a>
                                    </div>
                                )}

                                {(projeto.download_link != null) && (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a 
                                            href={projeto.download_link} 
                                            className={styles.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Baixar
                                        </a>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <a 
                                        href={`https://github.com/roberto-ng/${projeto.repo}`}
                                        className={styles.link} 
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Repositório
                                    </a>
                                </div>

                            </div>

                            <div className={styles.subtitulo}>
                                <p>Feito com: </p>
                                <div className={styles.tags}>
                                    {projeto.tags.map(tag => (
                                        <div className={styles.tag} key={tag}>
                                            <p>{Tags.getTexto(tag)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.subtitulo}>
                                <p>Disponível para: </p>
                                <div className={styles.tags}>
                                    {projeto.plataformas.map(plataforma => (
                                        <div className={styles.tag} key={plataforma}>
                                            <p>{plataforma}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const [projetos, contato] = await Promise.all([
        buscarProjetos(), 
        getTexto('contato'),
    ]);

    return {
        props: {
            projetos,
            contato,
        },
    };
};

export default Home;
