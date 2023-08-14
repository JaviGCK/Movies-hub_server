import { useState, useEffect } from 'react';
import { CartCommunity } from '../carts/cart-community/CartCommunity';
import './community.css'
import { PiFilmReelLight } from 'react-icons/pi'
import { Movies } from '../carts/cart-community/types';

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
                {movies.map((movie) => (
                    <CartCommunity
                        key={movie.key}
                        poster={movie.poster}
                        origin={movie.origin}
                        name={movie.name}
                        genre={movie.genre}
                        score={movie.score}
                    />
                ))}
            </div>
        </section>
    );
}

