import { Upload, Button, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { uploadImage } from "../components/services/cloudinaryService";
import { createImage } from "../components/services/imageService";
const TestUpload = () => {
  const [image, setImage] = useState("");

  const beforeUpload = async (file) => {
    try {
      const cloud = await uploadImage(file, "My");

      await createImage({
        folder: "My",
        image: cloud.secure_url,
        publicId: cloud.public_id,
        createdAt: new Date().toISOString(),
      });

      setImage(cloud.secure_url);

      message.success("Upload thành công");
    } catch (err) {
      console.log(err);

      message.error("Upload thất bại");
    }

    return false;
  };

  return (
    <div
      style={{
        padding: 40,
      }}
    >
      <Upload showUploadList={false} beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <br />

      <br />

      {image && <Image width={250} src={image} />}
    </div>
  );
};

export default TestUpload;
