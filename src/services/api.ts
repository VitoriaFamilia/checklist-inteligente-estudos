
import axios from 'axios';

export const api = axios.create({
  // Esta é a URL padrão onde o seu banco de dados fictício vai rodar
  baseURL: 'http://localhost:3000',
});