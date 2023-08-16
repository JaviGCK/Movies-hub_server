export const fetchAllMovies = async () => {
    const response = await fetch("http://localhost:8080/movies");
    const dataFetched = await response.json();
    return dataFetched;
}

