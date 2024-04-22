import React, { useEffect, useState } from "react";
import clipLogin from "./../../../assets/video/backgroundTDN2.mp4";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin,setIsLoadingAuth } from "../../../redux/auth/auth";

const Login = () => {
  const [isloading, setIsloading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 500);
    if(auth.isAuthenticated === true){
      navigate('/');
    }
  }, [auth]);
  const onFinish = (values) => {
    dispatch(setIsLoadingAuth());
    dispatch(postLogin(values));
  };
  const onFinishFailed = (errorInfo) => {
  };

  return (
    <>
      <Loading isLoading={isloading} />
      <div className="login">
        <div className="bg-video">
          <div className="bg-video__color"></div>
          <video className="bg-video__content" autoPlay muted loop>
            <source src={clipLogin} type="video/mp4" />
            Your browser is not supported!
          </video>
        </div>
        <div className="login__form">
          <div className="login__form--body">
            <h1>Welcome</h1>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
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
              <div className="login__btn">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "50%" }}
                    size="middle"
                    className="btn"
                  >
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div>
              <p className="login__form--link">
                Don't have an account?{" "}
                <Link className="login__form--link-span" to="/register">
                  Register
                </Link>
              </p>
              <p className="login__form--link">
                <Link className="login__form--link-span">Forgot password</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
