import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
function Warm(props) {
  const { canvas, setVisible } = props;
  const filters = [
    {
      name: "Sunrise",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_evening.jpg",
    },
    {
      name: "OrangePeel",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_sunset.jpg",
    },
    {
      name: "Love",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_eighties.jpg",
    },
    {
      name: "GlowingSun",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_nogreen.jpg",
    },
    {
      name: "HerMajesty",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_k2.jpg",
    },
  ];

  const handleClick = (e) => {
    setVisible(true);
    let id = e.currentTarget.id;
    switch (id) {
      case "Sunrise":
        window.Caman(canvas, function () {
          this.revert(false);
          this.sunrise().render();
        });
        break;
      case "OrangePeel":
        window.Caman(canvas, function () {
          this.revert(false);
          this.orangePeel().render();
        });
        break;
      case "Love":
        window.Caman(canvas, function () {
          this.revert(false);
          this.love().render();
        });
        break;
      case "GlowingSun":
        window.Caman(canvas, function () {
          this.revert(false);
          this.glowingSun().render();
        });
        break;
      case "HerMajesty":
        window.Caman(canvas, function () {
          this.revert(false);
          this.herMajesty().render();
        });
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu style={{ overflowY: "scroll" }}>
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
          id="warm"
          className="btn_style"
          onClick={(e) => e.preventDefault()}
        >
          Warm
          <DownOutlined />
        </button>
      </Dropdown>
      ,
    </div>
  );
}

export default Warm;
