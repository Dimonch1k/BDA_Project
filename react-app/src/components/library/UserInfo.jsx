import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Row, Col, Typography, Space } from "antd";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

const { Title, Text } = Typography;

const UserInfo = () => {
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Button
        type="primary"
        shape="round"
        onClick={showModal}
        icon={<UserOutlined />}
        size="large"
        className="shadow-md hover:shadow-lg ml-6"
      >
        My Profile
      </Button>

      <Modal
        title={
          <Title level={3} className="text-center mb-0">
            User Information
          </Title>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleOk}>
            Close
          </Button>,
        ]}
        centered
        className="p-4 rounded-lg"
        bodyStyle={{ padding: "20px 40px" }}
      >
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={24} className="text-center">
            <UserOutlined style={{ fontSize: "60px", color: "#1890ff" }} />
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="start" align="middle">
              <Col span={4}>
                <UserOutlined style={{ fontSize: "20px", color: "#595959" }} />
              </Col>
              <Col span={20}>
                <Text strong>First Name:</Text>{" "}
                <Text className="text-lg text-gray-700">
                  {user?.name || "John"}
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="start" align="middle">
              <Col span={4}>
                <MailOutlined style={{ fontSize: "20px", color: "#595959" }} />
              </Col>
              <Col span={20}>
                <Text strong>Email:</Text>{" "}
                <Text className="text-lg text-gray-700">
                  {user?.email || "johnDoe@gmail.com"}
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="start" align="middle">
              <Col span={4}>
                <LockOutlined style={{ fontSize: "20px", color: "#595959" }} />
              </Col>
              <Col span={16}>
                <Text strong>Password:</Text>{" "}
                <Text className="text-lg text-gray-700">
                  {showPassword ? user?.password || "1234" : "******"}
                </Text>
              </Col>
              <Col span={4}>
                <Button
                  type="link"
                  icon={
                    showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />
                  }
                  onClick={toggleShowPassword}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UserInfo;
