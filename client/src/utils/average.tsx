import { Score } from "../components/movies/types";

export function calculateAverageScore(scores: Score[] | undefined): number {
    if (!scores || scores.length === 0) {
        return 0;
    }

    const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
    return totalScore / scores.length;
}

