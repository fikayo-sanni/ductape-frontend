import { Button, Checkbox, Input } from "antd";
import { SettingOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import {tagifyIgnoreCase} from "../../config/constant"; 
import SetValueProps from "./setValuePropsModal";

const { TextArea } = Input;
const Headers = (props) => {
  const { data, envs, type, presets, setExtFields } = props;
  const [edit, setEdit] = useState(false);
  const [defaultRequired, setDefaultRequired] = useState(false);
  const [valuePropsDialog, showValuePropsDialog] = useState(false);
  const [selectedIndex, selectIndex] = useState();
  const [defaultFields, setDefaultFields] = useState({
    key: "",
    value: "",
    sampleValue: "",
    origin: "",
    description: "",
    required: false,
    maxLength: 0,
    minLength: 0,
    decorator: "",
    decoratorPosition: "",
    type: "",
    defaultValue: "",
    defaultType: "",
  });
  const [inputFields, setInputFields] = useState([{ ...defaultFields }]);

  const handleKeyPress = (index, e) => {
    if (index === inputFields.length - 1) {
      //toast.error( index+" bossbaby "+(inputFields.length - 1));
      setInputFields([...inputFields, { ...defaultFields }]);
    }
  };
  const handleChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;

    if (!data[index]["defaultType"]) data[index]["defaultType"] = "input";
    // alert(JSON.stringify(data));
    setInputFields(data);
  };

  const handleChangeKey = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = tagifyIgnoreCase(e.target.value);

    if (!data[index]["defaultType"]) data[index]["defaultType"] = "input";
    // alert(JSON.stringify(data));
    setInputFields(data);
  };

  const handleModalChange = (index, values) => {
    let data = [...inputFields];
    data[index] = { ...data[index], ...values };
    //alert(JSON.stringify(data));
    setInputFields(data);
    showValuePropsDialog(false);
  };

  const handleChangeReq = (index, e) => {
    let data = [...inputFields];
    data[index]["required"] = !data[index]["required"];
    setInputFields(data);
  };

  const handleChangeReqAll = (index, e) => {
    let data = [...inputFields];
    data.map((d, index) => {
      data[index]["required"] = !defaultRequired;
    });
    //data[index]['required'] = !data[index]['required'];
    setDefaultRequired(!defaultRequired);
    setInputFields(data);
  };

  const closeValueProps = () => {
    showValuePropsDialog(false);
  };

  // const

  const updateHeaders = async () => {
    if (setExtFields) {
      setExtFields(inputFields.filter((data)=> data.key!==""));
      setEdit(false)
    } else {
      try {
        NProgress.start();
      } catch (e) {
        NProgress.done();
      }
    }
  };

  useEffect(() => {
    if (presets && presets.length) {
      setInputFields([...presets]);
    }
  }, []);

  const Rows = inputFields.map((data, index) => {
    return (
      <tr>
        <th scope="row">
          <Checkbox
            checked={data.required}
            onChange={(e) => handleChangeReq(index, e)}
            disabled={!edit}
          />
        </th>
        <td>
          <Input
            className="border-0 bg-background-alternate"
            name="key"
            value={data.key}
            onKeyPress={(e) => handleKeyPress(index, e)}
            onChange={(e) => handleChangeKey(index, e)}
            disabled={!edit}
          />
        </td>
        <td>
          <Input
            className="border-0 bg-background-alternate text-primary"
            name="value"
            value={`{{${data.defaultType}}} ${data.type}`}
            onKeyPress={(e) => handleKeyPress(index, e)}
            onChange={(e) => {
              showValuePropsDialog(true);
              selectIndex(index);
            }}
            disabled={!edit}
          />
        </td>
        <td>
          <TextArea
            className="border-0 bg-background-alternate"
            name="description"
            autoSize
            onKeyPress={(e) => handleKeyPress(index, e)}
            onChange={(e) => handleChange(index, e)}
            disabled={!edit}
          />
        </td>
        <td>
          <center>
            <Button
              shape="circle"
              disabled={!edit}
              onClick={() => {
                showValuePropsDialog(true);
                selectIndex(index);
              }}
            >
              <SettingOutlined />
            </Button>
          </center>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {valuePropsDialog ? (
        <SetValueProps
          closeValueProps={closeValueProps}
          envs={envs}
          index={selectedIndex}
          handleChange={handleModalChange}
          data={inputFields[selectedIndex]}
          hideEnvs={true}
        />
      ) : (
        <></>
      )}
      <div className="row p-2"></div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              <Checkbox
                checked={defaultRequired}
                onChange={(e) => handleChangeReqAll(e)}
                disabled={!edit}
              />
            </th>
            <th scope="col">Key</th>
            <th scope="col">Value</th>
            <th scope="col">Description</th>
            <th scope="col">
              <center>
                {!edit ? (
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => setEdit(true)}
                  >
                    <EditOutlined />
                  </Button>
                ) : (
                  <Button
                    shape="circle"
                    type="primary"
                    onClick={() => updateHeaders()}
                  >
                    <SaveOutlined />
                  </Button>
                )}
              </center>
            </th>
          </tr>
        </thead>
        <tbody>{Rows}</tbody>
      </table>
    </div>
  );
};

export default Headers;
