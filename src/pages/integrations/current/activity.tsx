import Integration_Layout from "../../../components/layout/integration_layout";

const Activity = (props) => {
  const { integration_id } = props;
  return (
    <Integration_Layout integration_id={integration_id} selected={"6"}></Integration_Layout>
  );
};

export default Activity;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  }; 
};
