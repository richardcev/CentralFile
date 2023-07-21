import React from 'react';
import { Layout, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const CustomHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
      <div>
        {}
        <span style={{ color: 'white', fontSize: '24px' }}>Central File</span>
      </div>
      <div>
        <Button type="primary" onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </Header>
  );
};

export default CustomHeader;
