import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Row, Col, Space } from 'antd';
import { useSelector } from 'react-redux';
import './Styles/estilos.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/actions/contactoAction';
import { Pagination } from 'antd';


const Contactos = () => {
  const username = useSelector((state) => state.userReducer.username);
  const contactos = useSelector((state) => state.contactoReducer.contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 
  const dispatch = useDispatch();


  const handleEliminarContacto = async (idContacto) => {
    try {
      const dataToSend = {
        username: username,
        idContacto: idContacto,
      };
  
      const response = await fetch('http://localhost:5216/api/Usuarios/eliminarcontacto', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Contacto eliminado exitosamente');
        dispatch(deleteContact(data.response));

      } else {
        console.error('Error al eliminar el contacto:', data);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentContacts = contactos.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="user-list-container">
      <h3>Contactos</h3>
      <List
        itemLayout="horizontal"
        dataSource={currentContacts}
        renderItem={(contacto) => (
          <List.Item className="user-item"> {}
            <Row justify="space-between" align="middle">
              <Col flex="auto">
                <Space align="center">
                  <Avatar>{contacto.nombreContacto[0]}</Avatar>
                  <p className='contacto'>{contacto.nombreContacto}</p>
                </Space>
              </Col>
              <Col>
                <Button onClick={() => handleEliminarContacto(contacto.id_contacto)}>Eliminar</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
           {/* Agregar el componente Pagination */}
        <Pagination
        current={currentPage}
        pageSize={usersPerPage}
        total={contactos.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default Contactos;
