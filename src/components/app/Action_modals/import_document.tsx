import { Modal, message, Button,Form,Space, Input,RadioChangeEvent,Radio,Upload } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { importPostman } from '../../services/actions.service';
import { InboxOutlined } from '@ant-design/icons';

interface Props {
    showModal: any
}
const { Dragger } = Upload;

export const ImportPostmanDoc: React.FC<Props> = ({showModal}) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [value, setValue] = useState("v2.0");

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFileChange = (e) => {
        const { status, originFileObj } = e.file;
        if (status !== 'uploading') {
          console.log(e.file, e.fileList);
        }
        if (status === 'done') {
          message.success(`${e.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${e.file.name} file upload failed.`);
        }
        setSelectedFiles([originFileObj]);
      }

    const importPostmanCollection = async () => {
        try {
            const response = await importPostman({
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                files: selectedFiles[0],
                type: value,
                workspace_id: defaultWorkspaceId,
        });
        console.log(response.data.data);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            console.log(error || e.toString());
        }
    };
    const handleSave = () => {
        importPostmanCollection() 
        showModal(false); 
    };

    return (
        <Modal
            style={{ top: 150 }}
            width={700}
            visible={true}
            onCancel={() => {
                showModal(false);
            }}
            footer={
                <div className="col mt-4 mb-5">
                    <Button onClick={handleSave}>
                        next
                    </Button>
                </div>
            }
        >
            <div className="col mt-4 mb-5">
                    <h4>Import Postman</h4>
                </div>
            <Form>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={"v2.0"}>Postman v2.0</Radio>
                        <Radio value={"v2.1"}>Postman v2.1</Radio>
                        <Radio value={"3.0"}>OpenAPI 3.0</Radio>
                    </Space>
                </Radio.Group>
                <div className="mb-3">
                    <Dragger onChange={onFileChange}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                        </p>
                    </Dragger>
                </div>
                <Button type="primary" name="import" onClick={handleSave}>Save</Button>    
            </Form>
        </Modal>
    );
};
