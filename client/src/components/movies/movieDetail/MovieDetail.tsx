import { FC, useEffect, useState } from "react";
import './movieDetail.css';
import { Movies, Score } from "../types";
import { calculateAverageScore } from '../../../utils/average';
import { AddScore } from "../score/AddScore";
import { useScoreContext } from "../../../context/ScoreContext";

interface MovieDetailProps {
    movie: Movies;
}

export const MovieDetail: FC<MovieDetailProps> = ({ movie }) => {
    const { score } = useScoreContext();
    const [averageScore, setAverageScore] = useState<number | null>(null);
    const [showMenuVotes, setShowMenuVotes] = useState<boolean>(false);

    useEffect(() => {
        if (Array.isArray(movie.score) && movie.score.length > 0) {
            const combinedScores: Score[] = [...movie.score];

            if (score !== null) {
                const lastScore = combinedScores[combinedScores.length - 1];
                const newScoreId = lastScore ? lastScore.id + 1 : 1;

                combinedScores.push({ id: newScoreId, score: score });
            }

            setAverageScore(calculateAverageScore(combinedScores));
        }
    }, [movie.score, score]);

    const numVotes = Array.isArray(score) ? score.length : 0;

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
                                {averageScore !== null ? averageScore.toFixed(1) : "N/A"}
                            </div>
                            <div className="movie-votes">
                                {numVotes} {numVotes === 1 ? 'Rating' : 'Ratings'}
                            </div>
                        </div>
                        {!showMenuVotes && (
                            <button onClick={() => setShowMenuVotes(true)}>Vote</button>
                        )}
                    </div>
                    {showMenuVotes && (
                        <div className="side-menu">
                            <AddScore
                                movieId={movie.id}
                            />
                            <button onClick={() => setShowMenuVotes(false)}>Close</button>
                        </div>
                    )}

                    <p className="movie-genre">
                        Genres: {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                    <p className='movie-description'>{movie.description}</p>
                </div>
            </div>
        </section>
    );
};
