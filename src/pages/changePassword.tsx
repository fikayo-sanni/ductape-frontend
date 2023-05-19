import Home_Layout from '../components/layout/home_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Logo } from '../components/config/constant';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNProgress } from '@tanem/react-nprogress';
import { changePasswordUser } from '../components/services/users.service';
import { Button, Input, Typography } from 'antd';
import NProgress from 'nprogress';

import { LoadingOutlined, StarFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const changePassword = () => {
    const { email } = useSelector((state: RootState) => state.app);
    const [loadingButton, setLoadingButton] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        repeat_password: '',
        token: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const changePass = async (e, buttonId) => {
        e.preventDefault();
        try {
            if (data.password === data.repeat_password) {
                setLoadingButton(true);
                NProgress.start();
                //toast.success('Registration successful')
                await changePasswordUser({ ...data, email: email['email'], repeat_password: undefined });
                toast.success('password change successful');
                Router.push('/');
            } else {
                toast.error('passwords do not match');
            }
        } catch (e) {
            setLoadingButton(false);
            NProgress.done();
            console.log('An error occurred', e);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error);
        }
    };
    useEffect(() => {}, []);

    return (
        <Home_Layout title="Home">
            <div className="h-full row overflow-hidden">
                <div className="h-100 row g-0">
                    <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent p-5 mt-5 padding_10-xs">
                        <Logo />

                        <div
                            className="col-xl-6 col-lg-6 col-md-8 mt-4 col-sm-10 mb-auto mx-auto"
                            style={{ margin: '0 auto', maxWidth: '400px' }}
                        >
                            <Title level={3} className="text-center mb-5 font-weight-700">
                                Create New Password
                            </Title>
                            <form id="register_form" className="col pt-3">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <Input
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={data.token}
                                            placeholder="Enter OTP"
                                            name="token"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input.Password
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={data.password}
                                            placeholder="New Password"
                                            name="password"
                                            type="password"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input.Password
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={data.repeat_password}
                                            placeholder="Confirm Password"
                                            name="repeat_password"
                                            type="password"
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter') {
                                                    (e) => changePass(e, 'reg_button');
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="col-lg-12 mt-2 mb-5 mx-auto">
                                        {!submitting ? (
                                            <Button
                                                id="reg_button"
                                                size="large"
                                                onClick={(e) => changePass(e, 'reg_button')}
                                                type="primary"
                                                className=" px-5 w-100"
                                                disabled={!(data.token && data.password && data.repeat_password)}
                                            >
                                                Login
                                            </Button>
                                        ) : (
                                            <Button size="large" disabled className="w-100">
                                                <LoadingOutlined className="text-primary" rotate={180} />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <u className="text-primary">
                                        <a href="">Terms of Use</a>
                                    </u>{' '}
                                    &nbsp;&nbsp;&nbsp;
                                    <u className="text-primary">
                                        <a href="">Privacy Policy</a>
                                    </u>
                                </div>
                            </form>
                        </div>

                        <div className="mt-auto d-flex font-gray justify-content-between gap-2 p-5">
                            <p>&copy; Ductape 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </Home_Layout>
    );
};

export default changePassword;
