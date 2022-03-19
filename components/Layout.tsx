import { FunctionComponent } from "react"
import Head from 'next/head'
import styles from '../styles/Layout.module.css'

const Layout: FunctionComponent = ({ children }) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            <header id={styles.header}>
                <h1>Roberto Guedes</h1>
            </header>

            <main>{children}</main>
        </div>
    )
};

export default Layout;