export const fetchDataUser = async (userId) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const dataFetched = await response.json();
    return dataFetched;
}