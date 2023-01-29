import App_Layout from '../../../../components/layout/app_layout';

import { useState } from 'react';

const Index = () => {
    const { app_id } = props;

    //alert(JSON.stringify(props));

    const [text, setText] = useState('');
    const [html, setHTML] = useState('');

    return <App_Layout app_id={app_id} selected="1" setHTML={setHTML} setText={setText}></App_Layout>;
};

const Webhook = (props) => {
    return <></>;
};

export const getServerSideProps = async ({ params }) => {
    const { id: app_id, webhook_id } = params;

    return {
        props: { webhook_id, app_id },
    };
};

export default Index;
