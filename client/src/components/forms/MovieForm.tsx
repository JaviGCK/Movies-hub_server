import React, { useState } from 'react';
import { createMovie, updateMovie } from '../../api/apiFetch';

interface MovieFormProps {
    userId?: number;
    movieId?: number;
    onUpdate?: () => void;
    onActionSuccess?: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ userId, movieId, onUpdate, onActionSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        score: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, url, score } = formData;

        if (userId || movieId) {
            try {
                const movieData = {
                    name: name || undefined,
                    url: url || undefined,
                    score: score !== '' ? Number(score) : undefined,
                };

                let response;

                if (userId) {
                    response = await createMovie(userId, movieData);
                } else if (movieId) {
                    response = await updateMovie(movieId, movieData);
                }

                if (response && response.status === 200) {
                    setFormData({
                        name: '',
                        url: '',
                        score: '',
                    });

                    if (onUpdate) {
                        onUpdate();
                    }
                    if (onActionSuccess) {
                        onActionSuccess();
                    }
                } else {
                    console.log('Movie created successfully');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Please provide user or movie ID.');
        }
    };



    return (
        <div>
            <h3>{userId ? 'Create Movie' : 'Update Movie'}</h3>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="score">Score:</label>
                    <input
                        type="number"
                        id="score"
                        name="score"
                        value={formData.score}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">{userId ? 'Create' : 'Update'} Movie</button>
                </div>
            </form>
        </div>
    );
};
