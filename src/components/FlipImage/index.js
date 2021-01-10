import React from "react";

function FlipImage(props) {
  const { setContext, ctx, canvas } = props;
  let array = [];
  const getImgData = async () => {
    let newData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
    array = newData.data;
  };
  const flipHorizontal = (array, width) => {
    function splitArray(array, part) {
      let tmp = [];
      for (let i = 0; i < array.length; i += part) {
        const sliced = array.slice(i, i + part);
        tmp.push(sliced);
      }
      return tmp;
    }
    let newArr = [];
    const output = splitArray(array, 4 * width);
    const newOutput = output.map((row) => {
      const pixel = splitArray(row, 4);
      return pixel.reverse();
    });
    for (let item of newOutput) {
      for (let i = 0; i < item.length; i++) {
        for (let element of item[i]) {
          newArr.push(element);
        }
      }
    }

    return newArr;
  };
  const flipVerticle = (array, width) => {
    const output = [];
    const channel = 4;
    let row = [];
    let counter = 0;
    let max = width * channel;

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
    let newArr = [];
    for (let item of output.reverse()) {
      for (let element of item) {
        newArr.push(element);
      }
    }
    return newArr;
  };
  const doFlip = async (e) => {
    await getImgData();
    if (e.target.id === "flipH") {
      let newArr = await flipHorizontal(array, canvas.width);
      let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
      imgData.data.set(newArr);
      await ctx.putImageData(imgData, 0, 0);
      setContext(ctx);
    } else if (e.target.id === "flipV") {
      let newArr = await flipVerticle(array, canvas.width);
      let imgData = await ctx.getImageData(0, 0, canvas.width, canvas.height);
      imgData.data.set(newArr);
      await ctx.putImageData(imgData, 0, 0);
      setContext(ctx);
    }
  };
  return (
    <div className="flip-filter">
      <button className="btn btn-light" id="flipH" onClick={doFlip}>
        Flip Horizontal
      </button>
      <button className="btn btn-light" id="flipV" onClick={doFlip}>
        Flip Vertical
      </button>
    </div>
  );
}

export default FlipImage;
