import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { MovieForm } from '../forms/MovieForm';

interface UpdateMovieProps {
    movieId: number;
    onActionSuccess?: () => void;
}

export const UpdateMovie: React.FC<UpdateMovieProps> = ({ movieId, onActionSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdateSuccess = () => {
        console.log('Movie updated successfully');
        if (onActionSuccess) {
            onActionSuccess();
        }
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Update Movie</button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update Movie Modal"
                appElement={document.getElementById('root')!}
            >
                <h3>Update Movie</h3>
                <MovieForm movieId={movieId} onUpdate={handleUpdateSuccess} />
                <button onClick={closeModal}>Close</button>
            </ReactModal>
        </div>
    );
};
