import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { useNavigate } from "react-router-dom";

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

const Profil = () => {
  const [form] = Form.useForm();

  let navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.data).data
  const token = JSON.parse(sessionStorage.data).token
  const [email, setEmail] = useState(currentUser.email)
  const [nama, setNama] = useState(currentUser.nama)
  const [gender, setGender] = useState(currentUser.gender)
  console.log(token);

  const onFinish = (values) => {
    if (values.gender != undefined){
      setGender(values.gender)
    }
    console.log('Received values of form: ', email, nama, gender);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`         
      },
      body: JSON.stringify({ 
        email: email, 
        nama: nama, 
        gender: (gender == "Laki-Laki") ? "L" : "P"
      })
    };
    const urlFetch = fetch('http://127.0.0.1:5000/user/'+currentUser.id, requestOptions);
    urlFetch.then( res => {
        return res.json() 
    }).then( resJson => {
        console.log(resJson.message);
        navigate("/home")
    });
  };

  return (
    <div>
      <h1> Profil </h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input defaultValue={email} onChange={e => setEmail(e.target.value)} value={email}/>
        </Form.Item>

        <Form.Item
          name="nama"
          label="Nama"
          tooltip="What do you want others to call you?"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={nama} onChange={e => setNama(e.target.value)} value={nama}/>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            
          ]}
        >
          <Select placeholder="select your gender" defaultValue={gender} >
            <Option value="L">Laki-Laki</Option>
            <Option value="P">Perempuan</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profil