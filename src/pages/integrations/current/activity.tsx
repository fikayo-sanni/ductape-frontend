import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import { Button, Card, Input, Modal, Typography } from 'antd';
import dynamic from 'next/dynamic';
const PageHeader = dynamic(() => import('../../../components/common/pageHeader'));

const Activity = (props) => {
  const { integration_id } = props;
  return (
<Dashboard_Layout showSidebar={true} title="Integration" integrationPage="Activity">
    <PageHeader title="Activity" />
    <Card className="no_background no_border  ">

    </Card>
  </Dashboard_Layout>  );
};

export default Activity;
