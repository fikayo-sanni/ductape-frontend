import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  Tabs,
  Typography,
  Breadcrumb,
  Input,
} from "antd";
import Link from "next/link";

import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";


const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { TextArea } = Input;

const Index = observer((props) => {
  const config = useContext(configStore);

  useEffect(async () => {

  }, []);

  return (
    <Dashboard_Layout title={"App"}>
        <section className="padding_10 row">
            <div className="padding_20">
            <Breadcrumb>
                <Breadcrumb.Item>
                    Marketplace
                </Breadcrumb.Item>
                <Breadcrumb.Item>{" "}</Breadcrumb.Item>
            </Breadcrumb>
            </div>
        </section>
    </Dashboard_Layout>
  );
});

export default Index;
/*
export const getServerSideProps = async ({ params }) => {
  const {action_id} = params;
  return {
    props: { action_id },
  };
};*/
