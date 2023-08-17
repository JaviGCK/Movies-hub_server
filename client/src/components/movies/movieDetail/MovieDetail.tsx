import { FC, useState, useEffect } from "react";
import './movieDetail.css';
import { Movies, Score } from "../types";
import { calculateAverageScore } from '../../../utils/average';
import { Review } from '../review/Review';
import { AddScore } from "../score/AddScore";
import { useScoreContext } from "../../../context/ScoreContext";

interface MovieDetailProps {
    movie: Movies;
}

export const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
    const { score } = useScoreContext();
    const [averageScore, setAverageScore] = useState<number | null>(null);
    const [numVotes, setNumVotes] = useState<number>(0);

    useEffect(() => {
        if (Array.isArray(movie.score) && movie.score.length > 0) {
            const combinedScores: Score[] = [...movie.score];

            if (score !== null) {
                combinedScores.push({ score });
            }

            setAverageScore(calculateAverageScore(combinedScores));
            setNumVotes(combinedScores.length);
        }
    }, [movie.score, score]);

    return (
        <section className="movie-detail-section">
            <div className="movie-detail-container">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.name} />
                </div>

                <div className="movie-text-detail">
                    <div className="movie-header-container">
                        <h2 className="movie-name">
                            Original Title: {movie.name}
                            <span className="movie-year">({movie.year})</span>
                        </h2>
                        <div className="movie-score-dashboard">
                            <div className="movie-score">
                                {averageScore !== null ? averageScore.toFixed(1) : score}
                            </div>
                            <div className="movie-votes">
                                {numVotes} {numVotes === 1 ? 'vote' : 'votes'}
                            </div>
                        </div>
                    </div>

                    <p className="movie-genre">
                        Genres: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                    <p className='movie-description'>{movie.description}</p>
                </div>
            </div>

            <Review />
            <AddScore movieId={movie.id} />
        </section>
    );
};
