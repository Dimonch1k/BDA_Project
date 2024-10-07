import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";

const CoverImageUpload = ({ setFieldValue }) => {
  const handledUpload = ({ file }) => {
    setFieldValue("cover_image", file);
  };

  return (
    <Upload
      beforeUpload={() => false} // Prevent automatic upload
      onChange={handledUpload}
      accept="image/*"
    >
      <Button className="upload-button" icon={<UploadOutlined />}>
        Upload Cover Image
      </Button>
    </Upload>
  );
};

export default CoverImageUpload;
