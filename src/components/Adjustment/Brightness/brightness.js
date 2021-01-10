import React from "react";
import { Slider, message } from "antd";
function Brightness(props) {
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
      let rp1 = (255 - item[0]) / 100;
      let gp1 = (255 - item[1]) / 100;
      let bp1 = (255 - item[2]) / 100;
      item[0] = item[0] + rp1 * e;
      item[1] = item[1] + gp1 * e;
      item[2] = item[2] + bp1 * e;
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
    if (ctx === undefined) {
      message.error("No image to edit");
      return;
    }
    let newArr = await handleChange(e);
    let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData.data.set(newArr);
    await ctx.putImageData(imgData, 0, 0);
    setContext(ctx);
  };
  return (
    <div>
      <div>
        <h2>Brightness</h2>
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

export default Brightness;
