import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
function Smooth(props) {
  const { canvas, setVisible } = props;
  const filters = [
    {
      name: "Clarity",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_highcarb.jpg",
    },
    {
      name: "HazyDays",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_colorful.jpg",
    },
    {
      name: "Concentrate",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_pale.jpg",
    },
    {
      name: "Grungy",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/categories/vintage.jpg",
    },
  ];

  const handleClick = (e) => {
    setVisible(true);
    let id = e.currentTarget.id;
    switch (id) {
      case "Clarity":
        window.Caman(canvas, function () {
          this.revert(false);
          this.clarity().render();
        });
        break;
      case "HazyDays":
        window.Caman(canvas, function () {
          this.revert(false);
          this.hazyDays().render();
        });
        break;
      case "Concentrate":
        window.Caman(canvas, function () {
          this.revert(false);
          this.concentrate().render();
        });
        break;
      case "Grungy":
        window.Caman(canvas, function () {
          this.revert(false);
          this.grungy().render();
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
          id="smooth"
          className="btn_style"
          onClick={(e) => e.preventDefault()}
        >
          Smooth
          <DownOutlined />
        </button>
      </Dropdown>
      ,
    </div>
  );
}

export default Smooth;
