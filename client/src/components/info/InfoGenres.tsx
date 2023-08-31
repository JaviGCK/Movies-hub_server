import { useEffect, useState } from 'react';
import { DeleteGenre } from '../actions/DeleteGenre';

interface Genre {
    id: number;
    name: string;
    movieId: number;
}

export const InfoGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchDataGenres = async () => {
            try {
                const response = await fetch('http://localhost:8080/genres');

                if (!response.ok) {
                    throw new Error(`Request Failed: ${response.status} ${response.statusText}`);
                }

                const dataFetched: Genre[] = await response.json();

                if (dataFetched && Array.isArray(dataFetched)) {
                    setGenres(dataFetched);
                } else {
                    console.warn("Invalid genre response:", dataFetched);
                }
            } catch (error) {
                console.error('Error fetching genres data:', error);
            }
        };

        fetchDataGenres();
    }, []);



    return (
        <div>
            <h2>Genres</h2>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>
                        {genre.name}
                        <DeleteGenre genreId={genre.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
