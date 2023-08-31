import React from 'react';

interface DeleteMovieProps {
    movieId: number;
    onActionSuccess: () => void;
}

export const DeleteMovie: React.FC<DeleteMovieProps> = ({ movieId, onActionSuccess }) => {
    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {

                onActionSuccess();
            } else {
                console.error('Error deleting movie. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDeleteClick}>Delete Movie</button>
        </div>
    );
};
