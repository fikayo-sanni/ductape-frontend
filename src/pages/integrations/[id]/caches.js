import Integration_Layout from "../../../components/layout/integration_layout";

const Caches = (props) => {
  const { integration_id } = props;
  return (
    <Integration_Layout integration_id={integration_id} selected={"5"}></Integration_Layout>
  );
};

export default Caches;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  };
};
