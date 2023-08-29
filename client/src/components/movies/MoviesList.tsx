import { useEffect, useState } from 'react';
import { Modals } from '../modal/Modals';
import { fetchDataUser, createUserIfNotExists } from '../../api/apiFetch';
import { useAuth0 } from '@auth0/auth0-react';

export const MoviesList = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user && user.sub) {
        try {
          const userId = user.sub; // Obtén el ID único del usuario autenticado

          // Intenta obtener los datos del usuario
          const userFromDatabase = await fetchDataUser(userId);

          // Si el usuario no existe, créalo
          if (!userFromDatabase) {
            const newUser = await createUserIfNotExists(userId);
            setUserData(newUser);
          } else {
            setUserData(userFromDatabase);
          }
        } catch (error) {
          console.error('Error fetching or creating user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  return (
    <section>
      <Modals userData={userData} />
      {userData && (
        <div>
          <h2>User's Movies</h2>
          {Array.isArray(userData.movies) && userData.movies.length > 0 ? (
            <ul>
              {userData.movies.map((movie, index) => (
                <li key={index}>
                  <p>Name: {movie.name}</p>
                  <p>URL: {movie.url}</p>
                  <p>Score: {movie.score}</p>
                  <p>Genres:</p>
                  <ul>
                    {movie.genres?.map((genre, genreIndex) => (
                      <li key={genreIndex}>{genre.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies found for this user.</p>
          )}
        </div>
      )}
    </section>
  );
};
