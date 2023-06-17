import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../layout/dashboard_layout';
import PageHeader from '../common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Typography, Input, List, Modal, Tag,Form } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {updateAppSetup} from '../services/apps.service';
import {CreateAuthModal} from './Authorization_Modals/createAuth';
import Router from 'next/router';

interface Props {
  data: {
    _id: string,
    user_id: string,
    app_id: string,
    name: string,
    setup_type: string,
    expiry: any,
    period: string,
    resource: string,
    method: string,
    description: string,
    __v: any
  }[];
}

const SetupsView: React.FC<Props> = ({ data }) => {
  const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
  const [selectedSetup, setSelectedSetup] = useState("");
  const [createAuth, setCreateAuth] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({}); 

  useEffect(() => {
    // Your code here
  }, []);

  const handleClick = (itemId: string) => {
    Router.push(`/apps/${app._id}/setups/${itemId}`);
  };
  const updateSetup= async (data) => {
    console.log(data);
    try{
      const response = await updateAppSetup({
        ...data,
        public_key: user.public_key,
        user_id: user._id,
        token: user.auth_token,
          setup_id: selectedSetup
      });
      console.log(response.data.data);
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      console.log(error || e.toString());
      throw e;
    }
  };
  const handleSave = () => {
        updateSetup(input)
      setVisible(false);
  }

  const handleTextAreaChange = async (e) => {
    let value = e.target.value;
    await setInput({ ...input, [e.target.name]: value });
    console.log(input);
    
  }
  return (
    <>
      {data.length ? (
        <table className="table">
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} onClick={() => handleClick(item._id)}>
                  <td>
                    <label className="text-muted">
                      <h5>{item.name}</h5>
                    </label>
                  </td>
                  <td>
                    {" "}
                    <label className="btn btn-light text-muted">
                      {item.setup_type}
                    </label>
                  </td>
                  <td>
                    <Tag color="blue">
                      {`${item.expiry || 'forever'} ${
                        item.period ? item.period.toUpperCase() : ''
                      }`}
                    </Tag>
                  </td>
                  <td>{item._id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="col-lg-9">
            <h4>You Dont have any Authorizations Create One to get started</h4>
            <Button type="primary" key="console" onClick={() => {setCreateAuth(!createAuth)}}>
                + New Authorization
            </Button>
        </div>
      )}
      {createAuth ?<CreateAuthModal showModal={setCreateAuth}/>:<></>}
    </>
  );
};

export default SetupsView;