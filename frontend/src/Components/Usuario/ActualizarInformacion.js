import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { message } from 'antd'; 
import './Styles/estilos.css';

const ActualizarInformacion = () => {
  const username = useSelector((state) => state.userReducer.username);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5216/api/Usuarios/obtener/${username}`);
        const data = await response.json();
        if (response.ok) {
            console.log("usuario obtenido")
            console.log(data.response.nombre)
            const { nombre, telefono, direccion } = data.response;
            setFormData({
                nombre,
                telefono,
                direccion,
              });
            setLoading(false); 
          }
      } catch (error) {
        message.error('Error al obtener la información del usuario');
      }
    };

    fetchUserInfo();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log("este es el form")
    console.log(formData);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5216/api/Usuarios/editar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: username,
          nombre: formData.nombre,
          telefono: formData.telefono,
          direccion: formData.direccion,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del API:', data);

      if (response.ok) {
        message.success('Información actualizada exitosamente');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="update-info-container"> {}
      <h3>Actualiza tus datos</h3>
      <Form onFinish={handleSubmit} className="update-info-form"> {}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu nombre',
            },
          ]}
        >
          <Input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Nombre"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu número de teléfono',
            },
          ]}
        >
          <Input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Teléfono"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu dirección',
            },
          ]}
        >
          <Input
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
            placeholder="Dirección"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="update-info-button">
            Actualizar información
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ActualizarInformacion;
