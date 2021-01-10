import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import GrayScale from "./GrayScale/index";
import Sepia from "./Sepia/index";
function BlackAndWhite(props) {
  const { setContext, ctx, canvas, setVisible, setArray } = props;
  const filters = [
    {
      name: "Vintage",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_ad1920.jpg",
    },
    {
      name: "Lomo",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
    {
      name: "SinCity",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
    {
      name: "Pinhole",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
    {
      name: "Nostalgia",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
    {
      name: "Hemingway",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
  ];

  const handleClick = (e) => {
    setVisible(true);
    let id = e.currentTarget.id;
    switch (id) {
      case "Vintage":
        window.Caman(canvas, function () {
          this.revert(false);
          this.vintage().render();
        });
        break;
      case "Lomo":
        window.Caman(canvas, function () {
          this.revert(false);
          this.lomo().render();
        });
        break;
      case "SinCity":
        window.Caman(canvas, function () {
          this.revert(false);
          this.sinCity().render();
        });
        break;
      case "Pinhole":
        window.Caman(canvas, function () {
          this.revert(false);
          this.pinhole().render();
        });
        break;
      case "Nostalgia":
        window.Caman(canvas, function () {
          this.revert(false);
          this.nostalgia().render();
        });
        break;
      case "Hemingway":
        window.Caman(canvas, function () {
          this.revert(false);
          this.hemingway().render();
        });
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu style={{ overflowY: "scroll" }}>
      <Menu.Item key="GrayScale">
        <GrayScale
          setContext={setContext}
          ctx={ctx}
          canvas={canvas}
          setVisible={setVisible}
          setArray={setArray}
        />
      </Menu.Item>
      <Menu.Item key="Sepia">
        <Sepia
          setContext={setContext}
          ctx={ctx}
          canvas={canvas}
          setVisible={setVisible}
          setArray={setArray}
        />
      </Menu.Item>
      {filters.map((filter) => {
        return (
          <Menu.Item>
            <button
              className="btn_style"
              key={filter.name}
              id={filter.name}
              style={{ backgroundImage: `url(${filter.url})` }}
              onClick={handleClick}
            >
              {filter.name}
            </button>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <button
          id="BaW"
          className="btn_style"
          onClick={(e) => e.preventDefault()}
        >
          B&W <DownOutlined />
        </button>
      </Dropdown>
      ,
    </div>
  );
}

export default BlackAndWhite;
