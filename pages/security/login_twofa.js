import Home_layout from "../../components/layout/home_layout";
import React, {useContext,Component, useEffect, useState} from "react";
import { Button, Carousel, Card, Typography } from 'antd';
import {Logo} from '../../components/config/constant';
import ls from "local-storage";
import Link from "next/link";
import * as Api from "../../components/config/api";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import {LockOutlined, UnlockOutlined} from "@ant-design/icons";
const { Title } = Typography;

export default class Login_twofa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            code : {
                c1 : null,
                c2 : null,
                c3 : null,
                c4 : null,
                c5 : null,
                c6 : null,
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
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

        this.setState({...this.state, code: {...this.state.code, [`c${fieldIndex}`]: e.target.value}});
    }


render()
{
    return (
        <Home_layout title="Login Verification">

            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                <Logo size="full" className="mb-5 justify-content-center" />

                    <div className="col-lg-5 col-xl-4 col-md-8 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">

                            <div className="text-center d-flex mb-3 justify-content-center">
                                 <div className="bg-primary-transparent p-4 rounded-circle">
                                <LockOutlined className="font-lg" />
                            </div>
                            </div>

                            <h4 className="text-center font-weight-700">Two factor authentication</h4>
                            <p className="font-gray-3 text-center mb-5">Enter the 6-digit code displayed on your Authenticator mobile app</p>

                            <div className="row">
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-1" maxLength="1" className="text-center font-lg form-control"  />
                                    </div>
                                </div>
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-2" maxLength="1" className="text-center font-lg form-control" />
                                    </div>
                                </div>
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-3" maxLength="1" className="text-center font-lg form-control"  />
                                    </div>
                                </div>
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-4" maxLength="1" className="text-center font-lg form-control"  />
                                    </div>
                                </div>
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-5" maxLength="1" className="text-center font-lg form-control" />
                                    </div>
                                </div>
                                <div className="col-2 p-1 mb-4">
                                    <div className="">
                                        <input type="text" onChange={this.handleChange} name="c-6" maxLength="1" className="text-center font-lg form-control" />
                                    </div>
                                </div>


                                <div className="col-lg-12 mx-auto">
                                    <Link href="/dashboard/get_started">
                                        <button className="btn btn-lg mt-4 btn-primary w-100">Continue</button>
                                    </Link>
                                    <p className="mb-0 mt-4 font-sm text-center">Not your account? <a href="#" className="font-sm">Logout</a></p>
                                </div>
                            </div>
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
}
