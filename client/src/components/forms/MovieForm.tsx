import './movieForm.css';
import { useState } from 'react';
import { createMoviePost, updateMoviePut } from '../../api/apiFetch';

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

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, url, score } = formData;

        if (userId || movieId) {
            if (!name || !url || !score) {
                setErrorMessage('All fields are required');
                return;
            }

            try {
                const movieData = {
                    name: name || undefined,
                    url: url || undefined,
                    score: score !== '' ? Number(score) : undefined,
                };

                let response;

                if (userId) {
                    response = await createMoviePost(userId, movieData);
                } else if (movieId) {
                    response = await updateMoviePut(movieId, movieData);
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
                    setSuccessMessage('Movie created successfully');

                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Please provide a user or movie ID.');
        }
    };

    return (
        <div className='form-div'>
            <h2 className='form-header'>{userId ? 'Create Movie' : 'Update Movie'}</h2>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={userId !== undefined}
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
                        required={userId !== undefined}
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
                        required={userId !== undefined}
                    />
                </div>
                <div>
                    <button type="submit">{userId ? 'Create' : 'Update'} Movie</button>
                </div>
            </form>
        </div>
    );
};
