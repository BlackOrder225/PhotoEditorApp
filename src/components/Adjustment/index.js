import React from "react";
import Brightness from "./Brightness/brightness";
import Contrast from "./Contrast/contrast";
import Exposure from "./Exposure/exposure";
import Saturation from "./Saturation/saturation";
import Hue from "./Hue/hue";
function index(props) {
  const { ctx, setContext, canvas } = props;

  return (
    <div>
      <Brightness canvas={canvas} ctx={ctx} setContext={setContext} />
      <Contrast canvas={canvas} ctx={ctx} setContext={setContext} />
      <Exposure canvas={canvas} ctx={ctx} setContext={setContext} />
      <Saturation canvas={canvas} ctx={ctx} setContext={setContext} />
      <Hue canvas={canvas} ctx={ctx} setContext={setContext} />
    </div>
  );
}

export default index;
