import { Checkbox, Divider, Input, Modal, Switch } from "antd";
import { useState } from "react";
import { capitalize } from "../../config/constant";

const SetValueProps = (props) => {
  const { closeValueProps, handleChange, index, data, envs } = props;
  const [envsList, setEnvList] = useState([]);
  const [value, setValue] = useState({ ...data });

  const handleChangeAction = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const Envs = envs.map((data, index) => {
    return (
      <span className="m-3">
        <Switch
          onChange={(e) => {
            if (e) {
              envsList.push(data._id);
            } else {
              const index = envsList.indexOf(data._id);
              if (index > -1) envsList.splice(index, 1);
            }

            setEnvList(envsList);
            setValue({ ...value, envs: [...envsList] });
          }}
        />{" "}
        {capitalize(data.env_name)}
        <br />
      </span>
    );
  });

  return (
    <Modal
      title="Set Value Props"
      visible={true}
      onCancel={() => closeValueProps()}
      onOk={()=>{handleChange(index, value) }}
    >
      <div className="col-12 mb-4">
        <div className="row">
          <div className="col-4">
            <div className="form-floating">
              <select
                className="form-control"
                onChange={handleChangeAction}
                value={value.defaultType}
                name="defaultType"
              >
                <option disabled selected value=""></option>
                <option value="set">Defaulted</option>
                <option value="lookup">Cached Values</option>
                <option value="input">User Input</option>
              </select>
              <label>Data Source</label>
            </div>
          </div>
          <div className="col-8">
            <div className="form-floating">
              <input
                type="text"
                value={value.defaultValue}
                onChange={handleChangeAction}
                required
                className="form-control"
                placeholder="Default Value"
                name="defaultValue"
              />
              <label>Default Value</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={value.sampleValue}
              onChange={handleChangeAction}
              required
              className="form-control"
              placeholder="Sample Value"
              name="sampleValue"
            />
            <label>Sample Value</label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-floating">
            <select
              className="form-control"
              onChange={handleChangeAction}
              value={value.type}
              name="type"
            >
              <option disabled selected value=""></option>
              <option value="string">STRING</option>
              <option value="integer">INTEGER</option>
              <option value="float">FLOAT</option>
              <option value="double">DOUBLE</option>
              <option value="uuid">UUID</option>
              <option value="array">ARRAY</option>
              <option value="object">OBJECT</option>
            </select>
            <label>Data Type</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-7 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={""}
              onChange={handleChangeAction}
              required
              className="form-control"
              placeholder="action"
              name="decorator"
            />
            <label>Decorator</label>
          </div>
        </div>
        <div className="col-5 mb-4">
          <div className="form-floating">
            <select
              className="form-control"
              onChange={handleChangeAction}
              value={value.decoratorPosition}
              name="decoratorPosition"
            >
              <option disabled selected value=""></option>
              <option value="append">APPEND</option>
              <option value="prepend">PREPEND</option>
            </select>
            <label>Decorator Postion</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-4">
          <div className="form-floating">
            <input
              type="number"
              value={value.minLength}
              onChange={handleChangeAction}
              required
              className="form-control"
              placeholder="Minimum Length"
              name="minLength"
            />
            <label>Minimum Length</label>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="form-floating">
            <input
              type="number"
              value={value.maxLength}
              onChange={handleChangeAction}
              required
              className="form-control"
              placeholder="Maximum Length"
              name="maxLength"
            />
            <label>Maximum Length</label>
          </div>
        </div>
      </div>
      <div className="col-12">{Envs}</div>
    </Modal>
  );
};

export default SetValueProps;
