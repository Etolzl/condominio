import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './Usuarios.css';
import logoImage from './assets/imgs/logo.png';
import Navbar from './Navbar';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [newUsersCount, setNewUsersCount] = useState(0);
  
  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  // Simulación de datos de usuarios
  useEffect(() => {
    const users = [
      { id: 1, nombre: 'Juan Pérez', rol: 'dueño', fechaRegistro: '2025-01-10' },
      { id: 2, nombre: 'Ana Gómez', rol: 'administrador', fechaRegistro: '2024-12-15' },
      { id: 3, nombre: 'Carlos Rodríguez', rol: 'inquilino', fechaRegistro: '2025-01-05' },
      { id: 4, nombre: 'María López', rol: 'dueño', fechaRegistro: '2024-11-25' },
    ];
    setUsuarios(users);
    const filtered = users.filter(user =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsuarios(filtered);

    const count = users.filter(user => {
      const registrationDate = new Date(user.fechaRegistro);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return registrationDate >= oneMonthAgo;
    }).length;
    setNewUsersCount(count);
  }, [searchTerm]);

  const handleAddUser = () => {
    // Redirigimos a la página de registro de usuarios
    navigate('/registrar-usuario');
  };

  const handleEditUser = (id) => {
    // Lógica para editar el perfil de un usuario
  };

  const handleChangePermissions = (id) => {
    // Lógica para cambiar permisos de un usuario
  };

  const handleDeleteUser = (id) => {
    setUsuarios(usuarios.filter(user => user.id !== id));
  };

  return (
    <div className="usuarios-container">
      <Navbar />
      <img src={logoImage} alt="Logo del sistema" className="logo" />
      <h1 className="usuarios-text">Administración de Usuarios</h1>

      <div className="usuarios-actions">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddUser} className="btn-action">Registrar Nuevo Usuario</button>
        <p>Nuevos usuarios en el último mes: {newUsersCount}</p>
      </div>

      <div className="usuarios-list">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map(user => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.rol}</td>
                <td>{user.fechaRegistro}</td>
                <td>
                  <button onClick={() => handleEditUser(user.id)} className="btn-action">Editar</button>
                  <button onClick={() => handleChangePermissions(user.id)} className="btn-action">Cambiar Permisos</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="btn-action">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
