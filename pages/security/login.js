import Home_layout from "../../components/layout/home_layout";
import React, {useContext,Component, useEffect, useState} from "react";
import { Button, Carousel, Card, Typography } from 'antd';
import {Logo, Mybutton} from '../../components/config/constant';
import ls from "local-storage";
import Link from "next/link";
import * as Api from "../../components/config/api";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import axios from "axios";
import toast from "react-hot-toast";
import {fetchAuthenticatedUser, usersLogin} from "../../components/config/api";
const { Title } = Typography;
import activityContext from "../../components/config/context";

export default function Login() {
    const[loadingButton, setLoadingButton] = useState(-1);
    const[user, setUser] = useState([]);
    const context = useContext(activityContext);


    const handleChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const login = (e,buttonId) => {
        e.preventDefault();
        try{

            setLoadingButton(buttonId);

                    axios({
                        method: 'POST',
                        url: Api.usersLogin,
                        data: {
                            email : user.email,
                            password: user.password,
                        }
                    }).then((response) => {

                        setLoadingButton(-1);

                        if (response.data.status === true) {

                            let token = response.data.data.token;

                            axios({
                                method: 'GET',
                                url: Api.fetchAuthenticatedUser,
                                headers: {
                                    Authorization: 'Bearer '+ token
                                }
                            }).then((res) => {
                                let user = res.data.data;
                                ls.set('st_tk', token);
                                context.defineUser(user);

                                setTimeout(()=>{
                                    window.location.href = '/dashboard/';
                                }, 1000);
                            })

                            toast.success(response.data.message)

                        }

                    }).catch((error) => {
                        console.log('Error!', error.response.data);

                        toast.error(error.response.data.message)

                        setLoadingButton(-1);


                    })


        } catch (e) {
            setLoadingButton(-1);
            console.log('An error occurred', e);

            toast.error(e)

        }
    }

    return (
        <Home_layout title="Login">

            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                <Logo size="full" className="mb-5 justify-content-center" />

                    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">
                            <h4 className="text-center mb-5 font-weight-700">Sign in to your Startupia account</h4>

                            <form id="login_form" onSubmit={(e) => login(e,'login_button')}>
                            <div className="row">

                                <div className="col-12 mb-4">
                                    <div className="form-floating">
                                        <input type="email" value={user.email} onChange={handleChange} className="form-control" placeholder="email" name="email" />
                                        <label>Email</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-4">
                                    <div className="form-floating">
                                        <input type="password" value={user.password} onChange={handleChange} className="form-control" placeholder="password" name="password" />
                                        <label>Password</label>
                                    </div>
                                </div>

                                <div className="col-lg-12 mx-auto">

                                    <Mybutton className="btn btn-lg mt-4 btn-primary w-100" id="reg_button"
                                              loading={loadingButton === 'login_button' ? true : false}
                                              changeText="" form="login_form"
                                              title="Log in"/>
                                    <p className="mb-0 mt-4 text-center">Forgot your password? <a href="#" className="">Reset password</a></p>
                                </div>
                            </div>
                            </form>
                        </div>

                    </div>


                    <div className="text-center">
                        <span className="me-4">&copy; 2021</span>
                        <a href="" className="font-gray-3 me-4">Privacy policy</a>
                        <a href="" className="font-gray-3">Terms & conditions</a>
                    </div>

                </div>

            </div>


        </Home_layout>
    )
}

