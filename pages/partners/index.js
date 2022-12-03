import PartnerList_Layout from "../../components/layout/partnerslist_layout";
import Partners_Layout from "../../components/layout/partners_layout";
import EmptyList from "../../components/apps/emptyList"

const Index = (props) => {
  //return <Partners_Layout></Partners_Layout>
  return <Partners_Layout><EmptyList/></Partners_Layout>
}

export default Index;