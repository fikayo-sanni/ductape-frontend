import Home_Layout from '../components/layout/home_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import { Modal, Avatar, Button, Card, Input, Typography } from 'antd';
import NProgress from 'nprogress';
import { toast } from 'react-hot-toast';
import { Logo } from '../components/config/constant';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail } from '../redux/applicationSlice';
import { LoadingOutlined, StarFilled } from '@ant-design/icons';

import Link from 'next/link';
import { forgotUser } from '../components/services/users.service';

export default function Index(props) {
    const [loadingButton, setLoadingButton] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState({ email: '' });
    const dispatch = useDispatch();

    const { Title, Text, Paragraph } = Typography;

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const reset = async (e) => {
        e.preventDefault();
        try {
            setLoadingButton(true);
            NProgress.start();
            //toast.success('Registration successful')
            const login = await forgotUser(user);
            console.log(login);
            toast.success('Email Sent');
            dispatch(await setUserEmail(user));
            const { workspaces } = login.data.data;
            Router.push('/changePassword');
        } catch (e) {
            setLoadingButton(false);
            NProgress.done();
            console.log('An error occurred', e.response);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error);
        }
    };

    useEffect(() => {}, []);

    return (
        <Home_Layout title="Home">
            <div className="h-full row overflow-hidden g-0">
                <div className="col-xl-4 col-lg-5 d-flex flex-column">
                    <div className="col-lg-12 p-5 mt-5 padding_10-xs ">
                        <div>
                            <div className="">
                                <div className=" margin_30-bottom">
                                    <Logo />
                                </div>
                                <Title level={3} className="mb-0 font-weight-500 pt-3">
                                    Reset Password
                                </Title>
                                <Paragraph type="secondary" className="mb-2 mt-2 fs-6">
                                    Enter your email address and we'll send you a code to reset your password
                                </Paragraph>
                            </div>
                            <form id="login_form" onSubmit={(e) => reset(e, 'reset_button')} className="col pt-3">
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <Input
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.email}
                                            placeholder="Email address"
                                            name="email"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    reset(e);
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="col-lg-12 mt-2 mb-5 mx-auto">
                                        {!submitting ? (
                                            <Button
                                                size="large"
                                                onClick={(e) => reset(e)}
                                                type="primary"
                                                className=" px-5  w-100"
                                                disabled={!user.email}
                                            >
                                                Send code
                                            </Button>
                                        ) : (
                                            <Button size="large" disabled className="w-100">
                                                <LoadingOutlined className="text-primary" rotate={180} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>

                            <center className="mt-5">
                                <Text>
                                    <big>
                                        <u className="text-primary">
                                            <Link href="/">Return to Login</Link>
                                        </u>
                                    </big>
                                </Text>
                            </center>
                        </div>
                    </div>

                    <div className="mt-auto d-flex font-gray justify-content-between gap-2 p-5">
                        <p>&copy; Ductape 2023</p>
                    </div>
                </div>
                <div className="col-xl-8 position-relative col-lg-7 p-4 pt-4 pb-4 pe-4 d-flex flex-column">
                    <Card className="h-100 p-5">
                        <Title level={2}>
                            "Few things make me feel more powerful than setting up
                            <div>automations in Ductape to make my life easier and more</div> efficient."
                        </Title>

                        <div className="d-flex mt-5 flex-row justify-content-between align-items-start">
                            <div>
                                <Title className="mb-0" level={4}>
                                    {' '}
                                    - Fikayo Sanni
                                </Title>
                                <Text type="secondary">Co-Founder Startupia LLC</Text>
                            </div>
                            <div>
                                <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled /> <StarFilled />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Home_Layout>
    );
}
