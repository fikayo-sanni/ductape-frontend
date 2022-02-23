import Home_layout from "../../components/layout/home_layout";
import React, {useContext,Component,useRef, useEffect, useState} from "react";
import {Button, Carousel, Card, notification, Typography, Avatar} from 'antd';
import {Logo, Mybutton} from '../../components/config/constant';
import ls from "local-storage";
import Link from "next/link";
import * as Api from "../../components/config/api";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
const { Title } = Typography;
import toast, { Toaster } from 'react-hot-toast';
import landing_sidebar from "../../components/common/landing_sidebar";
import activityContext from "../../components/config/context";
import {UserOutlined} from "@ant-design/icons";

export default function Signup(){
    const context = useContext(activityContext);
    const[user, setUser] = useState([]);
    const[registered, setRegistered] = useState(false);
    const[agree, setAgree] = useState(false);
    const[loadingButton, setLoadingButton] = useState(-1);
    const axios = require('axios');


    const handleChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value });


    const register = (e,buttonId) => {

        e.preventDefault();
        try{

            setLoadingButton(buttonId);

            if(user.confirm_password === user.password)
            {

                let data = new FormData;
                data.append('firstName', user.firstName);
                data.append('lastName', user.lastName);
                data.append('password', user.password);
                data.append('email', user.email);

            if(agree === true ) {
                axios({
                    method: 'POST',
                    url: Api.register,
                    data: {
                        firstName : user.firstName,
                        lastName: user.lastName,
                        password: user.password,
                        email: user.email
                    }
                }).then((response) => {

                    console.log('Response!', response.data);
                    setLoadingButton(-1);

                    if (response.data.status === true) {

                        setRegistered(true);
                        toast.success('Registration successful')

                    }

                }).catch((error) => {
                    console.log('Error!', error.response.data);

                    toast.error(error.response.data.message)

                    setLoadingButton(-1);


                })

            }else{
                throw "You must agree to Startupia's terms of use and privacy policy"
            }

                }else{
                throw "Passwords do not match"
            }
        } catch (e) {
            setLoadingButton(-1);
            console.log('An error occurred', e);

            toast.error(e)

        }
    }

    useEffect(() => {

    }, [])


    return (
        <Home_layout title="Home">

            <div className="h-100 row overflow-hidden g-0">

                {landing_sidebar()}


                <div className="col-lg-8 padding_50 bg-white d-flex align-items-center justify-content-center">

                    <div className="col-lg-7 mx-auto">

                        {
                            context.user.firstName ?(
                                <div>
                                    <h1 className="mb-2 font-weight-700">Welcome back!</h1>
                                    <p className="mb-5 lead">You're already signed in</p>

                                    <div className="border border_radius p-3 clearfix">
                                        <Avatar size={50} className="float-start font-xl me-4 bg-skyblue" style={{ color: '#000', verticalAlign: 'middle' }}  >
                                            {context.user.firstName.charAt(0)}{context.user.lastName.charAt(0)}
                                        </Avatar>


                                        <div>
                                            <h6>Continue as {context.user.firstName} {context.user.lastName}</h6>
                                            <p className="font-gray font-xs">{context.currentOrganization.companyName}</p>
                                        </div>
                                        <Link href="/dashboard/home">
                                        <a className="btn w-100 btn-lg btn-primary mt-3">Continue</a>
                                        </Link>
                                    </div>

                                    <p className="p-1 text-center mt-3 w-100">Not you? <a href="#" onClick={() => context.logout()}>Sign in to your account</a></p>


                                </div>
                            ):(
                                <div>
                                    <h1 className="mb-2 font-weight-700">Get started with Startupia</h1>
                                    <p className="mb-5 lead">Create a personal account below</p>

                                    {
                                        registered === false ? (

                                            <section>

                                                <form id='reg_form' onSubmit={(e) => register(e, 'reg_button')}>
                                                    <div className="row">
                                                        <div className="col-6 mb-4">
                                                            <div className="form-floating">
                                                                <input type="text" required onChange={handleChange}
                                                                       value={user.firstName}
                                                                       className="form-control" placeholder="First name"
                                                                       name="firstName"/>
                                                                <label>First name</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 mb-4">
                                                            <div className="form-floating">
                                                                <input type="text" required onChange={handleChange}
                                                                       value={user.lastName}
                                                                       className="form-control" placeholder="last name"
                                                                       name="lastName"/>
                                                                <label>Last name</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 mb-4">
                                                            <div className="form-floating">
                                                                <input type="email" required onChange={handleChange}
                                                                       value={user.email}
                                                                       className="form-control" placeholder="email" name="email"/>
                                                                <label>Email</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-6 mb-4">
                                                            <div className="form-floating">
                                                                <input type="password" required onChange={handleChange}
                                                                       value={user.password}
                                                                       className="form-control" placeholder="password"
                                                                       name="password"/>
                                                                <label>Password</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-6 mb-4">
                                                            <div className="form-floating">
                                                                <input type="password"
                                                                       value={user.confirm_password} required onChange={handleChange}
                                                                       className="form-control" placeholder="password"
                                                                       name="confirm_password"/>
                                                                <label>Confirm Password</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12 mt-3 mx-auto">

                                                            <input type="checkbox" required name="verify"
                                                                   onChange={() => setAgree(!agree)}/> I accept Startupia's <a
                                                            href="">Terms of use</a> and <a href="">privacy policy</a>.

                                                            <Mybutton className="btn btn-lg mt-4 btn-primary w-100" id="reg_button"
                                                                      loading={loadingButton === 'reg_button' ? true : false}
                                                                      changeText="Creating your profile" form="reg_form"
                                                                      title="Register"/>

                                                            <p className="mb-0 mt-4 font-sm" checked={agree ? 'true' : 'false'} >Already have an
                                                                account? <Link href="/security/login">
                                                                    <a className="font-sm">Sign In</a>
                                                                </Link>
                                                            </p>

                                                        </div>
                                                    </div>
                                                </form>
                                            </section>
                                        ) : (

                                            <section className="animated fadeIn">
                                                <div className="alert bg-primary-transparent border_radius">
                                                    <p className="font-sm-2 mb-0">Thank you for creating an account. <br/>
                                                        We have sent a confirmation mail to your email <strong>{user.email}</strong>.
                                                        Check your email to continue.</p>
                                                </div>
                                            </section>
                                        )
                                    }
                                </div>
                            )
                        }


                    </div>


                </div>
            </div>


            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Home_layout>
    )
}

