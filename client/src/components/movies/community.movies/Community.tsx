import { useState, useEffect } from 'react';
import { CartCommunity } from '../cart-community/CartCommunity';
import './community.css'
import { PiFilmReelLight } from 'react-icons/pi'
import { Movies } from '../types';

export const Community = () => {
    const [movies, setMovies] = useState<Movies[]>([]);;

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const response = await fetch("http://localhost:8080/movies");
                const dataFetched = await response.json();
                setMovies(dataFetched);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        fetchAllMovies();
    }, []);

    return (
        <section className='community-section'>
            <div className='community-container-title'>
                <h2 className='community-title'>Community Movies</h2>
                <PiFilmReelLight className='community-icon' />
            </div>
            <div className='community-container-movies'>
                {Array.isArray(movies) ? (
                    movies.map((movie) => (
                        <CartCommunity
                            key={movie.id}
                            poster={movie.poster}
                            origin={movie.origin}
                            year={movie.year}
                            name={movie.name}
                            genres={movie.genres}
                            score={movie.score}
                        />
                    ))
                ) : (
                    <p>No movies available</p>
                )}

            </div>
        </section>
    );
}

