import { FC } from 'react';
import './cartCommunity.css';
import { CartCommunityProps } from '../types';
import { Link } from 'react-router-dom';



export const CartCommunity: FC<CartCommunityProps> = ({ id, poster, origin, year, name, genres, score }) => {
    return (
        <Link to={`/movie/${id}`}>
            <section className="cart-detail">
                <div className='cart-poster'>
                    <img src={poster} alt={name} />
                </div>
                <div className='cart-text-detail'>
                    <p className='cart-origin'>{origin}<span className='cart-year'>{year}</span></p>
                    <h2 className='cart-name'>{name}</h2>
                    <p className='cart-genre'>
                        {genres && genres.map((genre) => genre.name).join('/')}
                    </p>
                    <div className='cart-score-dasboard'>
                        <span className='cart-score'>{score}</span>
                    </div>
                </div>
            </section>
        </Link>
    );
}
