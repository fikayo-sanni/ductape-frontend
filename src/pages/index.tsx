import Home_Layout from '../components/layout/home_layout';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Logo } from '../components/config/constant';
import Router from 'next/router';
import { loginUser as userAuth } from '../components/services/users.service';
import { Avatar, Button, Card, Input, Typography } from 'antd';
import { fetchWorkspaces } from '../components/services/workspaces.service';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAppUser,
    logoutUser,
    setCurrentWorkspace,
    setWorkspaces,
    changeDefaultWorkspaceId,
} from '../redux/applicationSlice';
import { LoadingOutlined, StarFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Index = () => {
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector((state: RootState) => state.app);
    const [submitting, setSubmitting] = useState(false);
    const [authenticated, setAuthenticated] = useState(isAuthenticated);
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => setLoginUser({ ...loginUser, [e.target.name]: e.target.value });

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const Login = async () => {
        toast('Authenticating details. Please wait');
        setSubmitting(true);
        try {
            // login user
            const login = await userAuth(loginUser);
            const userData = login.data.data;
            dispatch(await setAppUser(userData));

            // set workspaces
            const { workspaces } = login.data.data;
            if (workspaces.length) {
                const { auth_token: token, public_key, _id: user_id } = userData;
                const spaces = await fetchWorkspaces({ token, public_key, user_id });
                const { data } = spaces.data;
                let defaultChanged = false;

                // save default workspace
                data.map((d, i) => {
                    if (d.default) {
                        defaultChanged = true;
                        dispatch(changeDefaultWorkspaceId(d.workspace_id));
                        dispatch(setCurrentWorkspace(d));
                    }
                });
                if (!defaultChanged) {
                    dispatch(changeDefaultWorkspaceId(data[0].workspace_id));
                    dispatch(setCurrentWorkspace(data[0]));
                }

                // save all workspaces
                dispatch(setWorkspaces(data));

                Router.push('/dashboard');
            } else {
                Router.push('/workspaces');
            }
        } catch (e) {
            console.log('An error occurred', e);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
            setSubmitting(false);
        }
    };

    useEffect(() => {}, []);

    return (
        <Home_Layout title="Home">
            <div className="h-full row overflow-hidden g-0">
                <div className="col-xl-4 col-lg-5 d-flex flex-column">
                    <div className="col-lg-12 p-5 mt-5 padding_10-xs ">
                        <section>
                            {isAuthenticated ? (
                                <div>
                                    <div className="d-flex mb-5">
                                        <Logo />
                                    </div>

                                    <Card title="Already logged in as" size="default">
                                        <div className="d-flex gap-2 justify-content-between align-items-center">
                                            <Avatar size={50} className="bg-primary">
                                                {user.firstname.charAt(0)}
                                            </Avatar>
                                            <div className="me-auto">
                                                <h6 className="m-0">{user.firstname}</h6>
                                                <p className="font-xs font-gray m-0">
                                                    Not your account?{' '}
                                                    <a className="text-danger" onClick={() => dispatch(logoutUser())}>
                                                        Logout
                                                    </a>
                                                </p>
                                            </div>
                                            <Link href="/dashboard">
                                                <Button>Continue</Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div>
                                    <div className="">
                                        <div className=" margin_30-bottom">
                                            <Logo />
                                        </div>
                                        <Title level={3} className="mb-0 font-weight-500 pt-3">
                                            Automate your Integrations
                                        </Title>
                                        <Paragraph type="secondary" className="mb-5 mt-2 fs-6">
                                            Continue to your profile
                                        </Paragraph>
                                    </div>

                                    <form id="login_form" className="col pt-3">
                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <Input
                                                    size="large"
                                                    required
                                                    onChange={handleChange}
                                                    value={loginUser.email}
                                                    placeholder="Email address"
                                                    name="email"
                                                    onKeyPress={(event) => {
                                                        if (event.key === 'Enter') {
                                                            Login();
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="col-12 mb-2">
                                                <Input.Password
                                                    required
                                                    size="large"
                                                    onChange={handleChange}
                                                    value={loginUser.password}
                                                    placeholder="Password"
                                                    name="password"
                                                    onKeyPress={(event) => {
                                                        if (event.key === 'Enter') {
                                                            Login();
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <Text className="mb-5 text-primary float-end fw-normal">
                                                    <Link href="/reset">Forgot your Password?</Link>
                                                </Text>
                                            </div>

                                            <div className="col-lg-12 mt-2 mb-5 mx-auto">
                                                {!submitting ? (
                                                    <Button
                                                        size="large"
                                                        onClick={() => Login()}
                                                        type="primary"
                                                        className=" px-5  w-100"
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
                                    </form>

                                    <center className="mt-5">
                                        <Text>
                                            <big>
                                                New to Ductape?{' '}
                                                <u className="text-primary">
                                                    <Link href="/register">Create an account</Link>
                                                </u>
                                            </big>
                                        </Text>
                                    </center>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="mt-auto d-flex font-gray justify-content-between gap-2 p-5">
                        <p>&copy; Ductape 2023</p>
                    </div>
                </div>
                <div className="col-xl-8 position-relative col-lg-7 p-3 pt-4 pb-4 pe-4 d-flex flex-column">
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
};

export default Index;
