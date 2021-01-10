import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
function Cold(props) {
  const { canvas, setVisible } = props;
  const filters = [
    {
      name: "CrossProcess",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_pale.jpg",
    },
    {
      name: "Jarques",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_elder.jpg",
    },
    {
      name: "OldBoot",
      url:
        "https://cdn.jsdelivr.net/npm/photoeditorsdk@latest/assets/filter/items/imgly_lut_blueshadows.jpg",
    },
  ];

  const handleClick = (e) => {
    setVisible(true);
    let id = e.currentTarget.id;
    switch (id) {
      case "CrossProcess":
        window.Caman(canvas, function () {
          this.revert(false);
          this.crossProcess().render();
        });
        break;
      case "Jarques":
        window.Caman(canvas, function () {
          this.revert(false);
          this.jarques().render();
        });
        break;
      case "OldBoot":
        window.Caman(canvas, function () {
          this.revert(false);
          this.oldBoot().render();
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
          id="cold"
          className="btn_style"
          onClick={(e) => e.preventDefault()}
        >
          Cold
          <DownOutlined />
        </button>
      </Dropdown>
      ,
    </div>
  );
}

export default Cold;
