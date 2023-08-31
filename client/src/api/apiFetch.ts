const API_BASE_URL = 'http://localhost:8080';



export const fetchDataAllUsers = async (): Promise<UserData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error en la solicitud: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const allUsers = await response.json();
        return allUsers;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return [];
    }
};

export const fetchDataUserById = async (userId: number): Promise<UserData | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error en la solicitud: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
        return null;
    }
};





export const createUserIfNotExists = async (name: string, email: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const createdUser = await response.json();
        return createdUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};



export const createMovie = async (userId: number, movieData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        });

        const responseData = await response.json();

        return {
            status: response.status,
            data: responseData,
        };
    } catch (error) {
        console.error('Error creating movie:', error);
        return {
            status: 500,
            error: 'Error creating movie',
        };
    }
};

export const updateMovie = async (movieId: number, movieData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
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


