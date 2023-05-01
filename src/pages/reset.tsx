import Home_layout from "../components/layout/home_layout";
import React, {useContext, Component, useEffect, useState} from "react";
import {
    Button,
    Upload,
    message,
    Carousel,
    Card,
    Tabs,
    Typography,
    Spin,
    Avatar,
    Badge,
    Table,
    Input,
    Space,
    Result
} from 'antd';
import NProgress from "nprogress";
import {toast} from "react-hot-toast";
import {Logo} from '../components/config/constant';
import Router, {useRouter} from "next/router";
import Link from "next/link";
import { forgotUser } from "../components/services/users.service";

export default function Index(props) {
    const [loadingButton, setLoadingButton] = useState(false);
    const [user, setUser] = useState({email:""});


    const handleChange = e =>
        setUser({...user, [e.target.name]: e.target.value});

    const reset = async(e, buttonId) => {
        e.preventDefault();
        try {
            setLoadingButton(true);
            NProgress.start();
            //toast.success('Registration successful')
            const login = await forgotUser(user);
            console.log(login);
            toast.success('Email Sent')
            const { workspaces } = login.data.data;
            Router.push('/changePassword');

        } catch (e) {
            setLoadingButton(false)
            NProgress.done()
            console.log('An error occurred', e.response);
            const error = e.response? e.response.data.errors: e.toString();
            toast.error(error)

        }
    }

    useEffect(() => {

    }, [])

    return (
        <Home_layout title="Home">
            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                    <Logo/>

                    <div className="col-xl-4 col-lg-6 col-md-8 mt-4 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">
                            <h4 className="text-center mb-5 font-weight-700">Forgot Password</h4>

                            <form id="login_form" onSubmit={(e) => reset(e, 'reset_button')}>
                                <div className="row">

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="email" value={user.email} onChange={handleChange}
                                                   className="form-control" placeholder="email" name="email"/>
                                            <label>Email</label>
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mx-auto">

                                        <button className="btn btn-lg p-3 mt-4 btn-primary w-100" disabled={loadingButton}
                                                id="reset_button">Send Email
                                        </button>

                                        <p className="mb-0 mt-4 text-center">
                                            <Link href="register">
                                                <a className="">Create an
                                            account</a>
                                            </Link>
                                            </p>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>


                    <div className="text-center">
                        <span className="me-4">&copy; 2022</span>
                        <a href="" className="font-gray-3 me-4">Privacy policy</a>
                        <a href="" className="font-gray-3">Terms & conditions</a>
                    </div>

                </div>

            </div>
        </Home_layout>
    )
}
