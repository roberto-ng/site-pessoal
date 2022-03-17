import { FunctionComponent } from "react"
import Head from 'next/head'
import styles from '../styles/Layout.module.css'

const Layout: FunctionComponent = ({ children }) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                name="description"
                content="A cool blog"
                />
                {/*
                <meta
                property="og:image"
                content={`https://og-image.now.sh/${encodeURI(
                    siteTitle
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            <header id={styles.header}></header>

            <main>{children}</main>
        </div>
    )
};

export default Layout;