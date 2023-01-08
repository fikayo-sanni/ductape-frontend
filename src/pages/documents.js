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
import Link from "next/link";
import Home_layout from "../components/layout/home_layout";

const https = require('https');
const {Title, Paragraph, Text} = Typography;
const {TabPane} = Tabs;
const { Dragger } = Upload;

export default function Index(props) {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');


    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    // ref={node => {
                    //     this.searchInput = node;
                    // }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                //  setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };


    const data = [
        {
            'id': 'Doc-162F318',
            'title': '24x Waybill.pdf',
            'date': new Date('2021/02/17'),
            'size': '145kb',
            'user': 'Mika James',
            'type': 'Invoice',
            'status': 'pending'
        },
        {
            'id': 'Doc-1290D0',
            'title': 'Steve_Ayoola_ID.pdf',
            'size': '72kb',
            'date': new Date('2021/02/17'),
            'user': 'Steven Ayoola',
            'type': 'ID card',
            'status': 'ready'
        },
        {
            'id': 'Doc-162F318',
            'title': '24x Waybill.pdf',
            'date': new Date('2021/02/17'),
            'size': '145kb',
            'user': 'Mika James',
            'type': 'Invoice',
            'status': 'pending'
        },
        {
            'id': 'Doc-1290D0',
            'title': 'Steve_Ayoola_ID.pdf',
            'date': new Date('2021/02/17'),
            'size': '72kb',
            'user': 'Steven Ayoola',
            'type': 'ID card',
            'status': 'ready'
        },
        {
            'id': 'Doc-162F318',
            'title': '24x Waybill.pdf',
            'date': new Date('2021/02/17'),
            'size': '145kb',
            'user': 'Mika James',
            'type': 'Invoice',
            'status': 'pending'
        },
        {
            'id': 'Doc-1290D0',
            'date': new Date('2021/02/17'),
            'title': 'Steve_Ayoola_ID.pdf',
            'size': '72kb',
            'user': 'Steven Ayoola',
            'type': 'ID card',
            'status': 'ready'
        },
        {
            'id': 'Doc-162F318',
            'title': '24x Waybill.pdf',
            'size': '145kb',
            'date': new Date('2021/02/17'),
            'user': 'Mika James',
            'type': 'Invoice',
            'status': 'pending'
        },
        {
            'id': 'Doc-1290D0',
            'title': 'Steve_Ayoola_ID.pdf',
            'date': new Date('2021/02/17'),
            'size': '72kb',
            'user': 'Steven Ayoola',
            'type': 'ID card',
            'status': 'ready'
        },
    ];

    const pending =
        [
            {
                'id': 'Doc-162F318',
                'title': '24x Waybill.pdf',
                'date': new Date('2021/02/17'),
                'size': '145kb',
                'user': 'Mika James',
                'type': 'Invoice',
                'status': 'pending'
            },
            {
                'id': 'Doc-162F318',
                'title': '24x Waybill.pdf',
                'date': new Date('2021/02/17'),
                'size': '145kb',
                'user': 'Mika James',
                'type': 'Invoice',
                'status': 'pending'
            },
            {
                'id': 'Doc-162F318',
                'title': '24x Waybill.pdf',
                'date': new Date('2021/02/17'),
                'size': '145kb',
                'user': 'Mika James',
                'type': 'Invoice',
                'status': 'pending'
            },
            {
                'id': 'Doc-162F318',
                'title': '24x Waybill.pdf',
                'size': '145kb',
                'date': new Date('2021/02/17'),
                'user': 'Mika James',
                'type': 'Invoice',
                'status': 'pending'
            }
        ];

    const ready =
        [
            {
                'id': 'Doc-1290D0',
                'title': 'Steve_Ayoola_ID.pdf',
                'size': '72kb',
                'date': new Date('2021/02/17'),
                'user': 'Steven Ayoola',
                'type': 'ID card',
                'status': 'ready'
            },
            {
                'id': 'Doc-1290D0',
                'title': 'Steve_Ayoola_ID.pdf',
                'date': new Date('2021/02/17'),
                'size': '72kb',
                'user': 'Steven Ayoola',
                'type': 'ID card',
                'status': 'ready'
            },
            {
                'id': 'Doc-1290D0',
                'date': new Date('2021/02/17'),
                'title': 'Steve_Ayoola_ID.pdf',
                'size': '72kb',
                'user': 'Steven Ayoola',
                'type': 'ID card',
                'status': 'ready'
            },
            {
                'id': 'Doc-1290D0',
                'title': 'Steve_Ayoola_ID.pdf',
                'date': new Date('2021/02/17'),
                'size': '72kb',
                'user': 'Steven Ayoola',
                'type': 'ID card',
                'status': 'ready'
            },
        ];

    const columns2 = [
        {
            title: '',
            // dataIndex: 'id',
            key: 'id',
            width: '20%',
            ...getColumnSearchProps('date'),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend'],
            render: (record) => (
                <div className="ms-4">
                    <div className="d-flex align-items-center ps-2">
                        <i className="fa fa-file font-weight-100 fa-2x me-3"></i>
                        <div>
                            <span className="text-primary me-3 font-weight-600">{record.id}</span>
                            <p className="m-0 font-gray">{record.size}</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.length - b.type.length,
            sortDirections: ['descend', 'ascend'],
            render: (type) => (
                <div>
                    <p className="mb-1 text-capitalize font-weight-600">{type}</p>
                </div>
            )

        },
        {
            title: '',
            //dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
            render: (record) => (
                <div>
                    <p className="mb-1 text-capitalize font-weight-600">{record.title}</p>
                    <p className="m-0 font-gray">By <span className="text-primary">{record.user}</span></p>
                </div>
            )

        },
        {
            title: '',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend'],
            render: (date) => (
                <div>
                    <p className="mb-1 font-weight-600">{moment(date).format('Do MMM, YYYY')}</p>
                </div>
            )

        },
        // {
        //     title: '',
        //     dataIndex: 'cost',
        //     key: 'cost',
        //     ...getColumnSearchProps('cost'),
        //     sorter: (a, b) => a.cost.length - b.cost.length,
        //     sortDirections: ['descend', 'ascend'],
        //     render: (cost) => (
        //         <div className="me-5">
        //             <p className="m-0 font-weight-600">{cost.symbol} {thousandSeparator(cost.amount)}</p>
        //         </div>
        //     )
        //
        // },
        {
            title: '',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status'),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
            render: (status) =>
                (
                    status === 'pending' ? (
                        <div className="m-0 text-capitalize">
                            <badge className="badge bg-warning font-black">{status}</badge>
                        </div>
                    ) : status === 'ready' ? (
                        <div className="m-0 d-flex align-items-center text-capitalize">
                            <badge className="badge bg-success me-3">{status}</badge>
                            <button className="btn btn-outline-dark btn-pill  text-uppercase">Download</button>
                        </div>
                    ) : null

                )

        }

    ];


    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        //console.log(props)
    }, [])

    return (
        <Dashboard_Layout title="My Documents">
            <section className="padding_30">




                <Tabs defaultActiveKey="1"
                      className="page_tabs animated slideInUp"
                      tabBarStyle={{paddingLeft: 44}}
                      tabBarExtraContent={<div>
                          <button className="btn btn-primary btn-pill font-white text-uppercase">Download All</button>
                      </div>}
                    //onChange={callback}
                >
                    <TabPane tab={<span className="align-items-center d-flex">All  <Badge count={data.length}
                                                                                          style={{backgroundColor: '#E9ECF1'}}/></span>}
                             key="1">

                        <section className="" style={{height: '83vh', overflowY: 'auto'}}>

                            <Table rowClassName="px-5" showHeader={false} columns={columns2} dataSource={data}
                                   pagination={{
                                       showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} results`,
                                       defaultPageSize: 7,
                                       showSizeChanger: true
                                   }}/>
                        </section>

                    </TabPane>
                    <TabPane tab={<span className="align-items-center d-flex">Pending  <Badge count={pending.length}
                                                                                              style={{backgroundColor: '#E9ECF1'}}/></span>}
                             key="2">

                        <section className="" style={{height: '83vh', overflowY: 'auto'}}>

                            <Table rowClassName="px-5" showHeader={false} columns={columns2} dataSource={pending}
                                   pagination={{
                                       showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} results`,
                                       defaultPageSize: 7,
                                       showSizeChanger: true
                                   }}/>
                        </section>

                    </TabPane>
                    <TabPane tab={<span className="align-items-center d-flex">Ready  <Badge count={ready.length}
                                                                                            style={{backgroundColor: '#E9ECF1'}}/></span>}
                             key="3">

                        <section className="" style={{height: '83vh', overflowY: 'auto'}}>

                            <Table rowClassName="px-5" showHeader={false} columns={columns2} dataSource={ready}
                                   pagination={{
                                       showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} results`,
                                       defaultPageSize: 7,
                                       showSizeChanger: true
                                   }}/>
                        </section>
                    </TabPane>
                    {/*<TabPane tab={<span className="align-items-center d-flex">Booked  <Badge count={0} showZero={true}*/}
                    {/*                                                                         style={{backgroundColor: '#E9ECF1'}}/></span>}*/}
                    {/*         key="4">*/}

                    {/*    <section className="col-lg-8 py-5 mx-auto" >*/}

                    {/*        <Result*/}
                    {/*            status="error"*/}
                    {/*            icon={<i className="fa fa-folder-open fa-5x font_gray"></i>}*/}
                    {/*            title="No Result Found"*/}
                    {/*            subTitle="Kindly check back again later or reload the page to check for new information."*/}
                    {/*            extra={[*/}
                    {/*                <Button type="primary" key="console">*/}
                    {/*                    Reload page*/}
                    {/*                </Button>,*/}
                    {/*            ]}*/}
                    {/*        >*/}
                    {/*        </Result>*/}

                    {/*    </section>*/}
                    {/*</TabPane>*/}
                </Tabs>

            </section>
        </Dashboard_Layout>
    )
}
