import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";


export const GenresForm = () => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
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

    const handleCreate = async () => {

        try {

            const response = await fetch(`http://localhost:8080/genres/${formData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200 || response.status === 204) {
                console.log('Create Genre.');

                setFormData({
                    id: '',
                    name: '',
                });
            } else {
                console.error('Error to Create Genre:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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

    const handleDeleteById = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/genres/${formData.id}`, {
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
            <h2>GenresForm</h2>
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
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                {movieData && movieData.genres.length > 0 && (
                    <div>
                        <h3>Movie Genres</h3>
                        <ul>
                            {movieData.genres.map((genres: any) => (
                                <li key={genres.id}>
                                    Score ID: {genres.id}, Genre: {genres.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <button type="button" onClick={handleCreate}>
                        Create
                    </button>
                    <button type="button" onClick={handleDeleteById}>
                        Delete Genre
                    </button>
                    <button type="button" onClick={handleGetById}>
                        Get Genre Movie
                    </button>

                </div>
            </form>

        </div>
    )
}
