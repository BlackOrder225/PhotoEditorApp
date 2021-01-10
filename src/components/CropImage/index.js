import React, { useState } from "react";
import { Input } from "antd";
import "./index.css";
function CropImage(props) {
  const { canvas, image, ctx, setContext } = props;
  const [crop, setCrop] = useState();
  const changeCrop = (e) => {
    setCrop((prevState) => {
      return {
        ...prevState,
        sX: e.currentTarget.value,
        sY: e.currentTarget.value,
        sW: image.width,
        sH: image.height,
        dW: canvas.width,
        dH: canvas.height,
        dX: e.currentTarget.value,
        dY: e.currentTarget.value,
        // const changeCrop = (e) => {
        //   setCrop((prevState) => {
        //     return { ...prevState, [e.target.name]: e.target.value };
      };
    });
  };
  console.log("crop ctx", ctx);

  const doCrop = async (e) => {
    console.log("ctx", ctx);
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.drawImage(
      image,
      parseInt(crop.sX),
      parseInt(crop.sY),
      parseInt(crop.dX),
      parseInt(crop.dY),
      0,
      0,
      canvas.width,
      canvas.height
    );
    await setContext(ctx);
  };

  return (
    <div>
      <form id="crop" className="crop-filter" onSubmit={doCrop}>
        <label>Start position:</label>

        <div className="form-row">
          <div className="col">
            <Input
              name="sX"
              type="number"
              placeholder="Source x"
              // onChange={changeCrop}
              required
            />
          </div>
          <div className="col">
            <Input
              name="sY"
              type="number"
              placeholder="Source y"
              // onChange={changeCrop}
              required
            />
          </div>
        </div>
        <br></br>
        <label>Destination position:</label>
        <div className="form-row">
          <div className="col">
            <Input
              name="dX"
              type="number"
              placeholder="Source Width'"
              onChange={changeCrop}
              required
            />
          </div>
          <div className="col">
            <Input
              name="dY"
              type="number"
              placeholder="Source Height'"
              // onChange={changeCrop}
              required
            />
          </div>
        </div>
        <div className="button_container">
          <button type="submit" className="btn btn-light">
            Crop
          </button>
        </div>
      </form>
    </div>
  );
}

export default CropImage;
