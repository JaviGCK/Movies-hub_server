import { FC, useEffect, useState } from "react";
import './score.css';
import { useScoreContext } from "../../../context/ScoreContext";
import { useAuth0 } from "@auth0/auth0-react";

interface AddScoreProps {
    movieId: number;
}

export const AddScore: FC<AddScoreProps> = ({ movieId }) => {
    const { score, setScore } = useScoreContext();
    const { getAccessTokenSilently } = useAuth0();
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {

        const checkUserVote = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.hasVoted) {
                        setHasVoted(true);
                    }
                } else {
                    console.error("Error to check");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        checkUserVote();
    }, [getAccessTokenSilently, movieId]);

    const handleScoreButtonClick = async (newScore: number) => {
        try {
            if (!hasVoted) {
                const token = await getAccessTokenSilently();
                const response = await fetch(`http://localhost:8080/score/${movieId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ score: newScore }),
                });

                if (response.ok) {
                    setScore(newScore);
                    setHasVoted(true);
                } else {
                    console.error("Error al agregar la puntuación");
                }
            } else {
                console.log("El usuario ya ha votado para esta película.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderScoreButtons = () => {
        const scoreButtons = [];

        for (let i = 1; i <= 10; i++) {
            scoreButtons.push(
                <button
                    key={i}
                    className={i === score ? "selected" : ""}
                    onClick={() => handleScoreButtonClick(i)}
                    disabled={hasVoted}
                >
                    {i}
                </button>
            );
        }

        return scoreButtons;
    };

    return (
        <div>
            <div className="score-buttons">
                {renderScoreButtons()}
            </div>
        </div>
    );
};
