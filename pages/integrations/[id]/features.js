import Integration_Layout from "../../../components/layout/integration_layout";

const Features = (props) => {
  const { integration_id } = props;
  return (
    <Integration_Layout integration_id={integration_id} selected={"3"}></Integration_Layout>
  );
};

export default Features;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  };
};
