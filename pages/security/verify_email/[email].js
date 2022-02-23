import Home_layout from "../../../components/layout/home_layout";
import React, {useContext,Component, useEffect, useState} from "react";
import {Button, Carousel, Card, Typography, notification} from 'antd';
import {Logo, Mybutton} from '../../../components/config/constant';
import ls from "local-storage";
import Link from "next/link";
import * as Api from "../../../components/config/api";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import axios from "axios";
import {verifyEmail} from "../../../components/config/api";
import landing_sidebar from "../../../components/common/landing_sidebar";
import toast from "react-hot-toast";
const { Title } = Typography;


export default function verify_email(props) {
    const [c1, setC1] = useState(null);
    const [c2, setC2] = useState(null);
    const [c3, setC3] = useState(null);
    const [c4, setC4] = useState(null);
    const [c5, setC5] = useState(null);
    const [c6, setC6] = useState(null);
    const [loadingButton, setLoadingButton] = useState(null);
    const axios = require('axios');



    const handleChange = e =>
    {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");

        // Check if they hit the max character length
        if (value.length >= maxLength) {
            // Check if it's not the last input field
            if (parseInt(fieldIndex, 10) < 6) {
                // Get the next input field
                const nextSibling = document.querySelector(
                    `input[name=c-${parseInt(fieldIndex, 10) + 1}]`
                );

                // If found, focus the next field
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }

        if(`c${fieldIndex}` === 'c1')
        {
            setC1(e.target.value)
        }else if(`c${fieldIndex}` === 'c2')
        {
            setC2(e.target.value)
        }else if(`c${fieldIndex}` === 'c3')
        {
            setC3(e.target.value)
        }else if(`c${fieldIndex}` === 'c4')
        {
            setC4(e.target.value)
        }else if(`c${fieldIndex}` === 'c5')
        {
            setC5(e.target.value)
        }else if(`c${fieldIndex}` === 'c6')
        {
            setC6(e.target.value)
        }


       // this.setState({...this.state, code: {...this.state.code, [`c${fieldIndex}`]: e.target.value}});
    }

    const handleSubmit = (e,buttonId) => {

        e.preventDefault();
        try{

            setLoadingButton(buttonId);

                    axios({
                        method: 'POST',
                        url: Api.verifyEmail,
                        data: {
                            email: props.email,
                            token : (c1 + c2 + c3 + c4 + c5 + c6)
                        },
                    }).then((response) => {


                        if (response.data.status === true) {

                            setLoadingButton(-1);
                            toast.success(response.data.message)

                            setTimeout(()=>{
                                window.location.href = '/security/login';
                            }, 2000);

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
        <Home_layout title="Verify Email">

            <div className="h-100 row g-0 overflow-hidden">
                {landing_sidebar()}


                <div className="col-lg-8 padding_50 bg-white d-flex align-items-center justify-content-center">

                <div className="col-lg-7 mx-auto">

                        <Logo size="full" className="mb-4 d-lg-none justify-content-center" />

                        <h1 className="text-center font-weight-700">Verify your email address</h1>
                        <p className="font-sm-2 mb-5 text-center font-gray">We emailed you a six-digit code to <strong className="text-primary">{props.email}</strong>.
                        Enter the code below to confirm your email address.</p>

                        <form id='reg_form' onSubmit={(e) => handleSubmit(e, 'reg_button')} >
                        <div className="row">
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required value={c1} onChange={handleChange} name="c-1" maxLength="1" className="text-center font-lg form-control"  />
                                </div>
                            </div>
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required onChange={handleChange} name="c-2" maxLength="1" className="text-center font-lg form-control" />
                                </div>
                            </div>
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required onChange={handleChange} name="c-3" maxLength="1" className="text-center font-lg form-control"  />
                                </div>
                            </div>
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required onChange={handleChange} name="c-4" maxLength="1" className="text-center font-lg form-control"  />
                                </div>
                            </div>
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required onChange={handleChange} name="c-5" maxLength="1" className="text-center font-lg form-control" />
                                </div>
                            </div>
                            <div className="col-2 p-1 mb-4">
                                <div className="">
                                    <input type="text" required onChange={handleChange} name="c-6" maxLength="1" className="text-center font-lg form-control" />
                                </div>
                            </div>

                            <div className="col-lg-12 mx-auto">

                                <Mybutton className="btn btn-lg mt-4 btn-primary w-100" id="reg_button"
                                          loading={loadingButton === 'reg_button' ? true : false}
                                          changeText="Verifying your account" form="reg_form"
                                          title="Continue"/>


                                <p className="mb-0 mt-4 font-sm text-center">Didn't get an email? <a href="#" className="font-sm">Resend</a></p>
                            </div>
                        </div>
                        </form>
                    </div>


                </div>
            </div>


        </Home_layout>
    )
}



export const getServerSideProps = async ({params}) => {
    const email = params.email;
    return {
        props: { email }
    }
}