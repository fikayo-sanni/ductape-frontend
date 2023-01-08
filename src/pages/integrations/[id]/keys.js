import Integration_Layout from "../../../components/layout/integration_layout";

const Keys = (props) => {
  const { integration_id } = props;
  return (
    <Integration_Layout integration_id={integration_id} selected={"4"}></Integration_Layout>
  );
};

export default Keys;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  };
};
