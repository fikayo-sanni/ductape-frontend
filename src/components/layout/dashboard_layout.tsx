import Head from 'next/head';
import React, { useContext, Component, useEffect, useState } from 'react';
import { Affix, ConfigProvider, FloatButton, Layout, Menu, Popover, theme } from 'antd';
import Sidebar from '../common/dashboard/sidebar';
import FullHeader from '../common/dashboard/full_header';
import { observer } from 'mobx-react-lite';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTheme,
    logoutUser,
    setCurrentWorkspace,
    setWorkspaces,
    changeDefaultWorkspaceId,
} from '../../redux/applicationSlice';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { darkAlgorithm } = theme;

const Dashboard_Layout = observer(({ children, title = 'Dashboard', type, refreshApps, id, info }) => {
    const { user, currentApp, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const dispatch = useDispatch();


    useEffect(() => {
        if (isAuthenticated === false) {
            Router.replace('/');
        }
    }, [isAuthenticated]);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode && [darkAlgorithm],
            }}
        >
            <Layout className=''>
                <Head>
                    <title>{title} | DucTape</title>
                    <meta charSet='utf-8' />
                    <meta name='theme-color' content='#0746A6' />
                    <link rel='shortcut icon' type='image/png' href='/images/logo_2.png' />
                    <link rel='icon' type='image/png' href='/images/logo.svg' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;600;800&display=swap'
                        rel='stylesheet'
                    />
                </Head>

                <FloatButton
                    onClick={() => dispatch(setTheme(!darkMode))}
                    icon={darkMode ? <BulbOutlined /> : <BulbFilled />}
                    type='default'
                    style={{ bottom: '5%', right: 40, zIndex: 9999999999 }}
                />

                <body className=''>
                <Layout
                    className='site-layout bg-red position-relative'
                    style={{ height: '5vh', background: currentTheme.colorBgBase }}
                >
                    this is the header
                </Layout>
                <Affix offsetTop={0}>
                    <Layout
                        className='sticky-top site-layout bg-blue'
                        style={{ height: '4vh', background: currentTheme.colorBgBase }}
                    >
                        sub header
                    </Layout>
                </Affix>
                </body>


                <div className='h-100 bg-primary-transparent row g-0'>
                    <div className='col-lg-2'>
                        <Sidebar type={type} refreshApps={refreshApps} id={id} info={info} />
                    </div>

                    <div className={'col-lg-10'}>

                        {/*<FullHeader/>*/}
                        <div
                            className={'no_background  position-relative border_radius  ms-0'}
                            style={{ height: '100vh', overflowY: 'auto' }}
                        >
                            <section className='d-flex flex-column' style={{ height: '91%' }}>
                                {children}
                            </section>
                        </div>
                    </div>
                </div>

                <script
                    src='/b5/js/bootstrap.bun.js'
                    integrity='sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4'
                    crossorigin='anonymous'
                ></script>
            </Layout>
        </ConfigProvider>
    );
});

export default Dashboard_Layout;