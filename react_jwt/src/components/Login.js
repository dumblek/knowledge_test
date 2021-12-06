import React, {useState} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [currentUser, setCurrentUser] = useState("")
    let navigate = useNavigate();

    const submitHandler = value => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: value.email, password: value.password })
          };
          const urlFetch = fetch('http://127.0.0.1:5000/login', requestOptions);
          urlFetch.then( res => {
              return res.json() 
          }).then( resJson => {
            if(resJson.message == "Sukses"){
              setCurrentUser(resJson.data)
              sessionStorage.setItem('data', JSON.stringify(resJson.data));
              navigate("home")
            }else{
              alert(resJson.message);
            }
          });
    }
  
    return (
        <div>
            <h1> Halaman login </h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                remember: true,
                }}
                onFinish={submitHandler}
            >
                <Form.Item
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Email!',
                    },
                ]}
                >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>
                </Form.Item>
                <Form.Item
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Password!',
                    },
                ]}
                >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
                </Form.Item>
                <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
        
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                </Form.Item>
        
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="http://localhost:3000/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};
  

export default LoginForm