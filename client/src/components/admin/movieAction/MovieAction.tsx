

import { FC } from "react";

interface MovieActionProps {
    onDeleteMovie: () => void;
    onUpdateMovie: () => void;
}

export const MovieAction: FC<MovieActionProps> = ({ onDeleteMovie, onUpdateMovie }) => {
    return (
        <div className="movie-action">
            <button onClick={onDeleteMovie}>Delete Movie</button>
            <button onClick={onUpdateMovie}>Update Movie</button>
        </div>
    );
};



