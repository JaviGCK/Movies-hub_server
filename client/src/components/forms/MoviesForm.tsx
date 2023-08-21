import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useState } from 'react';



export const MoviesForm: FC = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        origin: '',
        poster: '',
        year: '',
        description: '',
    });
    const [movieData, setMovieData] = useState<any | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { getAccessTokenSilently } = useAuth0();

    const handleCreate = async () => {


        try {

            const formDataWithYearAsNumber = {
                ...formData,
                year: parseInt(formData.year, 10),
            };

            const response = await fetch('http://localhost:8080/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithYearAsNumber),
            });

            if (response.status === 201) {
                console.log('Create Movie:', response.statusText);

                setFormData({
                    id: '',
                    name: '',
                    origin: '',
                    poster: '',
                    year: '',
                    description: '',
                });
            } else {
                console.error('Error to Create Movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async (movieId: any) => {

        try {
            const token = await getAccessTokenSilently();


            const updatedMovieData = {
                name: formData.name,
                origin: formData.origin,
                poster: formData.poster,
                year: parseInt(formData.year, 10),
                description: formData.description,
            };

            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify(updatedMovieData),
            });

            if (response.status === 200 || response.status === 204) {
                console.log('Update Movie.');
            } else {
                console.error('Error to Update Movie:', response.statusText);
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


    const handleDeleteById = async (movieId: any) => {

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                console.log('Delete Movie.');
            } else {
                console.error('Error to Delete Movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleDelete = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch('http://localhost:8080/movies', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 204) {
                console.log('Delete All Movies.');
            } else {
                console.error('Error to Delete Movies:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Movies</h2>
            <form>
                <div>
                    <label htmlFor="id">Id:</label>
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
                <div>
                    <label htmlFor="origin">Origin:</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="poster">Poster:</label>
                    <input
                        type="text"
                        id="poster"
                        name="poster"
                        value={formData.poster}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                {movieData && (
                    <div>
                        <h3>Movie Data</h3>
                        <pre>{JSON.stringify(movieData, null, 2)}</pre>
                    </div>
                )}
                <div>
                    <button type="button" onClick={handleCreate}>
                        Create
                    </button>
                    <button type="button" onClick={handleDelete}>
                        Delete All
                    </button>
                    <button type="button" onClick={handleGetById}>
                        Get One
                    </button>
                    <button type="button" onClick={() => handleDeleteById(formData.id)}>
                        Delete One
                    </button>
                    <button type="button" onClick={() => handleUpdate(formData.id)}>
                        Update
                    </button>

                </div>
            </form>
        </div>
    );
};
