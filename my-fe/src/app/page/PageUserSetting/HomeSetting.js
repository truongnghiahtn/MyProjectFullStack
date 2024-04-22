import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const HomeSetting = () => {
  const [userLogo, setUserLogo] = useState(null);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      userName: "Bamboo",
      email: "truong duc nghia",
      phone: "+84346251700",
      password: "nhincc",
      adress: "binh thuan",
    });
  }, []);
  useEffect(() => {
    let logo = auth.photo.find((item) => item.active === true);
    setUserLogo(`http://localhost:8100/${logo.src}`);
  }, [auth]);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
  };

  const onFinish = (values) => {
    console.log(values);
    setComponentDisabled(!componentDisabled);
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  return (
    <>
      <div className="home--setting">
        <Row className="home--setting__header">
          <Col span={14} className="home--setting__header-left">
            <div className="home--setting__header-shape">
              <img src={userLogo} alt="avatar" className="home--setting__img" />
            </div>
            <div className="home--setting__header-text">
              <h3 className="heading-tertiary">{auth.userName}</h3>
              <p>
                đây là một đoạn mô tả đơn giản sit amet consectetur adipisicing
                elit. Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui....
              </p>
            </div>
          </Col>
          <Col span={10} className="home--setting__header-right">
            <FaEdit className="user--setting__icon btn" />
          </Col>
        </Row>
        <Row className="home--setting__content">
          <Col span={24}>
            <h3 className="heading-second">Change User Information here</h3>
          </Col>
          {/* <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Change infomation
          </Checkbox> */}
          <Col span={24}>
            <Form
              disabled={componentDisabled}
              {...formItemLayout}
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="UserName"
                name="userName"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  marginRight: "16px",
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                style={{
                  display: "inline-block",
                  width: "calc(100% - 5rem)",
                }}
              >
                <Input.Password disabled />
              </Form.Item>
              <div
                style={{
                  display: "inline-block",
                  width: "5rem",
                  position: "relative",
                }}
              >
                <FaEdit
                  className="user--setting__icon btn"
                  style={{
                    position: "absolute",
                    top: "1.7rem",
                    left: "3rem",
                  }}
                  onClick={() => {
                    setIsModalEdit(true);
                  }}
                />
              </div>

              <Form.Item label="Adress" name="adress">
                <TextArea rows={2} />
              </Form.Item>
              {!componentDisabled && (
                <div
                  style={{
                    paddingTop: "3rem",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Form.Item className="btn">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "10rem" }}
                      size="large"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form>
          </Col>
          {componentDisabled && (
            <Col span={24} className="home--setting__content-edit">
              <FaEdit
                className="user--setting__icon btn"
                onClick={(e) => {
                  setComponentDisabled(!componentDisabled);
                }}
              />
            </Col>
          )}
        </Row>
      </div>
      <ModalEditPassword
        isModalOpen={isModalEdit}
        setIsModalOpen={setIsModalEdit}
      />
    </>
  );
};
export default HomeSetting;

const ModalEditPassword = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="Change password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>
        ]}

      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="password current"
            name="passwordCrt"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="middle" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="middle" />
          </Form.Item>

          <Form.Item
            label="Password Confirm"
            name="passwordConfirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password size="middle" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
