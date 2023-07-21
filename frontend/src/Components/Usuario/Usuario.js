import { useSelector } from "react-redux/es/hooks/useSelector";
import ListaUsuarios from "./ListaUsuarios";
import ActualizarInformacion from "./ActualizarInformacion";
import Contactos from "./Contactos";
import { setContacts } from "../../redux/actions/contactoAction";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Button } from 'antd';
import { useState } from "react";

const Usuario = () =>{
    const [selectedComponent, setSelectedComponent] = useState(null);
    const username= useSelector((state) => state.userReducer.username);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchContactos = async () => {
          try {
            const response = await fetch(`http://localhost:5216/api/Usuarios/obtenercontactos/${username}`);
            const data = await response.json();
            if (response.ok) {
                dispatch(setContacts(data.response)) 
            }
          } catch (error) {
            console.error('Error al obtener los contactos:', error);
          }
        };
    
        fetchContactos();
      }, [username]);
    return(
    <div>
        <div className="acciones">
            <h3 className="bienvenido">Bienvenido {username}</h3>
            <p className="bienvenido">Gestión de usuarios y contactos</p>
            <div>
            <Button onClick={() => setSelectedComponent('listaUsuarios')}>Buscar usuarios</Button>
            <Button onClick={() => setSelectedComponent('actualizarInformacion')}>Actualizar datos</Button>
            <Button onClick={() => setSelectedComponent('contactos')}>Mis contactos</Button>
            </div>
        </div>
  
        {/* Renderizar el componente seleccionado */}
        {selectedComponent === 'listaUsuarios' && <ListaUsuarios/>}
        {selectedComponent === 'actualizarInformacion' && <ActualizarInformacion />}
        {selectedComponent === 'contactos' && <Contactos />}
    </div>

    ) 
}

export default (Usuario);