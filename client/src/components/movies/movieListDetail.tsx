import './moviesListDetail.css'
import { AddGenre } from '../actions/AddGenre';
import { DeleteMovie } from '../actions/DeleteMovie';
import { DeleteGenre } from '../actions/DeleteGenre';
import { UpdateMovie } from '../actions/UpdateMovie';
import { useAuth0 } from '@auth0/auth0-react';

interface Movie {
    id: number;
    name: string;
    url: string;
    score: number;
    genres?: {
        name: string;
        id: number;
    }[];
}

interface MoviesListDetailProps {
    movies: Movie[];
    onActionSuccess: () => void;
}

export const MoviesListDetail: React.FC<MoviesListDetailProps> = ({ movies, onActionSuccess }) => {

    const { user } = useAuth0()

    return (
        <section className='list-movies-section'>
            <h2 className='list-movies-title'>Movie's {user?.name}</h2>
            {Array.isArray(movies) && movies.length > 0 ? (
                <ul className='list-movies-ul'>
                    {movies.map((movie, index) => (
                        <li className='list-movies-li' key={index}>
                            <p className='movie-property'>Name: {movie.name}</p>
                            <p className='movie-property'>URL: {movie.url}</p>
                            <p className='movie-property'>Score: {movie.score}</p>
                            <p className='movie-property'>Genres:</p>
                            <ul className='list-genres-ul'>
                                {movie.genres?.map((genre, genreIndex) => (
                                    <li className='list-genre-li' key={genreIndex}>
                                        {genre.name}{' '}
                                        <DeleteGenre genreId={genre.id} onActionSuccess={onActionSuccess} />
                                    </li>
                                ))}
                            </ul>
                            <DeleteMovie movieId={movie.id} onActionSuccess={onActionSuccess} />
                            <AddGenre movieId={movie.id} onActionSuccess={onActionSuccess} />
                            <button className='update-button'>
                                <UpdateMovie movieId={movie.id} onUpdateSuccess={onActionSuccess} />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='no-movies-found'>No movies found.</p>
            )}
        </section>
    );

};
