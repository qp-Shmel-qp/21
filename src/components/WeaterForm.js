import React from 'react';

const WeatherForm = ({ city, setCity, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите название города"
        required
      />
      <button type="submit">Обновить</button>
    </form>
  );
};

export default WeatherForm;
