import { Breadcrumb } from "antd";
import MdEditor from "react-markdown-editor-lite";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Loading } from "../../config/constant"
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Overview = (props) => {

  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
  };

  const [loading, setLoading] = useState(true);

  useEffect(async()=>{
    setTimeout(()=>{
        setLoading(false);
    },2000)

  },[])

  return (
    <span>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Overview</Breadcrumb.Item>
          <Breadcrumb.Item> </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <span>
        <br />
        {loading?<center><Loading/></center>: 
        <span className="h-100">
          <MdEditor
            style={{ height: "700px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </span>}
      </span>
    </span>
  );
};

export default Overview;
