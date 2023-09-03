import './menu.css'
import { FC, useEffect, useState } from 'react';

interface Genre {
    id: number;
    name: string;
    movieId: number;
    onActionSuccess: () => void;
}

interface InfoGenresProps {
    onActionSuccess: () => void;
}

export const InfoGenres: FC<InfoGenresProps> = ({ onActionSuccess }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [visibleGenreId, setVisibleGenreId] = useState<string | null>(null);
    const [genresWithSameName, setGenresWithSameName] = useState<number[]>([]);

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

    const uniqueGenres = Array.from(new Set(genres.map((genre) => genre.name)));

    const handleGenreClick = (genreName: string) => {
        const genreIds = genres
            .filter((genre) => genre.name === genreName)
            .map((genre) => genre.id);

        setGenresWithSameName(genreIds);

        if (visibleGenreId === genreName) {
            setVisibleGenreId(null);
        } else {
            setVisibleGenreId(genreName);
        }
    };

    const handleDeleteGenresWithSameName = () => {
        genresWithSameName.forEach(async (genreId) => {
            const response = await fetch(`http://localhost:8080/genres/${genreId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedGenres = genres.filter((genre) => !genresWithSameName.includes(genre.id));
                setGenres(updatedGenres);
                setGenresWithSameName([]);
                setVisibleGenreId(null);
            } else {
                console.error(`Error deleting genre with ID ${genreId}. Status code:`, response.status);
            }
        });
        if (onActionSuccess) {
            onActionSuccess();
        }
    };

    return (
        <div className='info-data-div'>
            <h2 className="info-data-header">Genres</h2>
            <ul className="genre-list">
                {uniqueGenres.map((genreName) => (
                    <li className="genre-list-li" key={genreName} onClick={() => handleGenreClick(genreName)}>
                        {genreName}
                        {visibleGenreId === genreName && (
                            <span className='delete-confirmation-info-genres'>
                                Are you sure you want to delete?
                                <button className="action-button" onClick={handleDeleteGenresWithSameName}>Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

};
