import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Row, Col, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slices/userSlice";

const { Title, Text } = Typography;

const InfoRow = ({
  icon,
  label,
  value,
  isPassword,
  showPassword,
  toggleShowPassword,
}) => (
  <Row gutter={[16, 16]} justify="start" align="middle">
    <Col span={4}>{icon}</Col>
    <Col span={16}>
      <Text strong>{label}:</Text>{" "}
      <Text className="text-lg text-gray-700">
        {isPassword && !showPassword ? "******" : value}
      </Text>
    </Col>
    {isPassword && (
      <Col span={4}>
        <Button
          type="link"
          icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={toggleShowPassword}
        />
      </Col>
    )}
  </Row>
);

const UserInfo = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const userInfo = [
    {
      icon: <UserOutlined style={{ fontSize: "20px", color: "#595959" }} />,
      label: "First Name",
      value: user?.name || "John",
    },
    {
      icon: <MailOutlined style={{ fontSize: "20px", color: "#595959" }} />,
      label: "Email",
      value: user?.email || "johnDoe@gmail.com",
    },
    {
      icon: <LockOutlined style={{ fontSize: "20px", color: "#595959" }} />,
      label: "Password",
      value: user?.password || "1234",
      isPassword: true,
    },
  ];

  const logoutUser = () => {
    dispatch(signOut());
  };

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
          <Button
            key="logout"
            type="danger"
            onClick={() => {
              logoutUser();
              handleOk();
            }}
            className="bg-red-500 text-white hover:bg-red-600 hover:text-white transition-all"
          >
            Logout
          </Button>,
          <Button key="close" type="primary" onClick={handleOk}>
            Close
          </Button>,
        ]}
        centered
        className="custom-modal p-4 rounded-lg"
      >
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col span={24} className="text-center">
            <UserOutlined style={{ fontSize: "60px", color: "#1890ff" }} />
          </Col>
          <Col span={24}>
            {userInfo.map((info) => (
              <InfoRow
                key={info.label}
                icon={info.icon}
                label={info.label}
                value={info.value}
                isPassword={info.isPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
            ))}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UserInfo;
