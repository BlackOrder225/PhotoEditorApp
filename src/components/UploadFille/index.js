import React from "react";
import "./index.css";
import Button from "@material-ui/core/Button";

function UploadFile(props) {
  const { setFile } = props;
  // const onSelectedFile = e =>{
  //     setFile(URL.createObjectURL(e.target.files[0]))
  // }
  const onSelectedFile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(files[0]);
    console.log("selectedFile", e.dataTransfer);
  };
  return (
    <div className="preview-container">
      <form className="file-select-frm">
        <div className="custom-file mb-3">
          <input
            className="custom-file-input"
            type="file"
            accept="image/*"
            onChange={onSelectedFile}
            id="initial"
            hidden
          />
          <label htmlFor="initial">
            <Button
              className="btn-center"
              variant="contained"
              color="default"
              component="span"
            >
              Upload
            </Button>
          </label>
        </div>
      </form>
    </div>
  );
}

export default UploadFile;
