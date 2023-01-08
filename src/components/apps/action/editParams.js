import { Checkbox, Input, Button } from "antd";
import { SettingOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import EmptyList from "../emptyList";

const { TextArea } = Input;
const Params = (props) => {
  const { data } = props;
  const [edit, setEdit] = useState(false);
  const [defaultFields, setDefaultFields] = useState({
    env: "",
    key: "",
    value: "",
    sampleValue: "",
    origin: "",
    description: "",
    required: "false",
  });

  const [inputFields, setInputFields] = useState([{ ...defaultFields }]);

  const handleKeyPress = (index, e, type) => {
    if (index === inputFields.length - 1) {
      //toast.error( index+" bossbaby "+(inputFields.length - 1));
      setInputFields([...inputFields, { ...defaultFields }]);
    }
  };

  useEffect(() => {
    if (data) {
    }
  }, []);

  const Rows = inputFields.map((data, index, type) => {
    return (
      <tr>
        <th scope="row">
          <Checkbox />
        </th>
        <td>
          <TextArea
            className="border-0"
            autoSize
            onKeyPress={(e) => handleKeyPress(index, e, type)}
          />
        </td>
        <td>
          <TextArea
            className="border-0"
            autoSize
            onKeyPress={(e) => handleKeyPress(index, e, type)}
          />
        </td>
        <td>
          <TextArea
            className="border-0"
            autoSize
            onKeyPress={(e) => handleKeyPress(index, e, type)}
          />
        </td>
        <td>
          <center>
            <Button shape="circle">
              <SettingOutlined />
            </Button>
          </center>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="row p-2">
        <div className="col-11"></div>
        <div className="col-1"></div>
      </div>

      <div>
        <h6>PARAMS</h6>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">KEY</th>
              <th scope="col">VALUE</th>
              <th scope="col">DESCRIPTION</th>
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
                      onClick={() => setEdit(false)}
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
        <br />
        <h6>QUERY</h6>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">KEY</th>
              <th scope="col">VALUE</th>
              <th scope="col">DESCRIPTION</th>
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
                      onClick={() => setEdit(false)}
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
    </div>
  );
};

export default Params;
