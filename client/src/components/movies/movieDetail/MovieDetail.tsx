import './movieDetail.css'
import { FC } from "react";
import { Movies } from "../types";
import { calculateAverageScore } from '../../../utils/average';


interface MovieDetailProps {
    movie: Movies;
}

export const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {

    return (
        <section className="movie-detail-section">
            <div className="movie-detail-container">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.name} />
                </div>

                <div className="movie-text-detail">
                    <div className="movie-header-container">
                        <h2 className="movie-name">{movie.name}
                            <span className="movie-year">{movie.year}</span>
                        </h2>
                        <div className="cart-score-dashboard">
                            {movie.score && (
                                <div className="cart-score">
                                    {calculateAverageScore(movie.score).toFixed(2)}
                                </div>
                            )}
                        </div>

                    </div>

                    <p className="movie-genre">
                        {movie.genres && movie.genres.map((genre) => genre.name).join("/")}
                    </p>
                    <p className='movie-description'>{movie.description}</p>
                </div>

                <button>Add Comment</button>
                <button>Add Score</button>
            </div>
        </section>
    );
};
