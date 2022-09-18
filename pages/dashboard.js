import Dashboard_Layout from "../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import Icon, { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  Button,
  Breadcrumb,
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
  Result,
} from "antd";
import {
  InboxOutlined,
  CloseCircleOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function Index(props) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //     this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        //  setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const data = [
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      size: "72kb",
      date: new Date("2021/02/17"),
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      date: new Date("2021/02/17"),
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-1290D0",
      date: new Date("2021/02/17"),
      title: "Steve_Ayoola_ID.pdf",
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      size: "145kb",
      date: new Date("2021/02/17"),
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      date: new Date("2021/02/17"),
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
  ];

  const pending = [
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      date: new Date("2021/02/17"),
      size: "145kb",
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
    {
      id: "Doc-162F318",
      title: "24x Waybill.pdf",
      size: "145kb",
      date: new Date("2021/02/17"),
      user: "Mika James",
      type: "Invoice",
      status: "pending",
    },
  ];

  const ready = [
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      size: "72kb",
      date: new Date("2021/02/17"),
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      date: new Date("2021/02/17"),
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-1290D0",
      date: new Date("2021/02/17"),
      title: "Steve_Ayoola_ID.pdf",
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
    {
      id: "Doc-1290D0",
      title: "Steve_Ayoola_ID.pdf",
      date: new Date("2021/02/17"),
      size: "72kb",
      user: "Steven Ayoola",
      type: "ID card",
      status: "ready",
    },
  ];

  const columns2 = [
    {
      title: "",
      // dataIndex: 'id',
      key: "id",
      width: "20%",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
      render: (record) => (
        <div className="ms-4">
          <div className="d-flex align-items-center ps-2">
            <i className="fa fa-file font-weight-100 fa-2x me-3"></i>
            <div>
              <span className="text-primary me-3 font-weight-600">
                {record.id}
              </span>
              <p className="m-0 font-gray">{record.size}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend", "ascend"],
      render: (type) => (
        <div>
          <p className="mb-1 text-capitalize font-weight-600">{type}</p>
        </div>
      ),
    },
    {
      title: "",
      //dataIndex: 'title',
      key: "title",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
      render: (record) => (
        <div>
          <p className="mb-1 text-capitalize font-weight-600">{record.title}</p>
          <p className="m-0 font-gray">
            By <span className="text-primary">{record.user}</span>
          </p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
      render: (date) => (
        <div>
          <p className="mb-1 font-weight-600">
            {moment(date).format("Do MMM, YYYY")}
          </p>
        </div>
      ),
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
      title: "",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: (status) =>
        status === "pending" ? (
          <div className="m-0 text-capitalize">
            <badge className="badge bg-warning font-black">{status}</badge>
          </div>
        ) : status === "ready" ? (
          <div className="m-0 d-flex align-items-center text-capitalize">
            <badge className="badge bg-success me-3">{status}</badge>
            <button className="btn btn-outline-dark btn-pill  text-uppercase">
              Download
            </button>
          </div>
        ) : null,
    },
  ];

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {}, []);

  return (
    <Dashboard_Layout title="Dashboard">
      <div className="padding_20">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">""</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <section className="padding_10">
        <div className="row">
          <div className="col-lg-4">
            <div className="border animated slideInDown p-4 text-center border_radius">
              <h4 className="m-0 text-primary font-xs text-uppercase">
                Your Apps
              </h4>
              <h1 className="m-0 font-weight-700">
                2 <label className="text-danger">1</label>
              </h1>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Outgoing Integrations
              </p>
              <h1 className="m-0 font-weight-700">
                13 <label className="text-muted">11</label>
              </h1>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Incoming Integrations
              </p>
              <h1 className="m-0 font-weight-700">
                11 <label className="text-primary">5</label>
              </h1>
            </div>
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-lg-3">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Outgoing Requests
              </p>
              <h1 className="m-0 font-weight-700">
                1500 <label className="text-primary">1320</label>
              </h1>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Incoming Requests
              </p>
              <h1 className="m-0 font-weight-700">
                1200 <label className="text-muted">1100</label>
              </h1>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Webhooks Sent{" "}
              </p>
              <h1 className="m-0 font-weight-700">
                650 <label className="text-danger">190</label>
              </h1>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="border animated slideInDown  p-4 text-center border_radius">
              <p className="m-0 text-primary font-xs text-uppercase">
                Webhooks Received
              </p>
              <h1 className="m-0 font-weight-700">
                270 <label className="text-primary">112</label>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
}
