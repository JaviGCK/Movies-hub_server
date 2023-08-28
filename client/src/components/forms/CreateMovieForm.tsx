import { useState } from 'react';

export const CreateMovieForm = () => {
  const userId = 1;
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    score: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { name, url, score } = formData;

    if (name && url && score) {
      try {
        const newMovieData = {
          name,
          url,
          score: Number(score),
        };

        const response = await fetch(`http://localhost:8080/movies/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovieData),
        });

        if (response.status === 201) {

          console.log('Película creada con éxito');
          setFormData({
            name: '',
            url: '',
            score: '',
          });
        } else {
          console.error('Error al crear la película. Código de estado:', response.status);
        }
      } catch (error) {
        console.error('Error al crear la película:', error);
      }
    } else {
      console.error('Por favor, completa todos los campos del formulario.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="score">Score:</label>
        <input
          type="number"
          id="score"
          name="score"
          value={formData.score}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Create Movie</button>
      </div>
    </form>
  );
};



