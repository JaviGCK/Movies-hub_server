const API_BASE_URL = 'http://localhost:8080';

export const fetchDataUser = async (userId: number): Promise<UserData | null> => {
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
}


