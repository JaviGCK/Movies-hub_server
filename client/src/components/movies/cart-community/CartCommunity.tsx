import { FC } from 'react';
import './cartCommunity.css';
import { CartCommunityProps } from '../types';
import { Link } from 'react-router-dom';
import { calculateAverageScore } from '../../../utils/average';

export const CartCommunity: FC<CartCommunityProps> = ({ id, poster, origin, year, name, genres, score }) => {
    const averageScore = calculateAverageScore(score);
    const numVotes = score ? score.length : 0;

    return (
        <Link to={`/movie/${id}`} className='cart-link'>
            <section className="cart-detail">
                <div className='cart-poster'>
                    <img src={poster} alt={name} />
                </div>
                <div className='cart-text-detail'>
                    <p className='cart-origin'>{origin}<span className='cart-year'>{year}</span></p>
                    <h2 className='cart-name'>{name}</h2>
                    <p className='cart-genre'>
                        {genres && genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <div className="cart-score-dashboard">
                        <div className="cart-score">
                            {averageScore.toFixed(1)}
                        </div>
                        <div className="cart-votes">
                            {numVotes} {numVotes === 1 ? 'vote' : 'votes'}
                        </div>
                    </div>
                </div>
            </section>
        </Link>
    );
}
