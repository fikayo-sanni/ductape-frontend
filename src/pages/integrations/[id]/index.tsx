import Dashboard_Layout from "../../../components/layout/dashboard_layout";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Menu, List, Card, Avatar, Switch, Button } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
// import {
//   Loading,
//   capitalize,
//   fetchInitials,
// } from "../../../components/config/constant";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import Integration_Layout from "../../../components/layout/integration_layout";

const Index = (props) => {
  const {integration_id} = props;

  useEffect(() => {}, []);

  return ( 
    <Integration_Layout integration_id={integration_id}> </Integration_Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  const {id} = params;
  return {
    props: { integration_id: id },
  };
};
