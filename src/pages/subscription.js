import Dashboard_Layout from "../components/layout/dashboard_layout";
import React, {useContext, Component, useEffect, useState} from "react";
import {
    DatePicker
} from 'antd';
import moment from "moment";
import {DownloadOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

export default function Subscription(props) {


    const plans = [
        {
            id: 1,
            recommended: false,
            plan: 'Basic',
            noOfAccounts: 30,
            fee: 99,
            permissions: [
                {item: '30 Documents per month', active: true},
                {item:'Document storage', active:false},
                {item:'Insight & reports', active: false}
            ]
        },
        {
            id: 2,
            recommended: true,
            plan: 'Intermediate',
            noOfAccounts: 30,
            fee: 199,
            permissions: [
                {item: '500 Documents per month', active: true},
                {item:'2GB document storage', active:true},
                {item:'Summary insight & reports', active: true}
            ]
        },
        {
            id: 3,
            recommended: false,
            plan: 'Expert',
            noOfAccounts: 30,
            fee: 599,
            permissions: [
                {item: 'Unlimited Documents per month', active: true},
                {item:'50GB document storage', active:true},
                {item:'Full indepth insight & reports', active: true}
            ]
        }
    ]


    useEffect(() => {
        //console.log(props)
    }, [])

    return (
        <Dashboard_Layout title="Subscription">
            <section className="padding_30">


                <div className="row align-items-stretch g-4">


                    {
                        plans.map((plan, index) => (
                            <div className={[plan.recommended === true ? "col-sm-4" : "col-sm-4 mt-4", ''].join(' ')}>
                                <div
                                    className={[plan.recommended === true ? "plan pb-5 shadow-sm recommended" : "plan mt-4", 'border rounded-3'].join(' ')}>
                                    <div className="text-center p-4">
                                        {plan.recommended === true ? (
                                            <div className="d-flex mb-4 justify-content-center w-100 ">
                                                <div
                                                    className="text-uppercase bg-primary rounded-pill font-xs px-4 font-white">Recommended
                                                </div>
                                            </div>) : null}

                                        <p className="text-uppercase font-lg font-weight-700">{plan.plan}</p>

                                        <h3 className="font-weight-700 mb-0 font-xl "><span
                                            className="font-sm-2 font-weight-400">$</span>{plan.fee}</h3>
                                        <p className="font-gray mb-4  text-primary">Per user / month</p>

                                        <button className="btn btn-primary w-100 text-uppercase btn-lg">Choose
                                            Plan
                                        </button>

                                    </div>

                                    <div>
                                        {
                                            plan.permissions.map((feature) => (
                                                <div className={["py-2 text-capitalize px-4 border-bottom"].join(' ')}>
                                                    { feature.active ? feature.item : <del>{feature.item}</del>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>

            </section>
        </Dashboard_Layout>
    )
}
