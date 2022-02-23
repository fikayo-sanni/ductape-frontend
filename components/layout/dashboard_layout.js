import Head from 'next/head';
import React, {useContext, Component, useEffect, useState} from "react";
import {Divider, Layout, Menu, PageHeader, Popover} from "antd";
import {
    ReadOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LaptopOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
    CustomerServiceOutlined, SecurityScanOutlined, QuestionOutlined, CommentOutlined, BulbOutlined
} from '@ant-design/icons';
import {Logo} from "../config/constant";
import header from "../common/dashboard/header";
import sidebar from "../common/dashboard/sidebar";


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


export default function Dashboard_Layout({
                                             children,
                                             title = 'Dashboard'
                                         }) {


    return (
        <Layout className="">

            <Head>
                <title>{title} | Send Freight</title>
                <meta charSet="utf-8"/>
                <meta name="theme-color" content="#0746A6"/>
                <link rel="shortcut icon" type="image/png" href="/images/logo_2.png"/>
                <link rel="icon" type="image/png" href="/images/logo.svg"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;600;800&display=swap"
                    rel="stylesheet"/>
            </Head>


            <div className="h-100 bg-primary-transparent row g-0">


                <div className="col-lg-2">
                    {sidebar(title)}
                </div>


                <div className={'col-lg-10'}>


                    <div className={"bg-white overflow-hidden position-relative border_radius  ms-0"}
                         style={{height: '100vh'}}>
                        {header(title)}
                        <section className="d-flex flex-column" style={{height: '91%'}}>

                            {children}

                        </section>
                    </div>
                </div>
            </div>


            <script src="/b5/js/bootstrap.bun.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                    crossorigin="anonymous"></script>
        </Layout>
)
}
