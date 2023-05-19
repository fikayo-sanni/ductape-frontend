import Home_Layout from '../components/layout/home_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Logo } from '../components/config/constant';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar, Button, Card, Input, Typography, List, Checkbox } from 'antd';
import { useNProgress } from '@tanem/react-nprogress';
import { registerUser } from '../components/services/users.service';
import NProgress from 'nprogress';
import { LoadingOutlined, StarFilled } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Title, Text, Paragraph } = Typography;

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
};

const Register = () => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeat_password: '',
    });

    const data = [
        {
            title: 'Selling Point 1',
        },
        {
            title: 'Selling Point 2',
        },
        {
            title: 'Selling Point 3',
        },
        {
            title: 'Selling Point 4',
        },
    ];

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const register = async (e, buttonId) => {
        console.log("heye")
        e.preventDefault();
        setSubmitting(true);
        try {
            if (user.password === user.repeat_password) {
                setLoadingButton(true);
                NProgress.start();
                //toast.success('Registration successful')
                await registerUser({ ...user, repeat_password: undefined });
                toast.success('Registration successful');
                //Router.push('/dashboard');
            } else {
                toast.error('passwords do not match');
            }
        } catch (e) {
            setLoadingButton(false);
            setSubmitting(false);
            NProgress.done();
            console.log('An error occurred', e);
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
                                    Long Live the Integrations
                                </Title>
                                <Paragraph type="secondary" className="mb-2 mt-2 fs-6">
                                    Let’s get you setup
                                </Paragraph>
                            </div>

                            <form id="register_form" className="col pt-3" onSubmit={(e) => register(e, 'reg_button')}>
                                <div className="row">
                                    <div className="col-12 mb-4">
                                        <Input
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.firstname}
                                            placeholder="Firstname"
                                            name="firstname"
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.lastname}
                                            placeholder="Lastname"
                                            name="lastname"
                                            type="text"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.email}
                                            placeholder="Email"
                                            name="email"
                                            type="email"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input.Password
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.password}
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                        />
                                    </div>

                                    <div className="col-12 mb-4">
                                        <Input.Password
                                            size="large"
                                            required
                                            onChange={handleChange}
                                            value={user.repeat_password}
                                            placeholder="Confirm Password"
                                            name="repeat_password"
                                            type="password"
                                        />
                                    </div>

                                    <div>
                                        <Checkbox onChange={onChange}>
                                            By clicking the “Create Account” button, you agree to Ductape’s{' '}
                                            <u>
                                                <a href="" className="text-primary">
                                                    Terms of Use
                                                </a>
                                            </u>{' '}
                                            and{' '}
                                            <u>
                                                <a href="" className="text-primary">
                                                    Privacy Policy
                                                </a>
                                            </u>
                                        </Checkbox>
                                    </div>

                                    <div className="col-lg-12 mt-5 mb-5 mx-auto">
                                        {!submitting ? (
                                            <Button size="large" type="primary" className=" px-5  w-100">
                                                Create Account
                                            </Button>
                                        ) : (
                                            <Button size="large" disabled className="w-100">
                                                <LoadingOutlined className="text-primary" rotate={180} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <center className="mt-2">
                                <Text>
                                    <big>
                                        Already have an account?{' '}
                                        <u className="text-primary">
                                            <Link href="/">Login</Link>
                                        </u>
                                    </big>
                                </Text>
                            </center>
                        </div>
                    </div>
                    <div className="mb-5 d-flex font-gray justify-content-between gap-2 p-5">
                        <p>&copy; Ductape 2023</p>
                    </div>
                </div>
                <div className="col-xl-8 position-relative col-lg-7 p-3 pt-4 pb-4 pe-4 d-flex flex-column">
                    <Card className="h-100 p-5">
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item className="m-5">
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                            />
                                        }
                                        title={
                                            <a href="" className="fs-4">
                                                {item.title}
                                            </a>
                                        }
                                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed augue nec mi malesuada hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </Home_Layout>
    );
};

export default Register;
