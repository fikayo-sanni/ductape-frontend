import Dashboard_Layout from "../components/layout/dashboard_layout";
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
import {InboxOutlined, CloseCircleOutlined, EditOutlined, UploadOutlined, SearchOutlined} from '@ant-design/icons';
import {thousandSeparator, Logo} from '../components/config/constant';
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import * as ls from "local-storage";
import moment from "moment";
import {PdfData, VerbosityLevel} from 'pdfdataextract';
import {readFileSync} from 'fs';


const {Title, Paragraph, Text} = Typography;
const {TabPane} = Tabs;

export default function Index(props) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);


    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        onChange: onChange,
        //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        beforeUpload: (file) => {
            console.log(file)
            return false;
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);

            return setFileList(newFileList)
            //console.log(fileList);
        },
    };

    const uploadFiles = async () => {
        let urls = [];

        if (fileList.length >= 1) {

            toast('Uplaoding ')

            for (const image in fileList) {

                let file = fileList[image];

                const fdata = new FormData()
                fdata.append('file', file.originFileObj)
                fdata.append('upload_preset', 'kpfavf70')
                fdata.append("cloud_name", "kpfavf70")

                await fetch("https://api.cloudinary.com/v1_1/avamot/upload", {
                    method: "POST",
                    body: fdata
                }).then(res => res.json()).then(data => {

                    toast.success('Successfully uploaded image ' + image)

                    window.location = '/?file=' + data.secure_url;

                }).catch(err => {
                    alert("An error occured while uploading")
                })


                //urls.push(url);
            }

        }

        ls.set('files', urls);

    }

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <Dashboard_Layout title="Home">

            <section className="padding_30">

                <h6 className="font-sm ">Add new photos <span className="text-danger">*</span></h6>
                <Upload
                    className=""
                    listType="picture"
                    {...uploadProps}

                > <Button className="w-100 form-control" icon={<UploadOutlined/>}> Select gallery photos</Button>
                </Upload>

                <button onClick={() => uploadFiles()} className="btn mt-4 btn-primary">Upload Files</button>

                {/*{*/}
                {/*    props.data.title && (*/}

                {/*        <div>*/}

                {/*            <div className="card mt-4 mb-4">*/}
                {/*                <div className="card-header p-3">*/}
                {/*                    <h5 className="m-0">Content</h5>*/}
                {/*                </div>*/}
                {/*                <div className="card-body lead">*/}
                {/*                    {props.data.text}*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="card col-lg-4">*/}
                {/*                <div className="card-header p-3">*/}
                {/*                    <h5 className="m-0">File info</h5>*/}
                {/*                </div>*/}
                {/*                <div className="card-body lead">*/}
                {/*                    <table className="table m-0 table-striped">*/}
                {/*                        <tbody>*/}
                {/*                        <tr>*/}
                {/*                            <td>File name</td>*/}
                {/*                            <td>{props.data.info.Title}</td>*/}
                {/*                        </tr>*/}
                {/*                        <tr>*/}
                {/*                            <td>No. of pages</td>*/}
                {/*                            <td>{props.data.pages}</td>*/}
                {/*                        </tr>*/}
                {/*                        <tr>*/}
                {/*                            <td>Date created</td>*/}
                {/*                            <td>{props.data.info.CreationDate}</td>*/}
                {/*                        </tr>*/}
                {/*                        </tbody>*/}
                {/*                    </table>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}


            </section>


        </Dashboard_Layout>
    )
}

export async function getServerSideProps({query}) {
    const {file} = query
    const crawler = require('crawler-request');

    let pdfData = 'hello world';


    if (file) {
        pdfData = file;


            const file_data = readFileSync(file);

            await PdfData.extract(file_data, {
                // password: '123456', // password of the pdf file
                // pages: 1, // how many pages should be read at most
                // sort: true, // sort the text by text coordinates
                verbosity: VerbosityLevel.ERRORS, // set the verbosity level for parsing
                get: { // enable or disable data extraction (all are optional and enabled by default)
                    pages: true, // get number of pages
                    text: true, // get text of each page
                    fingerprint: false, // get fingerprint
                    outline: true, // get outline
                    metadata: true, // get metadata
                    info: true, // get info
                    permissions: true, // get permissions
                },
            }).then((data) => {
                if (data) {
                    pdfData = {text: data.text, pages: data.pages, info: data.info};
                } else {
                    pdfData = 'nothing here';
                }

                // data.pages; // the number of pages
                // data.text; // an array of text pages
                // data.fingerprint; // fingerprint of the pdf document
                // data.outline; // outline data of the pdf document
                // data.info; // information of the pdf document, such as Author
                // data.metadata; // metadata of the pdf document
                // data.permissions; // permissions for the document
            });
    }

    // Pass data to the page via props
    return {props: {data: pdfData}}
}