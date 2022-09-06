import React, { useContext, Component, useEffect, useState } from "react";
import {
  Tabs,
  Typography,
  Breadcrumb,
  Input,
  Button,
  Switch,
  Tag,
  Modal,
  Checkbox,
  Badge,
  Select,
} from "antd";
import Link from "next/link";
import Icon, {
  InfoCircleOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UpOutlined,
  DownOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { EditOutlined } from "@ant-design/icons";
import { fetchAction } from "../services/actions.service";
import { Loading } from "../config/constant";
import { useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { Option } = Select;

const { TextArea } = Input;

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const Actions = (props) => {
  const { action_id, app_id, user_data } = props;

  const [user, setUser] = useState(user_data);
  const [action, setAction] = useState({});
  const [error, setError] = useState("");
  const [defaultFields, setDefaultFields] = useState({
    env: "",
    key: "",
    value: "",
    sampleValue: "",
    origin: "",
    description: "",
    required: "false",
  });

  const [params, setParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [query, setQuery] = useState([]);
  const [body, setBody] = useState([]);
  const [response, setResponse] = useState([]);
  const [hideBodyCode, setHideBodyCode] = useState(false);

  const jsonToFields = (d) => {
    let data = d;
    if (Array.isArray(d) && d.length > 0) data = d[0];

    const fields = [];

    if (typeof data === "object" && data !== null) {
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        let type = typeof data[keys[i]];

        if (type === "object" && Array.isArray(d[keys[i]])) type = "array";
        fields.push({
          env: "",
          type,
          key: keys[i],
          value: "{{userInput}}",
          sampleValue: data[keys[i]],
          origin: "",
          description: "",
          required: false,
        });
      }
    } else {
      // alert(data);
      const type = typeof data;
      fields.push({
        env: "",
        type,
        key: `${type}-value`,
        value: "{{userInput}}",
        sampleValue: data,
        origin: "",
        description: "",
        required: false,
      });
    }

    // if(d.length>0)alert(JSON.stringify(keys))

    return fields;
  };

  const fetchActionInfo = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;
      const data = await fetchAction({ action_id, token, user_id, public_key });
      return data;
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error);
    }
  };

  const [code, setCode] = React.useState("");
  const [bodyCode, setBodyCode] = React.useState("");
  const [responseCode, setResponseCode] = React.useState("");
  const [inputSettingsModal, setInputSettingsModel] = useState(false);

  const openInputSettingsModal = (e, index, type) => {
    setInputSettingsModel(true);
  };

  const closeInputSettingsModal = () => {
    setInputSettingsModel(false);
  };

  useEffect(async () => {
    const action = await fetchActionInfo();
    if (action.data) {
      setAction(action.data.data);
      if (action.data.data.app_envs.length > 0) {
        action.data.data.app_envs.map((data, index) => {
          if (data.request_type) {
            // headers.push()
          }
        });
      }

      const headers = [];
      const params = [];
      const body = [];
      const query = [];
      const response = [];

      body.push(defaultFields);
      query.push(defaultFields);
      response.push(defaultFields);
      headers.push(defaultFields);
      params.push(defaultFields);

      setParams(headers);
      setBody(body);
      setResponse(response);
      setQuery(query);
      setHeaders(headers);
    }
  }, []);

  const handleKeyPress = (index, e, type) => {
    //alert(type)
    if (type === "headers") {
      if (index === headers.length - 1) {
        setHeaders([...headers, { ...defaultFields }]);
      }
    } else if (type === "params") {
      if (index === params.length - 1) {
        setParams([...params, { ...defaultFields }]);
      }
    } else if (type === "body") {
      if (index === body.length - 1) {
        setBody([...body, { ...defaultFields }]);
      }
    } else if (type === "query") {
      if (index === query.length - 1) {
        setQuery([...query, { ...defaultFields }]);
      }
    } else if (type === "response") {
      if (index === response.length - 1) {
        setResponse([...response, { ...defaultFields }]);
      }
    }
  };

  const changeBodyCode = (e) => {
    setBodyCode(e.target.value);

    const fields = jsonToFields(JSON.parse(e.target.value));
    // alert(JSON.parse(e.target.value))
    setBody([...fields]);
  };

  const changeResponseCode = (e) => {
    setResponseCode(e.target.value);

    const fields = jsonToFields(JSON.parse(e.target.value));
    // alert(JSON.parse(e.target.value))
    setResponse([...fields]);
  };

  let ActionConfigRows = <></>;
  if (Object.keys(action).length > 0) {
    ActionConfigRows = action.app_envs.map((data, index) => {
      if (data.active === true) {
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
      }
    });
  }

  const subQuery = (data, index, type) => {
    // alert(JSON.stringify(data));
    return data.map((d, i) => {
      //alert(JSON.stringify(d))
      return formsRender(i, type, d);
    });
  };

  const formsRender = (index, type, data) => {
    const valueCheck = data.sampleValue;

    // alert(JSON.stringify(valueCheck))

    return (
      <div>
        <div className="row m-1">
          <div className="col-4">
            <div className="form-floating">
              <input
                type="text"
                value={data.key}
                required
                className="form-control"
                placeholder="key"
                onKeyPress={(e) => {
                  handleKeyPress(index, e, type);
                }}
                name="key"
              />
              <label>Key</label>
            </div>
          </div>
          {typeof valueCheck !== "object" ? (
            <div className="col-4">
              <div className="form-floating input-group">
                <input
                  type="text"
                  value={data.value}
                  required
                  className="form-control"
                  onKeyPress={(e) => {
                    handleKeyPress(index, e, type);
                  }}
                  placeholder="Value"
                  name="value"
                />
                <label>Value</label>
                <div class="input-group-append form-floating">
                  <span
                    class="input-group-text form-control bg-white"
                    id="basic-addon2"
                    onClick={(e) => {
                      openInputSettingsModal(e, index, type);
                    }}
                  >
                    <SettingOutlined />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <label className="col-3 mt-3 text-primary text-capitalize">
              {data.type}
            </label>
          )}
          {typeof valueCheck !== "object" ? (
            <div className="col-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={data.description}
                    required
                    className="form-control"
                    placeholder="description"
                    onKeyPress={(e) => {
                      handleKeyPress(index, e, type);
                    }}
                    name="key"
                  />
                  <label>Description</label>
                </div>
            </div>
          ) : null}
        </div>
        {typeof valueCheck === "object" ? (
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11 border-start">
              {subQuery(jsonToFields(valueCheck), index, type)}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const Headers = headers.map((data, index) => {
    // alert(JSON.stringify(data))
    return formsRender(index, "headers", data);
  });

  const Params = params.map((data, index) => {
    return formsRender(index, "params", data);
  });

  const Query = query.map((data, index) => {
    return formsRender(index, "query", data);
  });

  const Body = body.map((data, index) => {
    return formsRender(index, "body", data);
  });

  const Response = response.map((data, index) => {
    return formsRender(index, "response", data);
  });

  return (
    <div>
      <Modal
        title="Input Settings"
        visible={inputSettingsModal}
        onCancel={closeInputSettingsModal}
        width={800}
        footer={[
          <Button key="submit" onClick={closeInputSettingsModal}>
            Cancel
          </Button>,

          <Button key="submit" type="primary">
            SAVE
          </Button>,
        ]}
      >
        <h5>Data Source</h5>
        <h5>- Hard Coded</h5>
        <h5>- User Input</h5>
        <h5>- Action Response</h5>
        <h5>Data Decorators</h5>
        <h5>- Data Prepend</h5>
        <h5>- Data Validators</h5>
        <h5>Data Formatters</h5>
      </Modal>
      <Breadcrumb>
        <Breadcrumb.Item>
          {action.app ? action.app.app_name : "App"}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{action.tag ? action.tag : "Action"}</Breadcrumb.Item>
      </Breadcrumb>
      <section className="padding_10 row">
        <div className="row">
          {Object.keys(action).length === 0 && !error ? <Loading /> : <></>}
          {Object.keys(action).length > 0 ? (
            <span>
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
                      <div className="table">{Headers}</div>
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">Params </span>
                  }
                  key="2"
                >
                  <section
                    className=""
                    style={{ height: "83vh", overflowY: "auto" }}
                  >
                    <div className="padding_10">
                      <div>{Params}</div>
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
                      <div className="row">
                        {CodeEditor?<div className="col-1">
                          <Button
                            onClick={() => {
                              setHideBodyCode(!hideBodyCode);
                            }}
                          >
                            {hideBodyCode ? <DownOutlined /> : <UpOutlined />}
                          </Button>
                        </div>:null}
                      </div>
                      {!hideBodyCode ? (
                        <CodeEditor
                          value={bodyCode}
                          language="json"
                          placeholder="Paste a JSON sample"
                          onChange={changeBodyCode}
                          padding={15}
                          style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily:
                              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                          }}
                        />
                      ) : null}
                      <div className="table">{Body}</div>
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
                        value={responseCode}
                        language="json"
                        placeholder="Paste a JSON sample"
                        onChange={changeResponseCode}
                        padding={15}
                        style={{
                          fontSize: 12,
                          backgroundColor: "#f5f5f5",
                          fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                      />
                      <div className="table">{Response}</div>
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">Pricing </span>
                  }
                  key="5"
                ></TabPane>
              </Tabs>
            </span>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default Actions;

/** export const getServerSideProps = async ({ params }) => {
  const { action_id, id: app_id } = params;
  return {
    props: { action_id, app_id },
  };
}; */
