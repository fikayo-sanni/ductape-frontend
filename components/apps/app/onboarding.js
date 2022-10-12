import { Breadcrumb } from "antd";
import Lists from "./crud/lists";

const Onboarding = (props) => {
  const {setupList, showCreateActionDialog, setSelectedPage, setActionSelected} = props
  /** const changeActionSelected = () => {
    toast.error(boom)
  }*/
  return (
    <span>
      <div>
        <div className="row">
          <div className="col-4">
            <Breadcrumb>
              <Breadcrumb.Item>Onboarding</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <span className="col-6"></span>
          <span className="col-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                showCreateActionDialog("SETUP");
              }}
            >
              ADD STEP
            </button>
          </span>
        </div>
      </div>

      <Lists list={setupList} setSelectedPage={setSelectedPage} setActionSelected={setActionSelected}/>
    </span>
  );
};

export default Onboarding;
