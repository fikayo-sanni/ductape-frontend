import { Modal, Button } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { jsonToFields } from '../../config/constant';
// import * as CodeEditor from '@uiw/react-textarea-code-editor';

// const CodeEditor = dynamic(() => import('@uiw/react-textarea-code-editor').then((mod) => mod.default), { ssr: false });

const EditActionModal = (props) => {
    const { showDialog, setInputFields, code, setCode } = props;

    const closeEditDialog = () => {
        showDialog(false);
    };

    const changeCode = (e) => {
        const { value } = e.target;
        setCode(value);
        //alert(typeof value)

        try {
            const fields = jsonToFields(JSON.parse(value));
            // alert(JSON.stringify(fields))
            setInputFields([...fields]);
        } catch (e) {
            // alert(e);
            setInputFields([]);
        }
    };

    return (
        <Modal title="Edit Action" visible={true} onCancel={closeEditDialog} onOk={closeEditDialog} width={900}>
            {/*<CodeEditor*/}
            {/*    value={code}*/}
            {/*    language="json"*/}
            {/*    placeholder="Paste a JSON sample"*/}
            {/*    onChange={changeCode}*/}
            {/*    padding={15}*/}
            {/*    style={{*/}
            {/*        fontSize: 12,*/}
            {/*        backgroundColor: '#f5f5f5',*/}
            {/*        height: '55vh',*/}
            {/*        overflow: 'auto',*/}
            {/*        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',*/}
            {/*    }}*/}
            {/*/>*/}
            code editor here
        </Modal>
    );
};

export default EditActionModal;
