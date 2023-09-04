const API_BASE_URL = 'http://localhost:8080';

export const fetchDataAllUsers = async (accessToken: string): Promise<UserData[]> => {

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Request error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`Request error: ${response.status} ${response.statusText}`);
        }

        const allUsers = await response.json();
        return allUsers;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return [];
    }
};

export const fetchDataUserById = async (userId: number, accessToken: string): Promise<UserData | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Request error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`Request error: ${response.status} ${response.statusText}`);
        }

        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
        return null;
    }
};

export const createUserIfNotExists = async (name: string, email: string, accessToken: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Request error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`Request error: ${response.status} ${response.statusText}`);
        }

        const createdUser = await response.json();
        console.log('User created successfully:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const createMoviePost = async (userId: number, movieData: FormData, accessToken: string) => {

    try {
        const response = await fetch(`${API_BASE_URL}/movies/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: movieData,
        });

        if (response.status === 201) {
            const createdMovie = await response.json();
            console.log("Movie created successfully:", createdMovie);
            return createdMovie;
        } else {
            console.error('Error creating movie:', response.status);
            return {
                status: response.status,
                error: 'Error creating movie',
            };

        }
    } catch (error) {
        console.error('Error creating movie:', error);
        return {
            status: 500,
            error: 'Error creating movie',
        };
    }
};

export const updateMoviePut = async (movieId: number, movieData: FormData, accessToken: string) => {
    console.log(`${API_BASE_URL}/movies/${movieId}`);


    try {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: movieData,
        });

        const responseData = await response.json();


        return {
            status: response.status,
            data: responseData,
        };
    } catch (error) {
        console.error('Error updating movie:', error);
        return {
            status: 500,
            error: 'Error updating movie',
        };
    }
};
