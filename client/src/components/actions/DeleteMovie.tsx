import { ActionMovieProps } from "./actionTypes";

export const DeleteMovie: React.FC<ActionMovieProps> = ({ movieId, onActionSuccess }) => {
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
            <button className="action-button" onClick={handleDeleteClick}>Delete Movie</button>
        </div>
    );
};
