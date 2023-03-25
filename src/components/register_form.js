import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Modal,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

const color = { color: "red" };
const { Option } = Select;
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
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { Company, SĐT, password, email } = values;
    console.log(Company, SĐT, password, email, "helo123");
    axios
      .post(`http://aicsdeep.ddns.net:8090/api/v1/create_account`, {
        user_name: SĐT,
        password: password,
        email: email,
      })
      .then(function (response) {
        let { data } = response;
        if (data.code == 200) {
          modal.confirm({
            title: "Succesful !",
            content: <>Đăng kí thành công</>,
            onOk: () => navigate("/"),
          });
        } else {
          modal.error({
            title: "Error !",
            content: (
              <>
                <div>Đăng kí thất bại</div>
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
          content: <>Đăng kí thất bại</>,
        });
      });
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <>
      <h2>Đăng ký</h2>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="SĐT"
          label="SĐT"
          rules={[
            {
              type: "SDT",
              message: "Số điện thoại không hợp lệ",
            },
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item> */}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập e-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p style={color}>
          Email được sử dụng trong trường hợp quên mật khẩu nên cần điền đúng
        </p>
        <Form.Item name="Company" label="Tên cá nhân/công ty">
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          {/* <Link to="/"> */}
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </>
  );
};
export default RegisterForm;
