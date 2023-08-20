import { FC } from "react";
import './score.css';
import { useScoreContext } from "../../../context/ScoreContext";
import { useAuth0 } from "@auth0/auth0-react";

interface AddScoreProps {
    movieId: number;
    scoreId: number | null;
}

export const AddScore: FC<AddScoreProps> = ({ movieId, scoreId }) => {
    const { setScore } = useScoreContext();
    const { getAccessTokenSilently } = useAuth0();

    const handleScoreButtonClick = async (newScore: number) => {
        try {
            const token = await getAccessTokenSilently();
            if (scoreId === null) {
                const response = await fetch(`http://localhost:8080/score/${movieId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ score: newScore }),
                });

                if (response.ok) {
                    setScore(newScore);
                } else {
                    console.error("Error to add score");
                }
            } else {
                const response = await fetch(`http://localhost:8080/score/${scoreId}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ score: newScore }),
                });

                if (response.ok) {
                    setScore(newScore);
                } else {
                    console.error("Error to update score");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderScoreButtons = () => {
        const scoreButtons = [];

        for (let score = 1; score <= 10; score++) {
            scoreButtons.push(
                <button
                    key={score}
                    className={score === score ? "selected" : ""}
                    onClick={() => handleScoreButtonClick(score)}
                >
                    {score}
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
