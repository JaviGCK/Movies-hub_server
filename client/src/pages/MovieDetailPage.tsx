import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movies } from "../components/movies/types";
import { MovieDetail } from "../components/movies/movieDetail/MovieDetail";

export const MovieDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movies | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div>
            {movie ? <MovieDetail movie={movie} /> : <p>Loading...</p>}
        </div>
    );
};
