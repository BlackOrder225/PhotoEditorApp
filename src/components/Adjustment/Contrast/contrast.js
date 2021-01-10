import React from "react";
import { Slider, message } from "antd";
function contrast(props) {
  const { ctx, setContext, canvas } = props;
  console.log("ctx: ", ctx);

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
    const factor = (259 * (e + 255)) / (255 * (259 - e));
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
      let rp1 = factor * (item[0] - 128) + 128;
      let gp1 = factor * (item[1] - 128) + 128;
      let bp1 = factor * (item[2] - 128) + 128;
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
    if (ctx === undefined) {
      message.error("No image to edit");
      return;
    } else {
      let newArr = await handleChange(e);
      let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
      imgData.data.set(newArr);
      await ctx.putImageData(imgData, 0, 0);
      setContext(ctx);
    }
  };
  return (
    <div>
      <div>
        <h2>Contrast</h2>
        <Slider
          onAfterChange={doConvert}
          defaultValue={0}
          min={-255}
          max={255}
        />
      </div>
    </div>
  );
}

export default contrast;
