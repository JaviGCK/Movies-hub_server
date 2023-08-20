// apiUtils.ts
import { useAuth0 } from "@auth0/auth0-react";

export const getAuthenticatedRequest = async (url: string) => {
    const { getAccessTokenSilently } = useAuth0();

    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
