import App_Layout from "../../../components/layout/app_layout";
import PricingComponent from "../../../components/apps/app/pricing";
import { useState } from "react";

const Pricing = (props) => {
  const { app_id } = props;
  const [priceList, setPriceList] = useState([]);
  const [createPrices, setCreatePrices] = useState(false);
  return (
    <App_Layout app_id={app_id} selected="7">
      <PricingComponent setCreatePrices={setCreatePrices} />
    </App_Layout>
  );
};

export default Pricing;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
