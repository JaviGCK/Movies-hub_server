import { FC, useState, useEffect } from "react";
import './score.css';
import { useScoreContext } from "../../../context/ScoreContext";

interface AddScoreProps {
    movieId: number;
}

export const AddScore: FC<AddScoreProps> = ({ movieId }) => {
    const { score, setScore } = useScoreContext();
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        // Check if the user has already voted
        if (score !== null) {
            setVoted(true);
        }
    }, [score]);

    const handleScoreButtonClick = async (score: number) => {
        if (!voted) {
            try {
                const response = await fetch(`http://localhost:8080/score/${movieId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ score }),
                });

                if (response.ok) {
                    setScore(score);
                    setVoted(true);
                } else {
                    console.error("Error to add score");
                }
            } catch (error) {
                console.error("Error to add score:", error);
            }
        }
    };

    const renderScoreButtons = () => {
        const scoreButtons = [];

        for (let score = 1; score <= 10; score++) {
            scoreButtons.push(
                <button
                    key={score}
                    className={voted && score === score ? "selected" : ""}
                    onClick={() => handleScoreButtonClick(score)}
                    disabled={voted}
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
