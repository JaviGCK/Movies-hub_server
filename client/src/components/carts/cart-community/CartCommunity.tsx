import { FC } from 'react';
import './cartCommunity.css';

interface CartCommunityProps {
    poster: string;
    origin: string;
    name: string;
    genre: string;
    score: number;
}

export const CartCommunity: FC<CartCommunityProps> = ({ poster, origin, name, genre, score }) => {
    return (
        <section className="cart-detail">
            <div className='cart-poster'>
                <img src={poster} alt={name} />
            </div>
            <div className='cart-text-detail'>
                <p className='cart-origin'>{origin}</p>
                <h2 className='cart-name'>{name}</h2>
                <p className='cart-genre'>{genre}</p>
                <div className='cart-score-dasboard'>
                    <span className='cart-score'>{score}</span>
                </div>
            </div>
        </section>
    );
}