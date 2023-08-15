import { FC } from "react";
import { Movies } from "../types";


interface MovieDetailProps {
    movie: Movies;
}

export const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
    return (
        <section className="movie-detail-conatiner">
            <div className="cart-poster">
                <img src={movie.poster} alt={movie.name} />
            </div>
            <div className="cart-text-detail">
                <p className="cart-origin">
                    {movie.origin}
                    <span className="cart-year">{movie.year}</span>
                </p>
                <h2 className="cart-name">{movie.name}</h2>
                <p className="cart-genre">
                    {movie.genres && movie.genres.map((genre) => genre.name).join("/")}
                </p>
                <div className="cart-score-dasboard">
                    <span className="cart-score">{movie.score}</span>
                </div>
                <button>Add Comment</button>
                <button>Add Score</button>
            </div>
        </section>
    );
};
