import React from "react";
import "./index.css";
function SaveImage(props) {
  const { canvas } = props;
  const downloadPhoto = (e) => {
    if (e.target.id === "jpeg") {
      const jpeg = canvas.toDataURL("image/jpeg");
      e.target.href = jpeg;
    } else if (e.target.id === "webp") {
      const webp = canvas.toDataURL("image/webp");
      e.target.href = webp;
    } else if (e.target.id === "jfif") {
      const jfif = canvas.toDataURL("image/jfif");
      e.target.href = jfif;
    } else {
      const png = canvas.toDataURL();
      e.target.href = png;
    }
  };
  return (
    <div className="save-container">
      <div className="dropdown">
        <div className="btn-save">
          <button className="dropbtn">Save As</button>
        </div>
        <div className="dropdown-content">
          <a
            className="btn btn-primary"
            id="png"
            href="#1"
            onClick={downloadPhoto}
            download="myImage.png"
          >
            .PNG
          </a>
          <a
            className="btn btn-primary"
            id="jpeg"
            href="#2"
            onClick={downloadPhoto}
            download="myImage.jpeg"
          >
            .JPEG
          </a>
          <a
            className="btn btn-primary"
            id="webp"
            href="#3"
            onClick={downloadPhoto}
            download="myImage.webp"
          >
            .WEBP
          </a>
          <a
            className="btn btn-primary"
            id="jfif"
            href="#4"
            onClick={downloadPhoto}
            download="myImage.jfif"
          >
            .JFIF
          </a>
        </div>
      </div>
    </div>
  );
}

export default SaveImage;
