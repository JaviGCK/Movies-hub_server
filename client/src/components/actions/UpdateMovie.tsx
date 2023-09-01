import React, { useState } from 'react';
import { MovieForm } from '../forms/MovieForm';

interface UpdateMovieProps {
    movieId: number;
    onUpdateSuccess: () => void;
}

export const UpdateMovie: React.FC<UpdateMovieProps> = ({ movieId, onUpdateSuccess }) => {
    const [success, setSuccess] = useState(false);

    const handleUpdateSuccess = () => {
        setSuccess(true);
        onUpdateSuccess();
    };

    return (
        <div>
            {success ? (
                <p>Movie updated successfully!</p>
            ) : (
                <MovieForm movieId={movieId} onActionSuccess={handleUpdateSuccess} />
            )}
        </div>
    );
};
