import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import {
  GatewayOutlined,
  BgColorsOutlined,
  FilterOutlined,
  FileImageOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./style.scss";
import CropImage from "../CropImage/index";
import Rotate from "../Rotate/index";
import Upload from "../UploadFille/index";
import FlipImage from "../FlipImage/index";
import ControlText from "../ControlText/index";
import Filter from "../Filter/index";
import Adjustment from "../Adjustment/index";
const { TabPane } = Tabs;
function index(props) {
  const TabPanelTransform = () => {
    return (
      <div className="tab-container">
        <div className="group-function">
          <div>
            <h3>Crop Size: </h3>
            <CropImage
              canvas={props.canvas}
              image={props.image}
              ctx={props.ctx}
              setContext={props.setContext}
            />
          </div>
          <div>
            <h3>Rotate: </h3>
            <Rotate
              canvas={props.canvas}
              image={props.image}
              ctx={props.ctx}
              setContext={props.setContext}
            />
            <hr />
          </div>
          <div>
            <h3>Flip: </h3>
            <div className="do_flip">
              <FlipImage
                canvas={props.canvas}
                ctx={props.ctx}
                setContext={props.setContext}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const TabPanelEditText = () => {
    return (
      <div>
        <ControlText ctx={props.ctx} setContext={props.setContext} />
      </div>
    );
  };
  const TabPanelAdjustment = () => {
    return (
      <div>
        <Adjustment
          ctx={props.ctx}
          setContext={props.setContext}
          canvas={props.canvas}
        />
      </div>
    );
  };

  const TabPaneFilter = () => {
    return (
      <div>
        <Filter
          setContext={props.setContext}
          ctx={props.ctx}
          canvas={props.canvas}
        />
      </div>
    );
  };
  const TabIconTransform = () => {
    return (
      <div className="transform-icon" title="Transform">
        <GatewayOutlined />
        <span>Transform</span>
      </div>
    );
  };
  const TabIconEditText = () => {
    return (
      <div className="text-icon" title="Edit Text">
        <EditOutlined />
        <span>Edit Text</span>
      </div>
    );
  };
  const TabIconAdjustment = () => {
    return (
      <div className="Adjustment-icon" title="Adjustment">
        <BgColorsOutlined />
        <span>Adjustment</span>
      </div>
    );
  };
  const TabIconFilter = () => {
    return (
      <div className="Filter-icon" title="Filter">
        <FilterOutlined />
        <span>Filter</span>
      </div>
    );
  };
  const TabIconLibrary = () => {
    return (
      <div className="Filter-icon" title="Filter">
        <FileImageOutlined />
        <span>Library</span>
      </div>
    );
  };
  return (
    <>
      <Tabs tabPosition="left" defaultActiveKey="0" type="card">
        <TabPane tab={TabIconLibrary()} key="0">
          <Upload setFile={props.setFile} />
        </TabPane>
        <TabPane tab={TabIconTransform()} key="1">
          <TabPanelTransform />
        </TabPane>
        <TabPane tab={TabIconAdjustment()} key="2">
          <TabPanelAdjustment />
        </TabPane>
        <TabPane tab={TabIconFilter()} key="3">
          <TabPaneFilter />
        </TabPane>
        <TabPane tab={TabIconEditText()} key="4">
          <TabPanelEditText />
        </TabPane>
      </Tabs>
    </>
  );
}

export default index;
