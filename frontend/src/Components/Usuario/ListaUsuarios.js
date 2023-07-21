import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Row, Col, Space } from 'antd';
import './Styles/estilos.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/actions/contactoAction';
import { Pagination } from 'antd';


const ListaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const username= useSelector((state) => state.userReducer.username);
  const contactos= useSelector((state) => state.contactoReducer.contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5216/api/Usuarios/lista');
      const data = await response.json();
      if (response.ok) {
      setUsers(data.response); 
    }
    };

    fetchUsers();
  }, [username]);

  const handleAgregar = async (idContacto) => {
    try {
      const dataToSend = {
        id: idContacto,
        username: username,
      };
  
      const response = await fetch('http://localhost:5216/api/Usuarios/agregarcontacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        message.success('Contacto agregado');
        console.log('Contacto agregado exitosamente');
        dispatch(addContact(data.response)); 
      } else {
        console.error('Error al agregar el contacto:', data);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  

  // Filtrar la lista de usuarios para eliminar el usuario actual
  const filteredUsers = users.filter((user) => 
  user.nombreUsuario !== username && 
  !contactos.some((contacto) => contacto.contacto === user.nombreUsuario)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  return (
    <div className="user-list-container">
    <h3>Buscar usuarios</h3>
    <List
      itemLayout="horizontal"
      dataSource={currentUsers}
      renderItem={(user) => (
        <List.Item className="user-item"> {}
          <Row justify="space-between" align="middle">
            <Col flex="auto">
              <Space align="center">
                <Avatar>{user.nombre[0]}</Avatar>
                <p className='contacto'>{user.nombre}</p>
              </Space>
            </Col>
            <Col>
              <Button onClick={() => handleAgregar(user.id)}>Agregar</Button>
            </Col>
          </Row>
        </List.Item>
      )}
    />
     {/* Agregar el componente Pagination */}
          <Pagination
        current={currentPage}
        pageSize={usersPerPage}
        total={filteredUsers.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default ListaUsuarios;



