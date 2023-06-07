import Dashboard_Layout from "./layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  Button,
  Upload,
  message,
  Carousel,
  Card,
  Tabs,
  Typography,
  Spin,
  Avatar,
  Badge,
  Table,
  Input,
  Space,
  Result,
} from "antd";
import { toast } from "react-hot-toast";
import { InboxOutlined } from "@ant-design/icons";
import * as ls from "local-storage";

const https = require("https");
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Dragger } = Upload;

export default function FileUpload(props) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    onChange: onChange,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    beforeUpload: (file) => {
      console.log(file);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);

      return setFileList(newFileList);
      //console.log(fileList);
    },
  };

  const uploadFiles = async () => {
    let urls = [];

    if (fileList.length >= 1) {
      toast("Uplaoding ");

      for (const image in fileList) {
        let file = fileList[image];

        const fdata = new FormData();
        fdata.append("file", file.originFileObj);
        // fdata.append('upload_preset', 'kpfavf70')
        // fdata.append("cloud_name", "kpfavf70")

        await fetch("https://sandbox-api.etranzactglobal.com/upload", {
          method: "POST",
          body: fdata,
        })
          .then((res) => res.json())
          .then((data) => {
            //  console.log(data)
            toast.success("Successfully uploaded image " + image);
            toast.loading("Redirecting. Please wait");

            setTimeout(() => {
              window.location = "?file=" + data.data.url;
            }, 5000);
          })
          .catch((err) => {
            alert("An error occured while uploading");
          });

        //urls.push(url);
      }
    } else {
      toast.error("Select a file");
    }

    ls.set("files", urls);
  };

  useEffect(() => {
    //console.log(props)
  }, []);

  /**<button onClick={() => uploadFiles()} className="btn mt-4 btn-primary">
  Upload Files
</button>*/

  return (
    <section>
      {/*<h6 className="font-sm ">Add new photos <span className="text-danger">*</span></h6>*/}

      <div className="bg-primary-transparent mb-3 p-4">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: 24 }} />
          </p>
          <p className="ant-upload-text">Upload Image</p>
          <p className="ant-upload-hint">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </div>
    </section>
  );
}
