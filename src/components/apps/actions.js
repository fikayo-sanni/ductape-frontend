import React, { useEffect, useState } from "react";
import {
  Tabs,
  Typography,
  Breadcrumb,
  Input,
  Button,
  Switch,
  Tag,
  Modal,
  List,
  Select,
  Checkbox,
} from "antd";

import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { EditOutlined } from "@ant-design/icons";
import { fetchAction } from "../services/actions.service";
import { Loading, extractParams } from "../config/constant";
import EditActionModal from "./action/editActionModal";
import EmptyList from "./emptyList";
import Headers from "./action/editHeaders";
import Params from "./action/editParams";
import Body from "./action/editBody";
import EditResponse from "./action/editResponse";
import EditPricing from "./action/editPricing";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const { TabPane } = Tabs;

/**const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const extractText = (strToParse, strStart, strFinish) => {
  return strToParse.match(strStart + "(.*?)" + strFinish)[1];
};*/

const Actions = (props) => {
  const { action_id, envs, setSelected } = props;

  const config = useSelector((state) => state.app);

  const [user, setUser] = useState(config.user);
  const [params, setParams] = useState([]);
  const [action, setAction] = useState({});
  const [error, setError] = useState("");
  const [dialog, showDialog] = useState(false);

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

  const fetchParams = (str) => {
    setParams(extractParams(str));
  };

  useEffect(async () => {
    try {
      const action = await fetchActionInfo();
      if (action && action.data) {
        const { type } = action.data.data;
        // alert(JSON.stringify(type))
        let selected;
        if (type === "SETUP") selected = "3";
        else selected = "5";
        setSelected(selected);
        //alert("SELECTED: "+selected);
        setAction(action.data.data);
        if (action.data.data.app_envs.length > 0) {
          action.data.data.app_envs.map((data, index) => {
            if (data.request_type) {
              // headers.push()
            }
          });
        }

        fetchParams(action.data.data.resource);
      }
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  }, []);

  const EnvRows = envs.map((data, index) => {
    if (data.active) {
      return (
        <tr>
          <td>{data.env_name}</td>
          <td>
            <a>{`${data.base_url}${action.resource}`}</a>
          </td>
          <td>
            <Switch />
          </td>
        </tr>
      );
    }
  });

  return (
    <div>
      {dialog ? <EditActionModal showDialog={showDialog} /> : <></>}
      <Breadcrumb>
        <Breadcrumb.Item> </Breadcrumb.Item>
        <Breadcrumb.Item className="text-muted">{"Action"}</Breadcrumb.Item>
        <Breadcrumb.Item className="text-muted">
          {action.name ? action.name : "Action"}
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className="padding_10 row border-start">
        <div className="row">
          {Object.keys(action).length === 0 && !error ? <Loading /> : <></>}
          {Object.keys(action).length > 0 ? (
            <span>
              <br />
              <h3>
                {action.name}{" "}
                <Tag color="blue" className="mt-0">
                  {action.tag}
                </Tag>{" "}
                <Tag color="red" className="mt-0">
                  {action.httpVerb}
                </Tag>
              </h3>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Env</th>
                    <th>URL</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>{EnvRows}</tbody>
              </table>
              <Tabs
                defaultActiveKey="1"
                className="page_tabs animated slideInUp"
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
                      <Headers
                        envs={envs}
                        type="header"
                        action_id={action_id}
                      />
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
                    {params.length ? (
                      <div className="padding_10">
                        <h5>Params</h5>
                        <Headers
                          envs={envs}
                          type="params"
                          presets={params}
                          action_id={action_id}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="padding_10">
                      <h5>Query</h5>
                      <Headers envs={envs} type="query" action_id={action_id} />
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
                      <Body envs={envs} action_id={action_id} type="body" />
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
                      <EditResponse
                        envs={envs}
                        action_id={action_id}
                        type="response"
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">Pricing </span>
                  }
                  key="5"
                >
                  <div className="padding_10">
                    <EditPricing />
                  </div>
                </TabPane>
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
