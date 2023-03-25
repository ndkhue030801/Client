import { Button, Form, Input, InputNumber, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
const color = { color: "red" };
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const onFinish = (values) => {
    console.log(values);
    const { username, email } = values;
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/password`, {
        user_name: username,
        email: email,
      })
      .then(function (response) {
        let { data } = response;
        console.log(response);
        if (data.code == 200) {
          modal.confirm({
            title: "Success !",
            content: (
              <>
                <div>Gửi password vào email thành công</div>
              </>
            ),
            onOk: () => navigate("/"),
          });
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Gửi password thất bại</div>
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
          content: <>Gửi password thất bại</>,
        });
      });
  };
  return (
    <>
      {contextHolder}
      <h2>Lấy lại mật khẩu</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <p style={color}>
          Nhập email tương ứng với SĐT đã đăng ký, hệ thống sẽ gửi mật khẩu về
          email của bạn
        </p>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="username" label="SĐT">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          {/* <Link to="/"> */}
          <Button type="primary" htmlType="submit">
            Tiếp tục
          </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </>
  );
};
export default ForgotPassword;
