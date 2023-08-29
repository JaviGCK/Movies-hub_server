import { useEffect, useState } from 'react';

type Genre = {
    id: number;
    name: string;
    movieId: number;
};

export const InfoGenres = () => {
    const [genres, setGenres] = useState<string[]>([]);
    useEffect(() => {
        const fetchDataGenres = async () => {
            try {
                const response = await fetch('http://localhost:8080/genres');

                if (!response.ok) {
                    throw new Error(`Request Failed: ${response.status} ${response.statusText}`);
                }

                const dataFetched: Genre[] = await response.json();

                if (dataFetched && Array.isArray(dataFetched)) {

                    const uniqueGenres = new Set<string>();

                    dataFetched.forEach((genre) => {
                        uniqueGenres.add(genre.name);
                    });

                    const uniqueGenreArray = Array.from(uniqueGenres);

                    setGenres(uniqueGenreArray);
                } else {
                    console.warn("Invalid gender response:", dataFetched);
                }
            } catch (error) {
                console.error('Error fetching genres data:', error);
            }
        }

        fetchDataGenres();
    }, []);

    return (
        <div>
            <h2>Genres</h2>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};
