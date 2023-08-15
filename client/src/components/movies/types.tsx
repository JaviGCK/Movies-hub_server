export type Movies = {
    id: number;
    poster: string;
    origin: string;
    year: number;
    name: string;
    genres?: Genre[];
    description?: string;
    score: number;
};

export interface CartCommunityProps {
    poster: string;
    origin: string;
    year: number;
    name: string;
    genres?: Genre[];
    score: number;
}

export type Genre = {
    name: string;
};


