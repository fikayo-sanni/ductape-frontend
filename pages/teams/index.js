import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import { Tabs, Typography, Breadcrumb, Input, Table } from "antd";
import Link from "next/link";

import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { TextArea } = Input;

const Index = (props) => {
  const config = useSelector((state) => state.app);

  useEffect(async () => {}, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Teams</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </section>
      <div className="row">
        <div className="col-8">
        <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </Dashboard_Layout>
  );
};

export default Index;
/*
export const getServerSideProps = async ({ params }) => {
  const {action_id} = params;
  return {
    props: { action_id },
  };
};*/
