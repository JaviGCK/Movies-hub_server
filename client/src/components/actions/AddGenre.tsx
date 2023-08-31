import React, { useState } from 'react';
import ReactModal from 'react-modal';

interface AddGenreProps {
    movieId: number;
    onActionSuccess: () => void;
}

export const AddGenre: React.FC<AddGenreProps> = ({ movieId, onActionSuccess }) => {
    const [genreName, setGenreName] = useState('');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (genreName.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:8080/genres/${movieId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: genreName }),
                });

                if (response.ok) {
                    setGenreName('');
                    setError('');
                    onActionSuccess();
                    closeModal();
                } else {
                    setError(`Error adding genre. Status code: ${response.status}`);
                }

            } catch (error) {
                console.error('Error adding genre:', error);
                setError('Error adding genre. Please try again.');
            }
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Genre</button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Genre Modal"
                appElement={document.getElementById('root')!}
            >
                <h3>Add Genre</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                        placeholder="Enter genre name"
                    />
                    <button type="submit">Add Genre</button>
                </form>
                <button onClick={closeModal}>Close</button>
            </ReactModal>
        </div>
    );
};
