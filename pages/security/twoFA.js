import Home_layout from "../../components/layout/home_layout";
import React, {useContext,Component, useEffect, useState} from "react";
import { Button, Carousel, Card, Typography } from 'antd';
import {Logo} from '../../components/config/constant';
import ls from "local-storage";
import Link from "next/link";
import * as Api from "../../components/config/api";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
const { Title } = Typography;

export default function twoFA() {
    var QRCode = require('qrcode.react');
    const [qrCode, setQrCode] = useState('http://facebook.github.io/react/');
    const [verify2fa, setVerify2fa] = useState({
        userId : 12345
    });

    const handle2faChange = e =>
        setVerify2fa({ ...verify2fa, [e.target.name]: e.target.value });

    function activate2fa() {
        try {
            NProgress.start();
            NProgress.inc();
            NProgress.configure({ ease: 'ease', speed: 500 });

            // fetch(Api.activate2fa,
            //     {
            //         method: 'POST',
            //         headers: {
            //             Authorization: 'Bearer ' + Session.token,
            //             'Content-type': 'application/json',
            //             'ip' : ls.get('ip'),
            //             'device' : ls.get('device'),
            //         }
            //     }).then((res) => res.json())
            //     .then((response109) => {
            //         NProgress.done();
            //
            //         console.log(response109);
            //
            //
            //         //  ls.set('128303002', '100OOO001O0O000OO00O0O010O0O011O00O00');
            //
            //         if (response109.status === 'successful') {
            //
            //             setQrCode(response109.data);
            //
            //             // Swal.fire({
            //             //     title: 'Success!',
            //             //     text: response109.message,
            //             //     icon: 'success',
            //             //     confirmButtonText: 'Ok'
            //             // });
            //
            //         } else {
            //             Swal.fire({
            //                 title: 'Failed!',
            //                 text: response109.message,
            //                 icon: 'error',
            //                 confirmButtonText: 'Ok'
            //             });
            //         }
            //
            //     });

        } catch (e) {
            NProgress.done();
            console.log('An error occurred', e);
            Swal.fire({
                title: 'Error!',
                text: 'An error occured while submitting the form',
                icon: 'error',
                confirmButtonText: 'Ok'
            });

        }
    }


    function confirmActivate2fa() {
        try {
            NProgress.start();
            NProgress.inc();
            NProgress.configure({ ease: 'ease', speed: 500 });

            // fetch(Api.verify2fa,
            //     {
            //         method: 'POST',
            //         body: JSON.stringify(verify2fa),
            //         headers: {
            //             Authorization: 'Bearer ' + Session.token,
            //             'Content-type': 'application/json',
            //             'ip' : ls.get('ip'),
            //             'device' : ls.get('device'),
            //         }
            //     }).then((res) => res.json())
            //     .then((response109) => {
            //         NProgress.done();
            //
            //         //console.log(verify2fa);
            //
            //         if (response109.status === 'successful') {
            //
            //             ls.set('128303002', '100OOO001O0O000OO00O0O010O0O011O00O00');
            //
            //             Swal.fire({
            //                 title: 'Success!',
            //                 text: response109.msg,
            //                 icon: 'success',
            //                 confirmButtonText: 'Ok'
            //             });
            //
            //             window.location.reload();
            //
            //         } else {
            //             Swal.fire({
            //                 title: 'Failed!',
            //                 text: response109.msg,
            //                 icon: 'error',
            //                 confirmButtonText: 'Ok'
            //             });
            //         }
            //
            //     });

        } catch (e) {
            NProgress.done();
            console.log('An error occurred', e);
            Swal.fire({
                title: 'Error!',
                text: 'An error occured while submitting the form',
                icon: 'error',
                confirmButtonText: 'Ok'
            });

        }
    }

    useEffect(() => {

    }, [])


    return (
        <Home_layout title="Account security">

            <div className="h-100 row g-0">
                <div className="col-lg-4 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                <Logo size="full" className="d-none d-lg-block" />

                    <div className="mt-5 mb-auto">
                        <h4 className="font-weight-700">Financial management at your fingertips</h4>
                        <p className="font-gray-3 mb-5">Get to manage your finances better than you have with insight into every expense or income generated
                        by your organization.</p>

                        <h4 className="font-weight-700">Access to financial reports</h4>
                        <p className="font-gray-3 mb-5">See your organization's profitability with a bird's eye view with in-depth
                        reporting analysis.</p>

                        <h4 className="font-weight-700">Automate your operation</h4>
                        <p className="font-gray-3 mb-5">Take advantage of our key features to automate your business operation to
                            produce a more efficient workflow.</p>

                        <p className="font-gray-3 ">Got more questions? <a href="#" className="">contact us</a></p>
                    </div>

                    <div className="">
                        <span className="me-4">&copy; 2021</span>
                        <a href="" className="font-gray-3 me-4">Privacy policy</a>
                        <a href="" className="font-gray-3">Terms & conditions</a>
                    </div>

                </div>
                <div className="col-lg-8 padding_50 bg-white">

                    <div className="col-lg-8 mx-auto">

                        <Logo size="full" className="mb-4 d-lg-none justify-content-center" />

                        <h1 className="text-center font-weight-700">Enable two-step verification</h1>
                        <p className="font-sm-2 mb-5 text-center font-gray">Download the Google Authenticator app on your mobile phone
                            and scan the QR Code using Google Authenticator app.</p>

                        {
                            qrCode ? (

                                        <div className="text-center mx-auto">
                                            <QRCode value={qrCode}  />
                                    </div>
                            ) : null
                        }


                        <div className="row">
                            <div className="col-12 mt-4">
                                <p className="font-sm-2 text-center font-gray">Enter the generated code below:</p>
                                <div className="form-floating">
                                    <input type="text" name="twoFAToken" placeholder="enter code" onChange={handle2faChange} className="text-center font-lg form-control"  />
                                    <label>Enter 6 digit verification code</label>
                                </div>
                            </div>

                            <div className="col-lg-12 mx-auto">

                                <Link href="login">
                                <button  className="btn btn-lg mt-4 btn-primary w-100">Activate</button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </Home_layout>
    )
}

