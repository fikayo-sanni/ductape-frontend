import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Modal, Popconfirm, RadioChangeEvent } from 'antd';
import { Input, Radio, Space, Upload } from 'antd';
import { InboxOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface Props {
    title: string;
}
export const ImportActions: React.FC<Props> = ({ title }) => {
    const dispatch = useDispatch();
    const { user, app } = useSelector((state: RootState) => state.app);

    const [fileList, setFileList] = useState([]);

    const [value, setValue] = useState(1);

    const [open, setOpen] = useState(true);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onChangeFile = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        onChange: onChangeFile,
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

    return (
        <div className="p-3 pt-1">
            <h4>{title}</h4>
            <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                    <Radio value={1}>Postman v2.1</Radio>
                    <Radio value={2} disabled>
                        Postman v2.0
                    </Radio>
                    <Radio value={3} disabled>
                        OpenApi 3.0
                    </Radio>
                </Space>
            </Radio.Group>
            <br />
            <br />
            <div className="bg-primary-transparent mb-3 mt-4">
                <div><div className="row mb-3"><span className="col-11"></span><span className="col-1"><Button type="primary" disabled={fileList.length===0 || !value}><SaveOutlined/></Button></span></div></div>
                <Dragger {...uploadProps}>
                    <div className="p-4">
                        <p className="ant-upload-drag-icon ">
                            <UploadOutlined style={{ fontSize: 24 }} />
                        </p>
                        <p className="ant-upload-text">Drag and drop or browse files by clicking on this Box</p>
                        <p className="ant-upload-hint">
                            File should be of the selected api format, actions are automatically created from your api
                            documentation
                        </p>
                    </div>
                </Dragger>
            </div>
        </div>
    );
};
