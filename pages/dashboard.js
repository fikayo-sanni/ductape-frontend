import Dashboard_Layout from "../components/layout/dashboard_layout";
import React, {useContext, Component, useEffect, useState} from "react";
import Icon, {UploadOutlined} from "@ant-design/icons";
import Link from "next/link";


export default function Index(props) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);


    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };


    useEffect(() => {

    }, [])

    return (
        <Dashboard_Layout title="Home">

            <section className="padding_30">


                <div className="row">
                    <div className="col-lg-4">
                        <div className="border p-4 text-center border_radius">
                            <p className="m-0 text-primary font-xs text-uppercase">Files Uploaded</p>
                            <h1 className="m-0 font-weight-700">15</h1>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="border p-4 text-center border_radius">
                            <p className="m-0 text-primary font-xs text-uppercase">Files Processed</p>
                            <h1 className="m-0 font-weight-700">13</h1>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="border p-4 text-center border_radius">
                            <p className="m-0 text-primary font-xs text-uppercase">Correctness</p>
                            <h1 className="m-0 font-weight-700">95%</h1>
                        </div>
                    </div>
                </div>


                <div className="col-lg-12 mt-4">
                    <Link href="upload">
                        <div className="border bg-primary-transparent cursor-pointer p-4 text-center border_radius">
                            <p className="m-0 text-primary font-lg text-uppercase"><UploadOutlined/> Upload New File</p>
                        </div>
                    </Link>

                </div>


            </section>


        </Dashboard_Layout>
    )
}
