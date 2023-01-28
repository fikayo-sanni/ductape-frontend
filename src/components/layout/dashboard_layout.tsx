import Head from 'next/head';
import React, { useContext, Component, useEffect, useState } from 'react';
import {
    Affix,
    Avatar,
    Button,
    Card,
    ConfigProvider,
    Dropdown,
    FloatButton,
    Layout,
    Menu,
    MenuProps,
    Space,
    theme,
    Typography,
} from 'antd';
import { RootState } from '../../redux/store';
import { Logo } from '../config/constant';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { setTheme } from '../../redux/applicationSlice';
import { BulbFilled, BulbOutlined, DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;
const { darkAlgorithm } = theme;

const TopNav = dynamic(() => import('../../components/common/dashboard/topNav'));
const LowerNav = dynamic(() => import('../../components/common/dashboard/lowerNav'));
const AppNav = dynamic(() => import('../../components/common/dashboard/appNav'));

interface Props {
    children: any;
    showSidebar?: boolean;
    title: string;
    appPage?: string;
}

const Dashboard_Layout: React.FC<Props> = ({ children, title = 'Dashboard', showSidebar = false, appPage }) => {
    const { user, currentTheme, darkMode, isAuthenticated } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated === false) {
            Router.replace('/');
        }
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode && [darkAlgorithm],
                token: {
                    colorPrimary: '#0746A6',
                },
            }}
        >
            <Layout className="">
                <Head>
                    <title>{title} | DucTape</title>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#0746A6" />
                    <link rel="shortcut icon" type="image/png" href="/images/logo_2.png" />
                    <link rel="icon" type="image/png" href="/images/logo.svg" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;600;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <FloatButton
                    onClick={() => dispatch(setTheme(!darkMode))}
                    icon={darkMode ? <BulbOutlined /> : <BulbFilled />}
                    type="default"
                    style={{ bottom: '5%', right: 40, zIndex: 9999999999 }}
                />

                <body className="">
                    <Layout className="site-layout position-relative">
                        <TopNav />
                    </Layout>
                    <Affix offsetTop={0}>
                        <Layout className="sticky-top site-layout " style={{ overflow: 'hidden' }}>
                            <LowerNav pageTitle={title} />
                        </Layout>
                    </Affix>

                    <div className="d-flex flex-row">
                        {showSidebar && (
                            <Affix offsetTop={45}>
                                <Layout.Sider
                                    className=""
                                    trigger={null}
                                    breakpoint={'md'}
                                    width={300}
                                    style={{
                                        background: currentTheme.colorBgBase,
                                        borderRight: !darkMode
                                            ? '1px solid rgba(5, 5, 5, 0.06)'
                                            : `1px solid rgba(48, 48, 48)`,
                                        paddingTop: -0,
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        height: '95vh',
                                        left: 0,
                                    }}
                                >
                                    <AppNav appPage={appPage} />
                                </Layout.Sider>
                            </Affix>
                        )}

                        <Layout.Content
                            className="site-layout position-relative"
                            style={{ minHeight: '90vh', background: currentTheme.colorBgBase }}
                        >
                            {children}
                        </Layout.Content>
                    </div>
                </body>

                {/*<div className='h-100 bg-primary-transparent row g-0'>*/}
                {/*    <div className='col-lg-2'>*/}
                {/*        <Sidebar type={type} refreshApps={refreshApps} id={id} info={info} />*/}
                {/*    </div>*/}

                {/*    <div className={'col-lg-10'}>*/}

                {/*        <FullHeader />*/}
                {/*        <div*/}
                {/*            className={'no_background  position-relative border_radius  ms-0'}*/}
                {/*            style={{ height: '100vh', overflowY: 'auto' }}*/}
                {/*        >*/}
                {/*            <section className='d-flex flex-column' style={{ height: '91%' }}>*/}
                {/*                {children}*/}
                {/*            </section>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <script
                    src="/b5/js/bootstrap.bun.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                    crossOrigin="anonymous"
                ></script>
            </Layout>
        </ConfigProvider>
    );
};

export default Dashboard_Layout;
