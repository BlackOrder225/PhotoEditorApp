import React, { useEffect, useState } from "react";
// import FontOption from "./fontOption";
import { Input, Button, Select } from "antd";
import { FormOutlined, FontSizeOutlined } from "@ant-design/icons";
import "./index.css";
function ControlText(props) {
  const { Option } = Select;
  const { ctx, setContext } = props;
  const [text, setText] = useState({ weight: "normal" });
  const [fonts, setFonts] = useState([]);
  const getData = () =>
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDmsHMz7ufFxXwkgn8HDmUpWcpPEZpgwBI`
    )
      .then((response) => response.json())

      .catch((error) => {
        alert(error);
      });
  useEffect(() => {
    getData().then((response) => setFonts(response.items));
  }, []);
  const changeFont = (e) => {
    console.log("e", e);
    const url = e;
    const regex = /http/gi;
    const sUrl = url.replace(regex, "https");
    setText((prevState) => {
      return {
        ...prevState,
        fontName: sUrl,
      };
    });
  };

  const changeStyle = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "bold":
        setText((prevState) => {
          return {
            ...prevState,
            weight: id,
          };
        });
        break;
      case "italic":
        setText((prevState) => {
          return {
            ...prevState,
            weight: id,
          };
        });
        break;
      default:
        break;
    }
  };

  const changeText = (e) => {
    setText((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const drawText = async () => {
    let f = new FontFace("fontne", `url(${text.fontName})`);
    await f.load();
    document.fonts.add(f);
    ctx.fillStyle = `${text.txt_color}`;
    ctx.textBaseline = "top";
    ctx.font = `${text.weight} ${text.size}px 'fontne'`;
    ctx.fillText(text.content, text.x, text.y);
    await setContext(ctx);
  };
  const showOnImage = (e) => {
    e.preventDefault();
    drawText();
  };
  return (
    <div>
      <form className="comment-filter" onSubmit={showOnImage}>
        <label>Text</label>
        <Input
          prefix={<FormOutlined />}
          name="content"
          type="text"
          placeholder="Fill content"
          onChange={changeText}
          required
        />
        <Input
          type="color"
          className="height-100"
          onChange={changeText}
          id="txt_color"
          name="txt_color"
          required
        />
        <div className="form-row">
          <div className="col">
            <Input
              prefix={<FontSizeOutlined />}
              name="size"
              type="number"
              placeholder="Size"
              defaultValue={20}
              title="Text Size"
              onChange={changeText}
              required
            />
          </div>
          <div className="col">
            <div className="text-weight">
              <Button type="submit" id="bold" onClick={changeStyle}>
                <i className="fas fa-bold" />
              </Button>
              <Button
                type="submit"
                className="btn-status"
                id="italic"
                onClick={changeStyle}
              >
                <i className="fas fa-italic" />
              </Button>
            </div>
          </div>
          <div>
            <div className="col">
              <Select id="fontName" name="fontName" onChange={changeFont}>
                {fonts.map((item, index) => (
                  <Option
                    key={index}
                    url={item.files.regular}
                    title={item.family}
                    value={item.files.regular}
                  >
                    {item.family}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <Input
            name="x"
            type="number"
            placeholder="Text Position (X)"
            onChange={changeText}
            required
          />
          <Input
            name="y"
            type="number"
            placeholder="Text Position (Y)"
            onChange={changeText}
            required
          />
        </div>
        <div className="button_container">
          <button className="btn btn-light" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ControlText;
