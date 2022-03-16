import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { buscarProjetos, Projeto } from '../lib/projetos'

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

            <main className={styles.main}>
                {projetos.map(projeto => (
                    <div key={projeto.repo}>
                        <p>{projeto.titulo}</p>
                    </div>
                ))}
            </main>
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
