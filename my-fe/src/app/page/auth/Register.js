import React, { useEffect, useState } from "react";
import clipLogin from "./../../../assets/video/backgroundTDN2.mp4";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { postRegister,setIsLoadingAuth } from "../../../redux/auth/auth";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [isloading, setIsloading] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);
  useEffect(()=>{
    if(auth.status===true){
      navigate('/login');
    }
  },[auth])

  const onFinish = (values) => {
    dispatch(setIsLoadingAuth());
    dispatch(postRegister(values));

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
      <Loading isloading={isloading} />
      <div className="register">
        <div className="bg-video">
          <div className="bg-video__color"></div>
          <video className="bg-video__content" autoPlay muted loop>
            <source src={clipLogin} type="video/mp4" />
            Your browser is not supported!
          </video>
        </div>
        <div className="register__form">
          <div className="register__form--body">
            <h1>Sign Up</h1>
            <Form
             form={form}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="User name"
                name="userName"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  { type: "email" },
                ]}
              >
                <Input size="large" />
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
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item
                label="Password Confirm"
                name="passwordConfirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <div className="register__btn">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "50%" }}
                    size="middle"
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div>
              <p className="register__form--link">
                Do have an account?{" "}
                <Link className="register__form--link-span" to="/login">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
