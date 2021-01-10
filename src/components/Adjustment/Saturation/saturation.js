import React from "react";
import { message, Slider } from "antd";
function saturation(props) {
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
    // const factor = (259 * (e + 255)) / (255 * (259 - e));
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
      const hsv = RGBtoHSV(item);
      const p = hsv[1] / 50;
      hsv[1] = p * e;
      const rgb = HSVtoRGB(hsv);
      item[0] = rgb[0];
      item[1] = rgb[1];
      item[2] = rgb[2];
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
  const RGBtoHSV = function (color) {
    let r, g, b, h, s, v, min, max, delta;
    r = color[0];
    g = color[1];
    b = color[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);

    v = max;
    delta = max - min;
    if (max !== 0) s = delta / max;
    // s
    else {
      // r = g = b = 0        // s = 0, v is undefined
      s = 0;
      h = -1;
      return [h, s, undefined];
    }
    if (r === max) h = (g - b) / delta;
    // between yellow & magenta
    else if (g === max) h = 2 + (b - r) / delta;
    // between cyan & yellow
    else h = 4 + (r - g) / delta; // between magenta & cyan
    h *= 60; // degrees
    if (h < 0) h += 360;
    if (isNaN(h)) h = 0;
    return [h, s, v];
  };

  const HSVtoRGB = function (color) {
    let i;
    let h, s, v, r, g, b, f, p, q, t;
    h = color[0];
    s = color[1];
    v = color[2];
    if (s === 0) {
      // achromatic (grey)
      r = g = b = v;
      return [r, g, b];
    }
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      default:
        // case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return [r, g, b];
  };
  return (
    <div>
      <div>
        <h2>Saturation</h2>
        <Slider onAfterChange={doConvert} defaultValue={50} min={0} max={100} />
      </div>
    </div>
  );
}

export default saturation;
