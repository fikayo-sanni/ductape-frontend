import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-hot-toast';
import { Modal, Typography, Button } from 'antd';
import { updateDataPoint } from '../../services/actions.service';

interface Props {
    showModal: any;
    data: any;
    refresh: any;
}

const { Title } = Typography;

export const EditDataEntry: React.FC<Props> = ({ showModal, data, refresh }) => {
    // alert(JSON.stringify(data))

    const [entry, setEntry] = useState(data);
    const [loadingButton, showLoadingButton] = useState(false);
    const { user } = useSelector((state: RootState) => state.app);

    const handleChange = (e) => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    const updateData = async () => {
        // alert(JSON.stringify(entry))

        try {
            showLoadingButton(true);
            /* const response = await updateDataPoint({
                ...entry,
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
            });
            showLoadingButton(false);
            await refresh(); */
            setTimeout(() => {
                toast.success('Data Updated');
                showLoadingButton(false);
                showModal(false);
            }, 3000);
        } catch (e) {
            showLoadingButton(false);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    return (
        <Modal
            style={{ top: 150 }}
            visible={true}
            onCancel={() => {
                showModal(false);
            }}
            title={<Title level={3}>Edit Data</Title>}
            footer={
                <div className="col mt-5">
                    <Button onClick={() => showModal(false)}>Cancel</Button>
                    <Button type="primary" onClick={updateData} loading={loadingButton}>
                        Update
                    </Button>
                </div>
            }
        >
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-4">
                        <div className="form-floating">
                            <select
                                className="form-control"
                                name="defaultType"
                                value={entry.defaultType}
                                onChange={handleChange}
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
                                value={entry.defaultValue}
                                onChange={handleChange}
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
                            required
                            value={entry.sampleValue}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Sample Value"
                            name="sampleValue"
                        />
                        <label>Sample Value</label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-floating">
                        <select className="form-control" name="type" value={entry.type} onChange={handleChange}>
                            <option disabled selected value=""></option>
                            <option value="string">STRING</option>
                            <option value="number">NUMBER</option>
                            <option value="uuid">UUID</option>
                            <option value="boolean">BOOLEAN</option>
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
                            required
                            className="form-control"
                            placeholder="action"
                            name="decorator"
                            value={entry.decorator}
                            onChange={handleChange}
                        />
                        <label>Decorator</label>
                    </div>
                </div>
                <div className="col-5 mb-4">
                    <div className="form-floating">
                        <select
                            className="form-control"
                            name="decoratorPosition"
                            value={entry.decoratorPosition}
                            onChange={handleChange}
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
                            value={entry.minLength}
                            required
                            onChange={handleChange}
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
                            required
                            onChange={handleChange}
                            value={entry.maxLength}
                            className="form-control"
                            placeholder="Maximum Length"
                            name="maxLength"
                        />
                        <label>Maximum Length</label>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
