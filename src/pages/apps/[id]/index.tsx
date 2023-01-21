import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import { useState } from 'react';

const Index = (props) => {
    const { app_id } = props;

    //alert(JSON.stringify(props));

    const [text, setText] = useState('');
    const [html, setHTML] = useState('');

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="My App">
            <Overview app_id={app_id} defaultText={text} defaultHTML={html} />
        </Dashboard_Layout>
    );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
    const app_id = params.id;

    return {
        props: { app_id },
    };
};
