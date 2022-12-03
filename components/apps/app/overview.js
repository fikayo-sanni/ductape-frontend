import { Breadcrumb, Button } from "antd";
import MdEditor from "react-markdown-editor-lite";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import {
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { changeSelectedApp } from "../../../data/applicationSlice";
import { useEffect, useState } from "react";
import { Loading } from "../../config/constant";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { updateApp } from "../../services/apps.service";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NProgress from "nprogress";

const Overview = (props) => {
  const { app_id, defaultHTML, defaultText } = props;
  const [editor, showEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [html, setHTML] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const config = useSelector((state) => state.app);
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    setHTML(html);
    setText(text);
  };

  useEffect(async () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setHTML(defaultHTML);
      setText(defaultText);

      //alert(defaultHTML)
  }, [defaultHTML, defaultText]);

  const handleEditSave = async () => {
    if (!editor) {
      showEditor(true);
    } else {
      showEditor(false);

      try {
        const { auth_token: token, _id: user_id, public_key } = config.user;
        NProgress.start()
        const data = await updateApp({
          aboutText: text,
          aboutHTML: html,
          token,
          user_id,
          public_key,
          app_id
        });

        dispatch(changeSelectedApp(data));
        NProgress.done();
        toast.success("App Updated")
      } catch (e) {
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    }
  };

  return (
    <span>
      <div className="row">
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="padding_10">
        <h2 className="pt-3">
          Overview{" "}
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              handleEditSave();
            }}
          >
            {!editor ? <EditOutlined /> : <SaveOutlined />}
          </Button>
        </h2>
        <br />

        {editor ? (
          <span>
            {loading ? (
              <center>
                <Loading />
              </center>
            ) : (
              <span className="h-100">
                <MdEditor
                  style={{ height: "700px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                  value={text}
                />
              </span>
            )}
          </span>
        ) : (
          <div>{ReactHtmlParser(html)}</div>
        )}
      </div>
    </span>
  );
};

export default Overview;
