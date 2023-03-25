import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login_form.css";
import axios from "axios";

const LoginForm = ({ state, setState }) => {
  // const navigate = useNavigate();
  // const isFinished = false;
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { username, password } = values;
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/login`, {
        user_name: username,
        password: password,
      })
      .then(function (response) {
        let { data } = response;
        if (data.code == 200) {
          setState({
            token: data.data.token,
            user_name: data.data.user_name,
          });
          navigate("/main_screen");
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Đăng nhập thất bại</div>
                <div>Lí do : {data.message}</div>
              </>
            ),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        modal.error({
          title: "Error !",
          content: <>Đăng nhập thất bại</>,
        });
      });

    // isFinished = true;
  };
  // useEffect(() => {
  //   if (isFinished) navigate("/main_screen");
  // })

  return (
    <>
      {contextHolder}
      <h2>Đăng nhập</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to="/forgot_password">
            Quên mật khẩu?
          </Link>
        </Form.Item>

        <Form.Item>
          {/* <Link to="/main_screen"> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          {/* </Link> */}
          <p>
            Chưa có tài khoản?<Link to="/register"> Đăng ký</Link>
          </p>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
