import Dashboard_Layout from "../components/layout/dashboard_layout";
import React, {useContext, Component, useEffect, useState} from "react";
import {
   DatePicker
} from 'antd';
import moment from "moment";

const {RangePicker} = DatePicker;

export default function Reports(props) {
    const [dateFrom, setDateFrom] = useState('2022-04-05');
    const [dateTo, setDateTo] = useState('2022-04-30');



    useEffect(() => {
        //console.log(props)
    }, [])

    return (
        <Dashboard_Layout title="Reports">
            <section className="padding_30">

                <div className="bg-primary-transparent mb-5 p-3">

                    <div className="row">
                        <div className="col-lg-6">
                            <label>Select type</label>
                            <select className="form-control">
                                <option selected>Invoice</option>
                                <option>ID Card</option>
                                <option>Receipt</option>
                                <option>Driver's License</option>
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label>Select date</label>
                            <RangePicker defaultValue={[moment('2022-04-05'), moment('2022-04-30')]} className="w-100"/>
                        </div>
                    </div>

                {/*<button onClick={() => uploadFiles()} className="btn mt-4 btn-primary">Genrate Report</button>*/}
                </div>

                <h4 className="font-weight-700 mb-3">Report from {moment(dateFrom).format('DD MMMM, Y')} to {moment(dateTo).format('DD MMMM, Y')}</h4>

                <table className="table table-striped">
                <tbody>
                <tr>
                    <td>Date</td>
                    <td>27th April, 2022</td>
                </tr>
                <tr>
                    <td>Expected Inflow ($)</td>
                    <td>2,091</td>
                </tr>
                <tr>
                    <td>Expected Outflow ($)</td>
                    <td>192</td>
                </tr>
                <tr>
                    <td>Actual Outflow ($)</td>
                    <td>254</td>
                </tr>
                <tr>
                    <td>Actual Outflow ($)</td>
                    <td>1,874</td>
                </tr>
                <tr>
                    <td>Outflow Discrepancy (%)</td>
                    <td>24.5</td>
                </tr>
                <tr>
                    <td>Inflow Discrepancy (%)</td>
                    <td>5</td>
                </tr>
                </tbody>
                </table>

                <button className="btn btn-outline-primary btn-pill mt-4 text-uppercase">Download</button>

            </section>
        </Dashboard_Layout>
    )
}
