import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, Navigate, useNavigate } from "react-router-dom";
import './login_form.css';

const LoginForm = () => {
  // const navigate = useNavigate();
  // const isFinished = false;
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // isFinished = true;
  };
  // useEffect(() => {
  //   if (isFinished) navigate("/main_screen");
  // })

  return (
    <>
    <h2>Đăng nhập</h2>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
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
        <Link to="/main_screen">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </Button>
        </Link>
        <p>Chưa có tài khoản?<Link to="/register"> Đăng ký</Link></p>
      </Form.Item>
    </Form>
    </>
  );
};

export default LoginForm;