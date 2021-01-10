import React, { useState } from "react";
import "./index.css";
import BlackAndWhite from "./BlackAndWhite";
import Warm from "./Warm/index";
import Cold from "./Cold/index";
import { Slider } from "antd";
import Smooth from "./Smooth";

function Filter(props) {
  const { setContext, ctx, canvas } = props;
  // // console.log(canvas);
  const [array, setArray] = useState([]);
  // const getImgData = async () => {
  //   let newData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   array = newData.data;
  //   console.log("a: ", array);
  //   return array;
  // };

  const [visible, setVisible] = useState(false);
  const removeFilter = async (e) => {
    setVisible(false);
    window.Caman(canvas, function () {
      this.revert(false);
      this.render();
    });
    let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData.data.set(array);
    await ctx.putImageData(imgData, 0, 0);
    setContext(ctx);
  };
  return (
    <div>
      <div className="filter-wrapper">
        {visible ? (
          <div className="filter-tainer">
            <div className="label-filter">
              <label id="label" htmlFor="filter_range">
                Filter Intensity
              </label>
            </div>
            <Slider
              defaultValue={100}
              min={1}
              max={100}
              // onAfterChange={doConvert}
            />
            <button id="btn btn-primary" onClick={removeFilter}>
              Remove Filter
            </button>
          </div>
        ) : null}
        <BlackAndWhite
          key="1"
          setContext={setContext}
          ctx={ctx}
          canvas={canvas}
          setVisible={setVisible}
          setArray={setArray}
        />
        <Warm key="2" canvas={canvas} setVisible={setVisible} />
        <Cold key="3" canvas={canvas} setVisible={setVisible} />
        <Smooth key="4" canvas={canvas} setVisible={setVisible} />
      </div>
    </div>
  );
}
export default Filter;
