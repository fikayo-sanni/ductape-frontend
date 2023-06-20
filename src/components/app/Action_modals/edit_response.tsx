import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { statusCodes } from '../../config/constant';
import { updateResponse } from '../../services/actions.service';
import toast from 'react-hot-toast';

interface Props {
    showModal: any;
    response: any;
    refresh: any;
}

const { Title } = Typography;

export const EditResponseModal: React.FC<Props> = ({ showModal, response, refresh }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

    const [input, setInput] = useState(response);
    const [loading, showLoading] = useState(false);
    const handleSave = async () => {
        // alert(JSON.stringify(input));

        try {
            showLoading(true);
            const {_id: id, name, tag, description, status_code} = input;
            await updateResponse({
                id,
                name,
                tag,
                description,
                status_code,
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
            });

            showLoading(false);
            toast.success("Response Updated");
            showModal(false)
            refresh()
        } catch (e) {
            showLoading(false);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const StatusCodesRows = statusCodes.map((data, index) => {
        return (
            <option value={data.code}>
                {data.name} {data.code ? '-' : ''} {data.code}
            </option>
        );
    });
    return (
        <Modal
            visible={true}
            title={<Title level={3}>Edit Response</Title>}
            onCancel={() => showModal(false)}
            footer={
                <div className="col mt-5">
                    <Button type="default" onClick={() => showModal(false)}>
                        Cancel
                    </Button>
                    <Button type="primary" onClick={handleSave} loading={loading}>
                        Update
                    </Button>
                </div>
            }
        >
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="form-floating">
                        <input
                            type="text"
                            value={input.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Name"
                            name="name"
                        />
                        <label>Name</label>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="form-floating">
                        <input
                            type="text"
                            value={input.tag}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Tag"
                            name="tag"
                        />
                        <label>Tag</label>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="form-floating">
                        <Input.TextArea
                            value={input.description}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="form-control"
                            placeholder="Description"
                            name="description"
                        />
                        <label>Description</label>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="form-floating">
                    <select className="form-control" name="type" value={input.status_code} onChange={handleChange}>
                        {StatusCodesRows}
                    </select>
                    <label>Status Code</label>
                </div>
            </div>
        </Modal>
    );
};
/**
 * <div>status code: {input.status_code}</div>
            <div>success: {input.success.toString()}</div>
 */
