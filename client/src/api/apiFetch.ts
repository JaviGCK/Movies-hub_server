const API_BASE_URL = 'http://localhost:8080';

export const fetchDataUser = async (userId: string): Promise<UserData | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const dataFetched = await response.json();

        if (!dataFetched) {
            return null;
        }

        if ('email' in dataFetched) {
            return dataFetched;
        } else {
            console.warn("User data does not contain email");
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const createUserIfNotExists = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
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
