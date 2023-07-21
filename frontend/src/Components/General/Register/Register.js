import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    address: '',
    phone: '',
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
      const response = await fetch('http://localhost:5216/api/Usuarios/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: formData.username,
          clave: formData.password,
          nombre: formData.name,
          telefono: formData.phone,
          direccion: formData.address,
        }),
      });
      const data = await response.json();
      console.log('Respuesta del API:', data);
      if (response.ok) {
        message.success('Registro exitoso');
        navigate('/login')
      } else {
        message.error(data.mensaje);;
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      message.error('Error al registrar');
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <Form name="registerForm">
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
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu nombre',
            },
          ]}
        >
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu dirección',
            },
          ]}
        >
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu número de teléfono',
            },
          ]}
        >
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            onClick={handleSubmit}
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
