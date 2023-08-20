import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react"

export const ScoresForm = () => {
    const [formData, setFormData] = useState({
        id: '',
    });


    const [movieData, setMovieData] = useState<any | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGetById = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/movies/${formData.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setMovieData(data);
            } else {
                console.error('Error to Get Movie:', response.statusText);
                setMovieData(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setMovieData(null);
        }
    };

    const handleDeleteScoreById = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/score/${formData.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204 || response.status === 200) {
                console.log('Score Deleted.');
            } else {
                console.error('Error to Delete Score:', response.statusText);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>ScoresForm</h2>
            <form>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="button" onClick={handleGetById}>
                        Get Score Movie
                    </button>
                    <button type="button" onClick={handleDeleteScoreById}>
                        Delete Score
                    </button>
                </div>
            </form>

            {movieData && movieData.score.length > 0 && (
                <div>
                    <h3>Movie Scores</h3>
                    <ul>
                        {movieData.score.map((score: any) => (
                            <li key={score.id}>
                                Score ID: {score.id}, Score: {score.score}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
