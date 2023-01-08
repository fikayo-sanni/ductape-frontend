import Head from 'next/head';
import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { darkAlgorithm } = theme;

export default function Home_Layout({ children, title = 'Home' }) {
    const { currentTheme, darkMode } = useSelector((state: RootState) => state.app);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode && [darkAlgorithm],


            }}
        >
            <Layout>
                <Head>
                    <title>{title} | Pastel</title>
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" type="image/png" href="images/logo.png" />
                    <link rel="icon" type="image/png" href="images/logo.png" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                {children}

                <script
                    src="/b5/js/bootstrap.bun.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                    crossOrigin="anonymous"
                ></script>
            </Layout>
        </ConfigProvider>
    );
}
