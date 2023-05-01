import Home_Layout from '../components/layout/home_layout';
import React, {useContext, Component, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {Logo} from '../components/config/constant';
import Router, {useRouter} from "next/router";
import Link from "next/link";
import { useNProgress } from '@tanem/react-nprogress'
import { changePasswordUser } from "../components/services/users.service";
import NProgress from "nprogress";

const changePassword = () => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        repeat_password: '',
        token: ''
      });


    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }


    const changePass = async(e, buttonId) => {
        e.preventDefault(); 
        try {
            if (data.password === data.repeat_password) {
                setLoadingButton(true);
                NProgress.start();
                //toast.success('Registration successful')
                await changePasswordUser({...data, repeat_password: undefined});
                toast.success('password change successful')
                Router.push('/');
            } else {
                toast.error('passwords do not match')
            }
        } catch (e) {
            setLoadingButton(false)
            NProgress.done();
            console.log('An error occurred', e);
            const error = e.response? e.response.data.errors: e.toString();
            toast.error(error)
        }
    }
    useEffect(() => {

    }, []);

    return (
        <Home_Layout title="Home">
            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                    <Logo/>

                    <div className="col-xl-6 col-lg-6 col-md-8 mt-4 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">
                            <h4 className="text-center mb-5 font-weight-700">New Password</h4>

                            <form id="register_form" onSubmit={(e) => changePass(e, 'reg_button')}>
                                <div className="row">
                                <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input  type = "email" value={data.email} onChange={handleChange} required
                                                   className="form-control" placeholder="email" name="email"/>
                                            <label>Email</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input  value={data.token} onChange={handleChange} required
                                                   className="form-control" placeholder="token" name="token"/>
                                            <label>Token</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="password" value={data.password} onChange={handleChange} required
                                                   className="form-control" placeholder="password" name="password"/>
                                            <label>Password</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="password" value={data.repeat_password} onChange={handleChange} required
                                                   className="form-control" placeholder="repeat_password" name="repeat_password"/>
                                            <label>Confirm Password</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mx-auto">

                                        <button className="btn btn-lg p-3 mt-4 btn-primary w-100" id="reg_button" disabled={loadingButton}>change password
                                        </button>

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
        </Home_Layout>
    );
};

export default changePassword