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

const Produk = () => {
  const [form] = Form.useForm();

  let navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.data).data
  const token = JSON.parse(sessionStorage.data).token
  const [harga, setHarga] = useState("")
  const [nama, setNama] = useState("")
  const [ket, setKet] = useState("")
  console.log(token);

  const Login = value => {
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
          sessionStorage.setItem('data', JSON.stringify(resJson.data));
          navigate("/home")
        }else{
          alert(resJson.message);
        }
      });
}

  const onFinish = (values) => {
    
    console.log('Received values of form: ', ket, nama, harga);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`         
      },
      body: JSON.stringify({ 
        nama: nama, 
        harga: harga, 
        keterangan: ket
      })
    };
    const urlFetch = fetch('http://127.0.0.1:5000/produk', requestOptions);
    urlFetch.then( res => {
        return res.json() 
    }).then( resJson => {
        console.log(resJson.message);
        navigate("/home")
    });
  };

  return (
    <div>
      <h1> Produk </h1>
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
          name="nama"
          label="Nama Produk"
          rules={[
          ]}
        >
          <Input defaultValue={nama} onChange={e => setNama(e.target.value)} value={nama}/>
        </Form.Item>

        <Form.Item
          name="harga"
          label="Harga"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={harga} onChange={e => setHarga(e.target.value)} value={harga}/>
        </Form.Item>

        <Form.Item
          name="keterangan"
          label="Keterangan"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input defaultValue={ket} onChange={e => setKet(e.target.value)} value={ket}/>
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

export default Produk