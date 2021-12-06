import React, {useState, useEffect} from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Table } from 'antd';
import { Button } from 'antd';

const { Header, Sider, Content } = Layout;

const columns = [
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Harga', dataIndex: 'harga', key: 'harga' },
    { title: 'Keterangan', dataIndex: 'keterangan', key: 'keterangan' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Button type="primary" danger onClick={() => console.log('hapus')}>Delete</Button>,
    },
  ];

const Home = () => {
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
            'Authorization': `Bearer ${token}`         
            },
          };
          const urlFetch = fetch('http://127.0.0.1:5000/produk', requestOptions);
          urlFetch.then( res => {
              return res.json() 
          }).then( resJson => {
              console.log(resJson.data);
              setData(resJson.data)
          });
    });

    const [collapsed, setCollapsed] = useState(false)
    const [data, setData] = useState("")
    
    const toggle = () => {
    setCollapsed(!collapsed)
    };

    // const hapus = () => {
    //     console.log('hapus');
    // }

    const currentUser = JSON.parse(sessionStorage.data).data
    const token = JSON.parse(sessionStorage.data).token

    console.log(token);
    return (
    <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/profil']}>
            <Menu.Item key="/profil" icon={<UserOutlined />}>
              Edit Profil
              <Link to="/profil" />
            </Menu.Item>
            <Menu.Item key="/produk" icon={<VideoCameraOutlined />}>
              Tambah Produk
              <Link to="/produk" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: {toggle},
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <h1>PROFIL</h1>
            Nama: {currentUser.nama} <br/>
            Email: {currentUser.email} <br/>
            Jenis Kelamin: {currentUser.gender} <br/>
            <br/><br/>
            <h1>PRODUK</h1>
            <Table
                columns={columns}
                dataSource={data}
            />,
          </Content>
        </Layout>
      </Layout>
    );
};
  

export default Home