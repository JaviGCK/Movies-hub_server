import { useEffect, useState } from 'react';
import { Modals } from '../modal/Modals';
import { fetchDataUser } from '../../api/apiFetch';



export const MoviesList = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = 1;

  useEffect(() => {
    fetchDataUser(userId)
      .then((data) => {
        if (data && data.email) {
          setUserData(data);
        } else {
          console.error('User data does not contain email');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

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
