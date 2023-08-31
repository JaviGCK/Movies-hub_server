import React from 'react';
import { AddGenre } from '../actions/AddGenre';
import { DeleteMovie } from '../actions/DeleteMovie';
import { DeleteGenre } from '../actions/DeleteGenre';
import { UpdateMovie } from '../actions/UpdateMovie';

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
    return (
        <div>
            <h2>Movies Detail</h2>
            {Array.isArray(movies) && movies.length > 0 ? (
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index}>
                            <p>Name: {movie.name}</p>
                            <p>URL: {movie.url}</p>
                            <p>Score: {movie.score}</p>
                            <p>Genres:</p>
                            <ul>
                                {movie.genres?.map((genre, genreIndex) => (
                                    <li key={genreIndex}>
                                        {genre.name} <DeleteGenre genreId={genre.id} onActionSuccess={onActionSuccess} />
                                    </li>
                                ))}
                            </ul>
                            <DeleteMovie movieId={movie.id} onActionSuccess={onActionSuccess} />
                            <AddGenre movieId={movie.id} onActionSuccess={onActionSuccess} />
                            <UpdateMovie movieId={movie.id} onActionSuccess={onActionSuccess} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies found.</p>
            )}
        </div>
    );
};
