import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movies } from "../components/movies/types";
import { MovieDetail } from "../components/movies/movieDetail/MovieDetail";
import { useAuth0 } from "@auth0/auth0-react";

export const MovieDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movies | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(`http://localhost:8080/movies/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id, getAccessTokenSilently]);
    return (
        <div>
            {movie ? <MovieDetail movie={movie} /> : <p>Loading...</p>}
        </div>
    );
};
