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
import {toast} from "react-hot-toast";
import {thousandSeparator, Logo} from '../components/config/constant';
import Router, {useRouter} from "next/router";
import Link from "next/link";

export default function Index(props) {
    const [loadingButton, setLoadingButton] = useState(-1);
    const [user, setUser] = useState([]);


    const handleChange = e =>
        setUser({...user, [e.target.name]: e.target.value});

    const login = (e, buttonId) => {
        e.preventDefault();
        try {

            if (user.email === 'fikayo@gmail.com' && user.password === 'fikayo') {
                toast.success('Login successful')
                Router.push('/dashboard');
            } else {
                toast.error('Incorrect credentials')
            }

        } catch (e) {
            console.log('An error occurred', e);

            toast.error(e)

        }
    }

    useEffect(() => {

    }, [])

    return (
        <Home_layout title="Home">
            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                    <Logo size="full" className="mb-5 justify-content-center"/>

                    <div className="col-xl-4 col-lg-6 col-md-8 mt-4 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">
                            <h4 className="text-center mb-5 font-weight-700">Forgot Password</h4>

                            <form id="login_form">
                                <div className="row">

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="email" value={user.email} onChange={handleChange}
                                                   className="form-control" placeholder="email" name="email"/>
                                            <label>Email</label>
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mx-auto">

                                        <button className="btn btn-lg p-3 mt-4 btn-primary w-100"
                                                id="reg_button">Verify account
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
                        <span className="me-4">&copy; 2021</span>
                        <a href="" className="font-gray-3 me-4">Privacy policy</a>
                        <a href="" className="font-gray-3">Terms & conditions</a>
                    </div>

                </div>

            </div>
        </Home_layout>
    )
}
