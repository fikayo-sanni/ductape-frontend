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
    Space
} from 'antd';
import {InboxOutlined,ArrowRightOutlined, EditOutlined, UploadOutlined, SearchOutlined} from '@ant-design/icons';
import {thousandSeparator, Logo} from '../components/config/constant';
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";
import moment from "moment";

const {Title} = Typography;
const {TabPane} = Tabs;

export default function index() {
    const [loading, setLoading] = useState(false);
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


    const data = [{
        'id': 'SF-162F318',
        'contents' : 'Plain Shirts',
        'pickup' : {
            'location': 'Xiamen, China',
            'readyDate': new Date('2021/02/24'),
        },
        'destination' : {
            'location' : 'Lagos, Nigeria',
            'expiryDate': new Date('2021/02/17'),
        },
        'cost' : {
            'amount' : 14900000,
            'symbol' : '₦'
        },
        'status' : 'pending'
    },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'ready'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },
        {
            'id': 'SF-162F318',
            'contents' : 'Plain Shirts',
            'pickup' : {
                'location': 'Xiamen, China',
                'readyDate': new Date('2021/02/24'),
            },
            'destination' : {
                'location' : 'Lagos, Nigeria',
                'expiryDate': new Date('2021/02/17'),
            },
            'cost' : {
                'amount' : 14900000,
                'symbol' : '₦'
            },
            'status' : 'booked'
        },

    ];

    const columns2 = [
        {
            title: '',
           // dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('date'),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend'],
            render: (record) => (
                <div className="ms-4">
                <div className="d-flex align-items-center ps-2">
                    <Avatar src="/images/icons/ship.svg" className="me-3" shape="square" size={22}/>
                    <div>
                    <span className="text-primary me-3 font-weight-600">{record.id}</span>
                        <span className="me-3">•</span>
                        <span>{record.contents}</span>
                    </div>
                </div>
                    <button className="btn btn-outline-dark mt-2 btn-pill btn-sm text-uppercase">Import</button>
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 'pickup',
            key: 'pickup',
            ...getColumnSearchProps('pickup'),
            sorter: (a, b) => a.pickup.length - b.pickup.length,
            sortDirections: ['descend', 'ascend'],
            render: (pickup) => (
                <div>
                    <p className="mb-1 font-weight-600">{pickup.location}</p>
                    <p className="m-0 font-gray">Ready: {moment(pickup.ready).format('Do MMM, YYYY')}</p>
                </div>
            )

        },
        {
            title: '',
            width: '7%',
            render: (record) => (
                <img src="/images/icons/arrow_right.svg" className="img-fluid" />
            )

        },
        {
            title: '',
            dataIndex: 'destination',
            key: 'destination',
            ...getColumnSearchProps('destination'),
            sorter: (a, b) => a.destination.length - b.destination.length,
            sortDirections: ['descend', 'ascend'],
            render: (destination) => (
                <div>
                    <p className="mb-1 font-weight-600">{destination.location}</p>
                    <p className="m-0 font-gray">Expiry: {moment(destination.ready).format('Do MMM, YYYY')}</p>
                </div>
            )

        },
        {
            title: '',
            dataIndex: 'cost',
            key: 'cost',
            ...getColumnSearchProps('cost'),
            sorter: (a, b) => a.cost.length - b.cost.length,
            sortDirections: ['descend', 'ascend'],
            render: (cost) => (
                <div className="me-5">
                    <p className="m-0 font-weight-600">{cost.symbol} {thousandSeparator(cost.amount)}</p>
                </div>
            )

        },
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
                        <p className="m-0 text-capitalize text-warning">{status}</p>
                    ):status === 'booked' ? (
                        <p className="m-0 text-capitalize font_gray">{status}</p>
                    ):status === 'ready' ? (
                    <p className="m-0 text-capitalize text-success">{status}</p>
                    ):null

                )

        }

    ];


    useEffect(() => {

    }, [])

    return (
        <Dashboard_Layout title="Quotes">


            <Tabs defaultActiveKey="1"
                  className="page_tabs"
                  tabBarStyle={{paddingLeft: 44}}
                //onChange={callback}
            >
                <TabPane tab={<span className="align-items-center d-flex">All  <Badge count={42}
                                                                                      style={{backgroundColor: '#E9ECF1'}}/></span>}
                         key="1">

                    <section className="" style={{ height:'80vh', overflowY: 'auto' }}>

                        <Table rowClassName="px-5" showHeader={false} columns={columns2} dataSource={data}
                               pagination={{showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} results`, defaultPageSize: 7, showSizeChanger: true}}/>
                    </section>

                </TabPane>
                <TabPane tab={<span className="align-items-center d-flex">Pending  <Badge count={31}
                                                                                          style={{backgroundColor: '#E9ECF1'}}/></span>}
                         key="2">

                    pending

                </TabPane>
                <TabPane tab={<span className="align-items-center d-flex">Ready  <Badge count={42}
                                                                                        style={{backgroundColor: '#E9ECF1'}}/></span>}
                         key="3">

                    ready
                </TabPane>
                <TabPane tab={<span className="align-items-center d-flex">Booked  <Badge count={0} showZero={true}
                                                                                         style={{backgroundColor: '#E9ECF1'}}/></span>}
                         key="4">

                    booked
                </TabPane>
            </Tabs>


        </Dashboard_Layout>
    )
}
