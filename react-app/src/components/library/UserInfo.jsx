import { UserOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button
        type="default"
        shape="circle"
        onClick={showModal}
        icon={<UserOutlined />}
      />
      <Modal
        title="Your info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>First Name: John</p>
        <p>Last Name: Doe</p>
        <p>Email: johnDoe@gmail.com</p>
        <p>Password: 1234</p>
      </Modal>
    </>
  );
};

export default UserInfo;
