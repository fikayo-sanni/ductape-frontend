import Head from 'next/head';
import React from 'react';
import { ConfigProvider, FloatButton, Layout, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTheme } from '../../redux/applicationSlice';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

const { darkAlgorithm } = theme;

export default function Home_Layout({ children, title = 'Home' }) {
    const { currentTheme, darkMode } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

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

                <FloatButton
                    onClick={() => dispatch(setTheme(!darkMode))}
                    icon={darkMode ? <BulbOutlined /> : <BulbFilled />}
                    type="default"
                    style={{ bottom: '5%', right: 40, zIndex: 9999999999 }}
                />

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
