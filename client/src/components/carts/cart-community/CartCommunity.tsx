import { FC } from 'react';
import './cartCommunity.css';
import { Genre } from '../../community/types';

interface CartCommunityProps {
    poster: string;
    origin: string;
    year: number;
    name: string;
    genres?: Genre[];
    score: number;
}

export const CartCommunity: FC<CartCommunityProps> = ({ poster, origin, year, name, genres, score }) => {
    return (
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
    );
}
