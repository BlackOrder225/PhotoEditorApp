import React from "react";
import { Slider } from "antd";
function exposure(props) {
  const { ctx, setContext, canvas } = props;
  let array = [];
  let isFirstRun = true;
  const getImgData = async () => {
    let newData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
    array = newData.data;
  };
  const handleChange = async (e) => {
    if (isFirstRun) {
      await getImgData();
      isFirstRun = false;
    }
    const output = [];
    const channel = 4;
    let row = [];
    let counter = 0;
    let max = channel;

    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      row.push(item);
      if (counter + 1 === max) {
        output.push(row);
        row = [];
        counter = -1;
      }
      counter++;
    }
    for (let item of output) {
      let rp1 = item[0] * Math.pow(2, e * 0.01);
      let gp1 = item[1] * Math.pow(2, e * 0.01);
      let bp1 = item[2] * Math.pow(2, e * 0.01);
      item[0] = rp1;
      item[1] = gp1;
      item[2] = bp1;
    }

    let newArr = [];
    for (let item of output) {
      for (let element of item) {
        newArr.push(element);
      }
    }
    return newArr;
  };
  const doConvert = async (e) => {
    let newArr = await handleChange(e);
    let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData.data.set(newArr);
    await ctx.putImageData(imgData, 0, 0);
    setContext(ctx);
  };
  return (
    <div>
      <div>
        <h2>Exposure</h2>
        <Slider
          onAfterChange={doConvert}
          defaultValue={0}
          min={-100}
          max={100}
        />
      </div>
    </div>
  );
}

export default exposure;
