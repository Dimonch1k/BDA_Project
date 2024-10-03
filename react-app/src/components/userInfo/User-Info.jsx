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
        type="primary"
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
        <p>Name: John</p>
        <p>Surname: Doe</p>
        <p>Email: johnDoe@gmail.com</p>
        <p>Password: 1234</p>
      </Modal>
    </>
  );
};

export default UserInfo;
