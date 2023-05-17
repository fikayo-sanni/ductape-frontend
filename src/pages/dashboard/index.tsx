import Dashboard_Layout from '../../components/layout/dashboard_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import Icon, { ArrowUpOutlined, PoweroffOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { ConfigProvider, theme, Tabs, Typography, Card, Breadcrumb, Button, Statistic, Modal } from 'antd';
import { RootState } from '../../redux/store';
import { logoutUser } from '../../redux/applicationSlice';
import CountUp from 'react-countup';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { darkAlgorithm } = theme;

export default function Dashbboard() {
    const { user } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const formatter = (value: number) => <CountUp className="font-black" end={value} separator="," />;

    useEffect(() => {}, []);

    return (
        <Dashboard_Layout title="Dashboard">
            <div className="h-full row overflow-hidden">
                <Card className="border-top-0 border-start-0 border-end-0 rounded-0 px-5 pt-3 padding_50-bottom ">
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <Breadcrumb className="mb-3 ">
                                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item>{moment().format('dddd DD MMMM, YYYY')}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Title className=" mb-0">
                                <span className="font-weight-200">Welcome Back,</span> {user.firstname}
                            </Title>
                        </div>
                        <div>
                            <Button size="large" onClick={async () => await dispatch(logoutUser())}>
                                <PoweroffOutlined /> Logout
                            </Button>
                        </div>
                    </div>
                </Card>
                <section className="padding_50-left padding_50-right " style={{ position: 'relative', marginTop: -60 }}>
                    <div className="row">
                        <div className="col-lg-3">
                            <Card className="bg-white">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Apps</Text>}
                                    value={10}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                        <div className="col-lg-3">
                            <Card className="bg-white">
                                <Statistic
                                    className="font-black"
                                    title={
                                        <Text className="font-gray font-weight-500 text-uppercase">Integrations</Text>
                                    }
                                    value={112893}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>

                        <div className="col-lg-3">
                            <Card className="bg-white">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Webhooks</Text>}
                                    value={93}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>

                        <div className="col-lg-3">
                            <Card className="bg-white">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Webhooks</Text>}
                                    value={93}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-8">
                            <Card
                                title={
                                    <div className="py-3">
                                        <Title className="mb-0" level={4}>
                                            Requests Overtime
                                        </Title>
                                        <Text type="secondary" className="font-weight-300">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor Some text
                                            content here
                                        </Text>
                                    </div>
                                }
                            >
                                <div className="padding_50 text-center">BIG CHART HERE</div>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card
                                title={
                                    <div className="py-3">
                                        <Title className="mb-0" level={4}>
                                            Integrations
                                        </Title>
                                        <Text type="secondary" className="font-weight-300">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor Some text
                                            content here
                                        </Text>
                                    </div>
                                }
                            >
                                <div className="padding_50 text-center">SMALL CHART HERE</div>
                            </Card>
                        </div>
                    </div>
                </section>
                <Modal
                    title={
                        <div className="mb-3">
                            <Title level={3} className="mb-0 font-weight-500 pt-3">
                                Verify it's you
                            </Title>
                            <Paragraph type="secondary" className="mb-5 mt-2 fs-6">
                                We sent a six-digit pin to your email. Check your email and enter it in the field below
                            </Paragraph>
                        </div>
                    }
                    visible={visible}
                    footer={null}
                    onCancel={() => {
                        setVisible(false);
                        setSubmitting(false);
                        setOtp(new Array(6).fill(''));
                    }}
                >
                    {/* <label htmlFor="otp" className="sr-only">
                        Enter the six-digit pin from your email:
                    </label> */}
                    <div className="flex justify-center mb-5">
                        {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-field"
                                    type="text"
                                    name="otp"
                                    id={`otp-${index}`}
                                    maxLength={1}
                                    key={index}
                                    value={data}
                                    onChange={(e) => handleToken(e.target, index)}
                                    onFocus={(e) => e.target.select()}
                                    onPaste={(e) => handlePaste(e, index)}
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        letterSpacing: '10px',
                                        textAlign: 'center',
                                        marginRight: '0.5rem',
                                        marginBottom: '1rem',
                                    }}
                                    ref={index === 0 ? firstInputRef : null}
                                />
                            );
                        })}
                    </div>
                    <div className="col-lg-12 mt-2 mb-5 mx-auto">
                        {!submitting ? (
                            <Button
                                size="large"
                                onClick={handleOtpLogin}
                                type="primary"
                                className=" px-5  w-100"
                                disabled={!otp}
                            >
                                Verify Code
                            </Button>
                        ) : (
                            <Button size="large" disabled className="w-100">
                                <LoadingOutlined className="text-primary" rotate={180} />
                            </Button>
                        )}
                    </div>
                    {/* <Button type="primary" onClick={handleOtpLogin} className="px-5 w-100" size="large" disabled={!otp}>
                        Verify Code
                    </Button> */}
                    <p className="text-center mt-3 text-gray-600" onClick={requestNewOtp}>
                        Request new OTP
                    </p>
                </Modal>
            </div>
        </Dashboard_Layout>
    );
}
