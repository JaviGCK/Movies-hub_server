import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setUserData({
        name: user?.name || 'Nombre de usuario no disponible',
        email: user?.email || 'Correo electrónico no disponible',
        password: '',
      });
    }
  }, [isAuthenticated, user]);

  const createUserInDatabase = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Usuario registrado en la base de datos');

      } else {
        console.error('Error al registrar usuario en la base de datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Bienvenido, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Password: {userData.password}</p>
          <button onClick={createUserInDatabase}>Registrar en la Base de Datos</button>
          <button onClick={() => logout()}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <h2>Iniciar sesión</h2>
          <button onClick={() => loginWithRedirect()}>Iniciar sesión con Auth0</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
