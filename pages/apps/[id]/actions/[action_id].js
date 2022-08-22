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
import { fetchAction } from "../../../../components/services/actions.service";
import { Loading } from "../../../../components/config/constant";

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

  const [user, setUser] = useState(config.user);
  const [action, setAction] = useState({});
  const [error, setError] = useState("");

  const { action_id, app_id } = props;

  const fetchActionInfo = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = config.user;
      const data = await fetchAction({ action_id, token, user_id, public_key });
      return data;
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error);
    }
  };

  const [code, setCode] = React.useState("");

  useEffect(async () => {
    const action = await fetchActionInfo();
    setAction(action.data.data);
  }, []);

  /**
   * <Select
                              style={{
                                width: 200,
                              }}
                              defaultValue="none"
                            >
                              <Option value="none">None</Option>
                              <Option value="lucy">Bearer</Option>
                              <Option value="lucy">Basic</Option>
                              <Option value="lucy">API-Key</Option>
                              <Option value="lucy">Custom</Option>
                            </Select>
   */

  let ActionConfigRows = <></>;
  if (Object.keys(action).length > 0) {
    ActionConfigRows = action.app_envs.map((data, index) => {
      return (
        <tr>
          <td>
            <Switch></Switch>
          </td>
          <td className="font-weight-500">{data.env_name}</td>
          <td>
            <a>
              {data.env_config.base_url || data.base_url || (
                <label className="text-danger">Undefined</label>
              )}
            </a>
          </td>
          <td>
            <a>{data.env_config.resource || action.resource}</a>
          </td>
          <td>
            <Tag color="geekblue">
              {data.env_config.httpVerb || action.httpVerb}
            </Tag>
          </td>
          <td>
            <Button>
              Edit <EditOutlined />
            </Button>
          </td>
        </tr>
      );
    });
  }
  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/apps">Apps</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                href={{ pathname: "/apps/[app_id]" }}
                as={`/apps/${app_id}`}
              >
                {action.app ? action.app.app_name : "App"}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{action.tag ? action.tag : "Action"}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {Object.keys(action).length === 0 && !error ? <Loading /> : <></>}

        {Object.keys(action).length > 0 ? (
          <span>
            <div>
              <h4 className="padding_10">Config</h4>
              <table className="table padding_10">
                <tbody>{ActionConfigRows}</tbody>
              </table>
            </div>

            <Tabs
              defaultActiveKey="1"
              className="page_tabs animated slideInUp"
              tabBarStyle={{ paddingLeft: 44 }}
            >
              <TabPane
                tab={
                  <span className="align-items-center d-flex">Headers </span>
                }
                key="1"
              >
                <section
                  className=""
                  style={{ height: "83vh", overflowY: "auto" }}
                >
                  <div className="padding_10">
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
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="Content-Type"
                                required
                                className="form-control"
                                placeholder="key"
                                name="key"
                              />
                              <label>Key</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <select
                                className="form-control"
                                defaultValue="defaulted"
                              >
                                <option value="defaulted">Defaulted</option>
                                <option value="jack">Action Response</option>
                                <option value="lucy">Action Body</option>
                              </select>
                              <label>Origin</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="application/json"
                                required
                                className="form-control"
                                placeholder="Value"
                                name="value"
                              />
                              <label>Value</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value=""
                                required
                                className="form-control"
                                placeholder="Description"
                                name="description"
                              />
                              <label>Description</label>
                            </div>
                          </td>
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
                <section
                  className=""
                  style={{ height: "83vh", overflowY: "auto" }}
                >
                  <div className="padding_10">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="Content-Type"
                                required
                                className="form-control"
                                placeholder="key"
                                name="key"
                              />
                              <label>Key</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <select
                                className="form-control"
                                defaultValue="defaulted"
                              >
                                <option value="defaulted">Defaulted</option>
                                <option value="jack">Action Response</option>
                                <option value="lucy">Action Body</option>
                              </select>
                              <label>Origin</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="application/json"
                                required
                                className="form-control"
                                placeholder="Value"
                                name="value"
                              />
                              <label>Value</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value=""
                                required
                                className="form-control"
                                placeholder="Description"
                                name="description"
                              />
                              <label>Description</label>
                            </div>
                          </td>
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
                <section
                  className=""
                  style={{ height: "83vh", overflowY: "auto" }}
                >
                  <div className="padding_10">
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
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="Content-Type"
                                required
                                className="form-control"
                                placeholder="key"
                                name="key"
                              />
                              <label>Key</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <select
                                className="form-control"
                                defaultValue="defaulted"
                              >
                                <option value="defaulted">Defaulted</option>
                                <option value="jack">Action Response</option>
                                <option value="lucy">Action Body</option>
                              </select>
                              <label>Origin</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="application/json"
                                required
                                className="form-control"
                                placeholder="Value"
                                name="value"
                              />
                              <label>Value</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value=""
                                required
                                className="form-control"
                                placeholder="Description"
                                name="description"
                              />
                              <label>Description</label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </TabPane>
              <TabPane
                tab={
                  <span className="align-items-center d-flex">Response </span>
                }
                key="4"
              >
                <section
                  className=""
                  style={{ height: "83vh", overflowY: "auto" }}
                >
                  <div className="padding_10">
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
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="Content-Type"
                                required
                                className="form-control"
                                placeholder="key"
                                name="key"
                              />
                              <label>Key</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <select
                                className="form-control"
                                defaultValue="defaulted"
                              >
                                <option value="defaulted">Defaulted</option>
                                <option value="jack">Action Response</option>
                                <option value="lucy">Action Body</option>
                              </select>
                              <label>Origin</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value="application/json"
                                required
                                className="form-control"
                                placeholder="Value"
                                name="value"
                              />
                              <label>Value</label>
                            </div>
                          </td>
                          <td>
                            <div className="form-floating">
                              <input
                                type="text"
                                value=""
                                required
                                className="form-control"
                                placeholder="Description"
                                name="description"
                              />
                              <label>Description</label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </TabPane>
              <TabPane
                tab={
                  <span className="align-items-center d-flex">Pricing </span>
                }
                key="5"
              >

              </TabPane>
            </Tabs>
          </span>
        ) : (
          <></>
        )}
      </section>
    </Dashboard_Layout>
  );
});

export default Index;

export const getServerSideProps = async ({ params }) => {
  const { action_id, id: app_id } = params;
  return {
    props: { action_id, app_id },
  };
};
