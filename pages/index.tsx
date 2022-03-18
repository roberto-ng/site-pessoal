import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { buscarProjetos, Projeto } from '../lib/projetos'
import Tags from '../lib/tags'

interface Props {
    projetos: Projeto[];
}

const Home: NextPage<Props> = ({ projetos }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Portifólio - Roberto Guedes</title>
                <meta name="description" content="Portifólio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.main}>
                {projetos.map(projeto => (
                    <div key={projeto.repo} className={styles.cardProjeto}>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projetos = await buscarProjetos();

    return {
        props: {
            projetos,
        },
    };
};

export default Home;
