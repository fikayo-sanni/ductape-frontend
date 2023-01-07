import Dashboard_Layout from '../../components/layout/dashboard_layout.tsx';
import React, { useContext, Component, useEffect, useState } from 'react';
import Icon, { ArrowUpOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import {
    ConfigProvider,
    theme,
    Tabs,
    Typography,
} from 'antd';
import { RootState } from '../../redux/store';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { darkAlgorithm } = theme;

export default function Dashbboard() {

    const { user } = useSelector((state: RootState) => state.app);

    useEffect(() => {}, []);

    return (
        <Dashboard_Layout title='Dashboard'>

            <section className='container my-5'>
                <Title className='mb-0'>Hello, {user.firstname} </Title>
                <Text type='secondary'>Here's how you're performing</Text>
                <br />
                <br />
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='animated bg-white slideInDown p-4 border_radius'>
                            <h4 className='m-0 text-dark font-xs text-uppercase bold'>
                                Apps
                            </h4>
                            <br />
                            <h1 className='m-0 font-weight-700'>3</h1>
                            <br />
                            <div className='row mt-1 bold' style={{ color: '#00875A' }}>
                                <div className='col-1 me-2'>
                                    <ArrowUpOutlined style={{ color: '#00875A' }} />
                                </div>
                                {' '}
                                45%
                            </div>
                            <br />
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='animated bg-white slideInDown  p-4 border_radius'>
                            <p className='m-0 text-dark font-xs text-uppercase bold'>
                                Integrations
                            </p>
                            <br />
                            <h1 className='m-0 font-weight-700'>26</h1>
                            <br />
                            <div className='row'>
                                <div className='col-3'>
                                    <label style={{ color: '#00875A' }} className='bold'>13</label>
                                    <label className='text-muted'>Incoming</label>
                                </div>
                                <div className='col-5'></div>
                                <div className='col-4'>
                                    <label style={{ color: '#DC3444' }} className='bold'>13</label>
                                    <label className='text-muted'>Outgoing</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='animated bg-white slideInDown  p-4 border_radius'>
                            <p className='m-0 text-dark font-xs text-uppercase bold'>
                                Requests
                            </p>
                            <br />
                            <h1 className='m-0 font-weight-700'>2700</h1>
                            <br />
                            <div className='row'>
                                <div className='col-3'>
                                    <label style={{ color: '#00875A' }} className='bold'>1500</label>
                                    <label className='text-muted'>Incoming</label>
                                </div>
                                <div className='col-5'></div>
                                <div className='col-4'>
                                    <label style={{ color: '#DC3444' }} className='bold'>1200</label>
                                    <label className='text-muted'>Outgoing</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3'>
                        <div className='animated bg-white slideInDown  p-4 border_radius'>
                            <p className='m-0 text-dark font-xs text-uppercase bold'>
                                Webhooks
                            </p>
                            <br />
                            <h1 className='m-0 font-weight-700'>920</h1>
                            <br />
                            <div className='row'>
                                <div className='col-3'>
                                    <label style={{ color: '#00875A' }} className='bold'>650</label>
                                    <label className='text-muted'>Sent</label>
                                </div>
                                <div className='col-5'></div>
                                <div className='col-4'>
                                    <label style={{ color: '#DC3444' }} className='bold'>270</label>
                                    <label className='text-muted'>Received</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Dashboard_Layout>
    );
}
