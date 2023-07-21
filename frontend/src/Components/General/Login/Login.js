import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from '../../../redux/actions/userAction';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5216/api/Usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: formData.username,
          clave: formData.password,
        }),
      });

      const data = await response.json();


      if (response.ok) {
        dispatch(loginUserSuccess(formData.username))
        navigate('/inicio')

      } else {
        message.error('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      message.error('Error en el inicio de sesión');
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de sesión</h1>
      <Form name="loginForm">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu nombre de usuario',
            },
          ]}
        >
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usuario"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu contraseña',
            },
          ]}
        >
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
          O <a href="/register">Regístrate ahora</a>
        </Form.Item>
      </Form>
    </div>
  );
};


export default Login;

  