import { Button, Form, Input, InputNumber } from 'antd';
import {Link} from "react-router-dom";

const color = {color: 'red'}
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
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};
const ForgotPassword = () => (
    <>
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
        
        <p style={color}>Nhập email tương ứng với SĐT đã đăng ký, hệ thống sẽ gửi mật khẩu về email của bạn</p>
        
        <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
                {
                    type: 'email',
                },
            ]}
        >
            <Input />
        </Form.Item>
    
        <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
        >
            <Link to="/">
                <Button type="primary" htmlType="submit">
                    Tiếp tục
                </Button>
            </Link>
        </Form.Item>
    </Form></>
);
export default ForgotPassword;