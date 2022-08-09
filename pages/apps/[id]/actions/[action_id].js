import Dashboard_Layout from "../../../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  Tabs,
  Typography,
  Breadcrumb,
  Input,
  Button,
  Switch,
  Tag,
  Badge,
  Select,
} from "antd";
import Link from "next/link";

import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

import { configStore } from "../../../../data/configStore";
import { observer } from "mobx-react-lite";
import { EditOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { Option } = Select;

const { TextArea } = Input;

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const Index = observer((props) => {
  const config = useContext(configStore);

  const [code, setCode] = React.useState("");

  useEffect(async () => {}, []);

  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/apps">Apps</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{"App"}</Breadcrumb.Item>
            <Breadcrumb.Item>{"Action"}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div>
          <h4 className="padding_10">Config</h4>
          <table className="table padding_10">
            <tbody>
              <tr>
                <td>
                  <Switch></Switch>
                </td>
                <td className="font-weight-500">Production</td>
                <td>
                  <a>https://api.xcelapp.com</a>
                </td>
                <td>
                  <a>/v1/accounts/issuer</a>
                </td>
                <td>
                  <Tag color="geekblue">POST</Tag>
                </td>
                <td>application/json</td>
                <td>
                  <Button>
                    Edit <EditOutlined />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <Switch></Switch>
                </td>
                <td className="font-weight-500">Sandbox</td>
                <td>
                  <a>https://sandbox-api.xcelapp.com</a>
                </td>
                <td>
                  <a>/v1/accounts/issuer</a>
                </td>
                <td>
                  <Tag color="geekblue">POST</Tag>
                </td>
                <td>application/json</td>
                <td>
                  <Button>
                    Edit <EditOutlined />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Tabs
          defaultActiveKey="1"
          className="page_tabs animated slideInUp"
          tabBarStyle={{ paddingLeft: 44 }}
        >
          <TabPane
            tab={<span className="align-items-center d-flex">Headers </span>}
            key="1"
          >
            <section className="" style={{ height: "83vh", overflowY: "auto" }}>
              <div className="padding_10 border-bottom">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><input type="text" value="Content-Type" required className="form-control" placeholder="key" name="key"/></td>
                      <td>
                        <Select
                          style={{
                            width: 180,
                          }}
                          defaultValue="defaulted"
                        >
                          <Option value="defaulted">Defaulted</Option>
                          <Option value="jack">Action Response</Option>
                          <Option value="lucy">Action Body</Option>
                        </Select>
                      </td>
                      <td>
                        <Select
                          style={{
                            width: 180,
                          }}
                          defaultValue="none"
                        >
                          <Option value="none">None</Option>
                          <Option value="lucy">Bearer</Option>
                          <Option value="lucy">Basic</Option>
                          <Option value="lucy">API-Key</Option>
                          <Option value="lucy">Custom</Option>
                        </Select>
                      </td>
                      <td><input type="text" value="application/json" required className="form-control" placeholder="Value" name="value"/></td>
                      <td><input type="text" value="" required className="form-control" placeholder="Description" name="description"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </TabPane>
          <TabPane
            tab={<span className="align-items-center d-flex">Params </span>}
            key="2"
          >
            <section className="" style={{ height: "83vh", overflowY: "auto" }}>
              <div className="padding_10 border-bottom">
              <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><input type="text" value="" required className="form-control" placeholder="key" name="key"/></td>
                      <td>
                        <Select
                          style={{
                            width: 180,
                          }}
                          defaultValue="defaulted"
                        >
                          <Option value="defaulted">Defaulted</Option>
                          <Option value="jack">Action Response</Option>
                          <Option value="lucy">Action Body</Option>
                        </Select>
                      </td>
                      <td><input type="text" value="" required className="form-control" placeholder="Value" name="value"/></td>
                      <td><input type="text" value="" required className="form-control" placeholder="Description" name="description"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </TabPane>
          <TabPane
            tab={<span className="align-items-center d-flex">Body </span>}
            key="3"
          >
            <section className="" style={{ height: "83vh", overflowY: "auto" }}>
              <div className="padding_10 border-bottom">
                <CodeEditor
                  value={code}
                  language="xml"
                  placeholder="Paste a JSON sample"
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
                <br/>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><input type="text" value="" required className="form-control" placeholder="key" name="key"/></td>
                      <td>
                        <Select
                          style={{
                            width: 180,
                          }}
                          defaultValue="defaulted"
                        >
                          <Option value="defaulted">Defaulted</Option>
                          <Option value="jack">Action Response</Option>
                          <Option value="lucy">Action Body</Option>
                        </Select>
                      </td>
                      <td><input type="text" value="" required className="form-control" placeholder="Value" name="value"/></td>
                      <td><input type="text" value="" required className="form-control" placeholder="Description" name="description"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </TabPane>
          <TabPane
            tab={<span className="align-items-center d-flex">Response </span>}
            key="4"
          >
            <section className="" style={{ height: "83vh", overflowY: "auto" }}>
              <div className="padding_10 border-bottom">
                <CodeEditor
                  value={code}
                  language="xml"
                  placeholder="Paste a JSON sample"
                  onChange={(evn) => setCode(evn.target.value)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
                <br />

                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td><input type="text" value="" required className="form-control" placeholder="key" name="key"/></td>
                      <td>
                        <Select
                          style={{
                            width: 200,
                          }}
                          defaultValue="defaulted"
                        >
                          <Option value="defaulted">Defaulted</Option>
                          <Option value="jack">Action Response</Option>
                          <Option value="lucy">Action Body</Option>
                        </Select>
                      </td>
                      <td><input type="text" value="" required className="form-control" placeholder="Value" name="value"/></td>
                      <td><input type="text" value="" required className="form-control" placeholder="Description" name="description"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </TabPane>
        </Tabs>
      </section>
    </Dashboard_Layout>
  );
});

export default Index;

export const getServerSideProps = async ({ params }) => {
  const { action_id } = params;
  return {
    props: { action_id },
  };
};
