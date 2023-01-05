import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import { Tabs, Typography, Breadcrumb, Input, Card, List, Menu, Avatar } from "antd";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const { TextArea } = Input;

const Index = (props) => {
  // const config = useSelector((state) => state.app);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
    {
      title: "Title 11",
    },
    {
      title: "Title 12",
    },
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
    {
      title: "Title 11",
    },
    {
      title: "Title 12",
    },
  ];

  useEffect(async () => {}, []);

  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Marketplace</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </section>
      <div className="row h-100">
        <div className="col-2 h-100">
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="light"
            inlineCollapsed={false}
            className="border-none"
          >
            <Menu.Item key="1">
              <span>All</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>Trending</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>Latest</span>
            </Menu.Item>
            <Menu.SubMenu
              key="sub1"
              title={
                <span>
                  <span>Payments</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub14"
              title={
                <span>
                  <span>Business</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title={
                <span>
                  <span>Logistics</span>
                </span>
              }
            >
              <Menu.Item key="9">Last Mile Delivery</Menu.Item>
              <Menu.Item key="10">International Delivery</Menu.Item>
              <Menu.SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub3"
              title={
                <span>
                  <span>Events</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub4"
              title={
                <span>
                  <span>Education</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub5"
              title={
                <span>
                  <span>Advertising</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub6"
              title={
                <span>
                  <span>Media</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub7"
              title={
                <span>
                  <span>eCommerce</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub8"
              title={
                <span>
                  <span>Messaging</span>
                </span>
              }
            >
              <Menu.Item key="5">Emails</Menu.Item>
              <Menu.Item key="6">SMS</Menu.Item>
              <Menu.Item key="7">Push Notifications</Menu.Item>
              <Menu.Item key="8">Whatsapp</Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="sub9"
              title={
                <span>
                  <span>Finance</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub10"
              title={
                <span>
                  <span>Advertising</span>
                </span>
              }
            >
              <Menu.Item key="5">Wallets</Menu.Item>
              <Menu.Item key="6">Payments</Menu.Item>
              <Menu.Item key="7">International Settlements</Menu.Item>
              <Menu.Item key="8">Billers</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="col-10">
          <div className="p-2">
          <Search
            placeholder="Keyword Search"
            style={{
              width: "100%",
            }}
          />
          </div>
          <List
            grid={{
              gutter: 20,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item className="p-2">
                <Card className="hover-blue" title={<span><Avatar
                  className="bg-gray text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  S
                </Avatar> {item.title}</span>}>Discover the prefontal cortex of programming</Card>
              </List.Item>
            )}
          />
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
